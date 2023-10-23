import "dotenv/config";
// import  express, { json }  from "express";
// import json 檔目前是實驗性質的功能
import multer from "multer"; //先載入套件

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import session from "express-session";
import cors from "cors";
import MySQLStore from "express-mysql-session";
import db from "./module/connect.js";
import fs from "node:fs/promises";
import upload from "./module/upload-imgs.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import productRouter from "./routes/product.js";
import bookRouter from "./routes/book.js";
import restaurantRouter from "./routes/restaurant.js";
import firebaseGoogleRouter from "./routes/firebase-google.js";
// import authRouter from "./routes/auth.js";
import passport from "./config/passport-setup.js";
import passportSetup from "./config/passport-setup.js";
// 最早為了authrouter裡的第一個路由就導入了，#8
import cookieSession from "cookie-session";
import cartRouter from "./routes/cart.js";
import { WebSocketServer } from "ws";
import http from "http";
import { parse } from "url";

// const upload=multer({dest:'tmp_uploads/'});//設定上傳檔案位置

//建立一個 MySQL 儲存庫 (MysqlStore)，用於保存 Express(session)的狀態。
const MysqlStore = MySQLStore(session);
//連接到 MySQL 資料庫
const sessionStore = new MysqlStore({}, db);

const app = express();

// *** 頂層 middlewares ***
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    // console.log({ origin });
    callback(null, true);
  },
};

// *** 放在頂層 middlewares ***先檢查
app.use(cors(corsOptions));
// app.use(
//   session({
//     // 新用戶沒有使用到 session 物件時不會建立 session 和發送 cookie
//     saveUninitialized: false,
//     resave: false, // 沒變更內容是否強制回存
//     secret: "123456789",
//     store: sessionStore, //session資料儲存
//     cookie: {
//       maxAge: 600000,
//     },
//   })
// );

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["prettysafekeyasjdkasjdkajsdkajd"],
  })
);
// 生成供客戶端使用的cookie(google login);

app.use(passport.initialize());
app.use(passport.session());
// 通行證初始化(google login);

//將URL轉成JSON格式
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "20mb" }));
// 提高payload上限
app.use(cookieParser());
app.use(express.json());

//自訂的頂層 middlewares
app.use((req, res, next) => {
  // res.locals.title = "測試";
  res.locals.pageName = "";
  res.locals.session = req.session;
  //顯示token
  let auth = req.get("Authorization");

  if (auth && auth.indexOf("Bearer ") === 0) {
    auth = auth.slice(7);

    try {
      res.locals.jwtData = jwt.verify(auth, process.env.JWT_SECRET);
    } catch (ex) {}
  }

  next();
});

app.use(express.static("public"));

const verifyJWT = (req, res, next) => {
  // 製作jwt驗證中間件
  const token = req.headers["authorization"].split(" ")[1];
  // 取得bearer後的token
  if (!token) {
    res.json({ message: "need token!!!" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.id = decoded.id;
      next(); // 继续处理下一個中間件或者路由
    } catch (err) {
      // console.log(req.headers["authorization"]);
      res.json({ message: "token is not ok or no response. please check." });
    }
  }
};
app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.json({ pass: true });
});

//路由放這邊
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/product", productRouter);
app.use("/api/book", bookRouter);
app.use("/api/restaurant", verifyJWT, restaurantRouter);
app.use("/api/cart", cartRouter);
// app.use('/ws',wsRouter)
// app.use("/auth", authRouter);
app.use("/firebase/google", firebaseGoogleRouter);

// GET - 得到所有會員資料
app.get("/", async function (req, res) {
  const [users] = await db.query("SELECT * FROM user");
  res.json(users);
});

// 登出
app.get("/logout", (req, res) => {
  delete req.session.admin;
  res.redirect("/login");
});

