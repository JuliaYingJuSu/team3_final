import express from "express";
import db from "../module/connect.js";
import upload from "../module/upload-imgs.js";

const userRouter = express.Router();
const email_re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//訂位紀錄---------------------
userRouter.get("/:user_id/my-book", async (req, res) => {
  const user_id = parseInt(req.params.user_id) || 0;
  const sql = `
  SELECT * FROM user JOIN book
  ON user.user_id = book.user_id
  JOIN restaurant_user
  ON restaurant_user.restaurant_id = book.restaurant_id
  WHERE book.book_isValid = "1" 
  AND user.user_id = ? GROUP BY book.book_id
  ORDER BY book.book_date DESC;
  `;

  try {
    const [rows] = await db.query(sql, [user_id]);
    console.log(rows);
    res.json(rows);
  } catch (ex) {
    console.log(ex);
  }
});

userRouter.get("/:user_id/my-book/:bid?", async (req, res) => {
  const user_id = parseInt(req.params.user_id) || 0;
  const bid = req.params.bid;
  console.log(bid);

  let output = {
    rows: [],
  };

  const sql = `
    SELECT * FROM user
    JOIN book
    ON user.user_id = book.user_id
    JOIN restaurant_user
    ON restaurant_user.restaurant_id = book.restaurant_id
    WHERE book.book_id = ${bid};
    `;
  const [[rows]] = await db.query(sql, [user_id]);
  output.rows = rows;

  res.json(output);
});

userRouter.post("/:user_id/my-book/:bid?", (req, res) => {
  const user_id = parseInt(req.params.user_id) || 0;
  const bid = req.params.bid;

  const updateSql = `UPDATE book SET book_isValid = 0 WHERE book_id = ${bid}`;
  db.query(updateSql, [bid], (err, result) => {
    if (err) {
      console.error("取消訂位失敗：" + err.message);
      res.status(500).json({ message: "取消訂位失敗" });
      return;
    }

    console.log("成功取消訂位：" + result.affectedRows);
    res.status(200).json({ message: "成功取消訂位" });
  });
});

//我的文章---------------------
userRouter.get("/:user_id/my-article", async (req, res) => {
  const user_id = parseInt(req.params.user_id) || 0; // 從動態路由參數中獲取user_id
  const sql = `SELECT user.*, post.*, post_image.*, post_restaurant.*, post_food_tag.*, food_tag.* FROM user JOIN post ON user.user_id = post.user_id JOIN post_image ON post.post_id = post_image.post_id JOIN post_restaurant ON post.post_restaurant_id = post_restaurant.post_restaurant_id JOIN post_food_tag ON post.post_id = post_food_tag.post_id JOIN food_tag ON food_tag.food_tag_id = post_food_tag.food_tag_id WHERE user.user_id = ? GROUP BY post.post_id;`;

  try {
    const [rows] = await db.query(sql, [user_id]);
    console.log(rows);
    res.json(rows);
  } catch (ex) {
    console.log(ex);
  }
});

//我的追蹤---------------------
userRouter.get("/:user_id/myauthor", async (req, res) => {
  const user_id_followed = parseInt(req.params.user_id) || 0; // 從動態路由參數中獲取user_id
  const sql = `SELECT user.*, post.*, post_image.*, post_restaurant.*, post_food_tag.*, food_tag.*, followers.* FROM user JOIN post ON user.user_id = post.user_id JOIN post_image ON post.post_id = post_image.post_id JOIN post_restaurant ON post.post_restaurant_id = post_restaurant.post_restaurant_id JOIN post_food_tag ON post.post_id = post_food_tag.post_id JOIN food_tag ON food_tag.food_tag_id = post_food_tag.food_tag_id JOIN followers ON followers.user_id_following = user.user_id WHERE followers.user_id_followed = ? GROUP BY user.user_id;`;

  try {
    const [rows] = await db.query(sql, [user_id_followed]);
    console.log(rows);
    res.json(rows);
  } catch (ex) {
    console.log(ex);
  }
});

//追蹤數---------------------
userRouter.get("/:user_id/follown", async (req, res) => {
  const user_id_followed = parseInt(req.params.user_id) || 0; // 從動態路由參數中獲取user_id
  const sql = `SELECT * FROM followers JOIN user ON followers.user_id_following=user.user_id WHERE followers.user_id_followed=?`;

  try {
    const [rows] = await db.query(sql, [user_id_followed]);
    console.log(rows);
    res.json(rows);
  } catch (ex) {
    console.log(ex);
  }
});

//檔案上傳---------------------
userRouter.post("/upload", upload.single("user_img"), async (req, res) => {
  console.log(req.file);
  const output = {
    success: false,
    errors: {},
    result: {},
    postData: req.body, // 除錯檢查用
  };
  // TODO: 欄位格式檢查
  let isPass = true; // 有沒有通常檢查
  if (req.body.user_name) {
    const {
      user_name,
      nickname,
      user_email,
      user_password,
      user_phone,
      food_tag_id,
    } = req.body;
    const file = req.file;
    let result;

    if (!file) {
      try {
        const sql = `INSERT INTO user ( user_name,nickname,user_email,user_password, user_phone,create_date,updatetime) VALUES (?,?,?,?,?,NOW(),NOW() )`;

        [result] = await db.query(sql, [
          user_name,
          nickname,
          user_email,
          user_password,
          user_phone,
        ]); //這邊欄位要跟寫入SQL的?一樣，不然會出錯
        output.success = !!result.affectedRows; //轉為布林值，有為1，無為0
        output.result = result;
      } catch (ex) {
        output.errors = "SQL寫入錯誤";
        output.ex = ex;
      }
    }

    if (file) {
      try {
        const sql = `INSERT INTO user ( user_name,nickname,user_email,user_password, user_phone,user_img,create_date,updatetime) VALUES (?,?,?,?,?,?,NOW(),NOW() )`;
        const { filename } = file;
        [result] = await db.query(sql, [
          user_name,
          nickname,
          user_email,
          user_password,
          user_phone,
          filename,
        ]); //這邊欄位要跟寫入SQL的?一樣，不然會出錯
        output.success = !!result.affectedRows; //轉為布林值，有為1，無為0
        output.result = result;
      } catch (ex) {
        output.errors = "SQL寫入錯誤";
        output.ex = ex;
      }
    }
    res.json(output);
  }
});

//修改會員資料表單---------------------
userRouter.put("/update", async (req, res) => {
  const output = {
    success: false,
    error: null,
    errors: {},
    result: {},
    postData: req.body, // 除錯檢查用
  };
  // TODO: 欄位格式檢查
  let isPass = true; // 有沒有通常檢查
  if (req.body.user_name) {
    let {
      user_id,
      user_name,
      nickname,
      user_password,
      user_phone,
      food_tag_id,
    } = req.body;
    //檢查姓名欄位
    if (user_name.length < 2) {
      output.errors.name = "姓名要大於2個字";
      isPass = false;
      output.error = true;
    }

    let result;
    if (isPass) {
      try {
        const sql =
          "UPDATE `user` SET `user_name`=?,`nickname`=?,`user_password`=?,`user_phone`=? WHERE `user_id`=?";

        [result] = await db.query(sql, [
          user_name,
          nickname,
          user_password,
          user_phone,
          user_id,
        ]); //這邊欄位要跟寫入SQL的?一樣，不然會出錯
        output.success = !!result.changedRows; //有改變1，沒有為0
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
