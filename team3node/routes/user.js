import express from "express";
import db from "../module/connect.js";
import upload from "../module/upload-imgs.js";

const userRouter = express.Router();
const email_re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST - 上傳檔案用，使用multer
// 注意: 使用nulter會和express-fileupload衝突，所以要先註解掉express-fileupload的使用再作測試
// 在app.js中的app.use(fileUpload())
userRouter.post(
  "/upload2",
  upload.single("user_img"), // 上傳來的檔案(這是單個檔案，欄位名稱為avatar)
  async function (req, res, next) {
    // req.file 即上傳來的檔案(avatar這個檔案)
    // req.body 其它的文字欄位資料…
    console.log(req.file, req.body);

    if (req.file) {
      console.log(req.file);
      return res.json({ message: "success", code: "200" });
    } else {
      console.log("沒有上傳檔案");
      return res.json({ message: "fail", code: "409" });
    }
  }
);

userRouter.post("/", async (req, res) => {
  const output = {
    success: false,
    errors: {},
    result: {},
    postData: req.body, // 除錯檢查用
  };
  // TODO: 欄位格式檢查
  let isPass = true; // 有沒有通常檢查
  if (req.body.user_name) {
    const { user_name, nickname, user_email, user_password, user_phone } =
      req.body;

    //檢查姓名欄位
    if (user_name.length < 2) {
      output.errors.name = "姓名要大於2個字";
      isPass = false;
    }

    // 檢查 email
    if (!email_re.test(user_email)) {
      output.errors.user_email = "Email格式不正確";
      isPass = false;
    }

    let result;
    if (isPass) {
      try {
        const sql = `INSERT INTO user ( user_name,nickname,user_email,user_password, user_phone,user_img,create_date,updatetime) VALUES (?,?,?,?,?,?,NOW(),NOW() )`;

        [result] = await db.query(sql, [
          user_name,
          nickname,
          user_email,
          user_password,
          user_phone,
          user_img,
        ]); //這邊欄位要跟寫入SQL的?一樣，不然會出錯
        output.success = !!result.affectedRows; //轉為布林值，有為1，無為0
        output.result = result;
      } catch (ex) {
        output.error = "SQL寫入錯誤";
        output.ex = ex;
      }
    }
  }
  res.json(output);
});

export default userRouter;