app.post("/login-jwt", async (req, res) => {
  let output = {
    success: false,
    postData: req.body,
    code: 0,
    data: {}, // 用戶端要存在 localStorage 裡
  };

  const sql = `SELECT * FROM user WHERE user_email=?`;

  const [rows] = await db.query(sql, [req.body.user_email]);
  if (!rows.length) {
    output.code = 444; //帳號有錯
    return res.json(output);
  }
  const user = rows[0];

  // 用bcrypt加密才用這組
  //   const result = await bcrypt.compare(
  //     req.body.password,
  //     user.user_password
  //   );

  const result = req.body.user_password === user.user_password;
  if (!result) {
    output.code = 666; //密碼有錯
  } else {
    output.success = true;
    output.code = 200;

    // 打包 token
    const payload = {
      user_id: user.user_id,
      user_email: user.user_email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    output.data = {
      user_id: user.user_id,
      user_email: user.user_email,
      nickname: user.nickname,
      user_phone: user.user_phone,
      self_intr: user.self_intr,
      isVaild: user.isValid,
      user_password: user.user_password,
      user_name: user.user_name,
      token,
    };
  }
  res.json(output);
});

app.post("/member-register", upload.array("photo"), async (req, res) => {
  // console.log(req.body);
  const saltRounds = 10;

  let { email, password, name, address, city, district, description, phone } =
    req.body;
  const output = {
    success: false,
    errors: {},
    result: {},
    postData: {}, // 除錯檢查用
  };

  const sql =
    "INSERT INTO `restaurant_user`(`restaurant_name`, `restaurant_password_hash`, `restaurant_email`, `restaurant_phone`, `restaurant_city`, `restaurant_district`, `restaurant_address`, `restaurant_info`) VALUES (?,?,?,?,?,?,?,?)";

  let result;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    [result] = await db.query(sql, [
      name,
      hash, // 使用哈希后的密码
      email,
      phone,
      city,
      district,
      address,
      description,
    ]);
    output.success = !!result.affectedRows;
    output.result = result;

    const restaurantId = result.insertId;

    const files = req.files;
    // console.log(req.files);
    if (files && files.length > 0) {
      for (const file of files) {
        const { filename } = file;
        const sqlUploadImage =
          "INSERT INTO `r_img` (`restaurant_id`, `r_img_route`, `r_img_isValid`) VALUES (?, ?, ?)";

        try {
          [result] = await db.query(sqlUploadImage, [
            restaurantId,
            filename,
            1,
          ]);
          console.log(`File ${filename} inserted into database.`);
        } catch (err) {
          console.error(
            `Error inserting file ${filename} into database: ${err}`
          );
        }
      }
    }
  } catch (err) {
    console.error("密碼雜湊或者sql錯誤:", err);
    // 這裡處理錯誤
    output.errors = "密碼雜湊或者sql錯誤";
    output.err = err;
  }

  res.json(output);
});

app.post("/member-login", async (req, res) => {
  // 注意自己是非同步寫法
  let { email, password } = req.body;
  const sql = "SELECT * FROM `restaurant_user` WHERE restaurant_email = ?";
  const [rows] = await db.query(sql, [email]);
  // db.query的返回結果為一個大陣列包兩個小陣列，解構一次拿到第一個有資料的陣列
  // 獲得email存在的用戶的那筆所有資料
  if (rows.length > 0) {
    // 確定資料長度大於1，其實用戶資料也只有一筆，然後就比對hash密碼，返回為true的結果進行之後的jwt生成
    console.log("email核對成功");
    const storedHash = rows[0].restaurant_password_hash;
    const isPasswordCorrect = await bcrypt.compare(password, storedHash);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      res.json({ message: "密碼不正確" });
    }
    if (isPasswordCorrect) {
      const id = rows[0].restaurant_id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });
      delete rows[0].restaurant_password_hash;
      delete rows[0].restaurant_city;
      delete rows[0].restaurant_district;
      delete rows[0].restaurant_address;
      delete rows[0].restaurant_info;
      // 把敏感數據拿掉
      // req.session.user = rows[0];
      const withToken = {
        token,
        ...rows[0],
      };
      res.json({
        auth: true,
        result: withToken,
      });
      // 做為response交由前端使用
    }
  } else {
    res.json({ auth: false, message: "用戶不存在" });
    // 這邊是錯誤response
  }
});

app.post("/image-upload", upload.array("avatar"), async (req, res) => {
  console.log(req.files);
  res.json(req.files);
});

//**************其他路由放在這裡之前*********************
app.use(express.static("public"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist")); //設定bootstrap和jquery
app.use("/jquery", express.static("node_modules/jquery/dist"));

app.use((req, res) => {
  //沒有給路徑就是接受所有路徑
  // res.type("text/plain");顯示純文字
  res.status(404).send("<h1>404-沒有這個連結啦!</h1>"); //放在最前面只會連到這裡
});

const post = process.env.WEB_POST || 3001;

// ws------------------------------
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });
wss.on("connection", function connection(ws) {
  // console.log("connection");
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("337 received: %s", JSON.parse(data));

    // wss.send(
    //   JSON.stringify(
    //     //{ type: "message",
    //     // data: JSON.parse(data).constent,}

    //     JSON.parse(data).content
    //   )
    // );

    wss.clients.forEach((c) => {
      // console.log("forEach裡");
      if (c.readyState == 1) {
        // console.log("有開著");
        // c.send(JSON.stringify(JSON.parse(data).content));
        console.log("353", JSON.stringify(JSON.parse(data)));

        c.send(JSON.stringify(JSON.parse(data)));
      }
    });
  });
});

server.on("upgrade", function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);

  if (pathname === "/ws") {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

// ---------------------------------------

server.listen(3002, () => {
  console.log(`伺服器啟動,post:${post}`);
});
