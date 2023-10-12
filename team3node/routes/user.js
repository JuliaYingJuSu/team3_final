import express from "express";
import db from "../module/connect.js";
import upload from "../module/upload-imgs.js";

const userRouter = express.Router();
const email_re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//我的文章---------------------
userRouter.get('/:user_id/my-article', async (req, res) => {
  const user_id = parseInt(req.params.user_id) || 0; // 從動態路由參數中獲取user_id
  const sql = `SELECT * FROM user JOIN post ON user.user_id = post.user_id WHERE user.user_id=?`;

  try {
    const [rows] = await db.query(sql, [user_id]);
    console.log(rows);
    res.json(rows);
  } catch (ex) {
    console.log(ex);
  }
});

//檔案上傳
userRouter.post("/upload", upload.any(), async (req, res) => {
  console.log(req.file, req.files);
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
    const file = req.file;
    let result;

    if (!file.length) {
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
        output.error = "SQL寫入錯誤";
        output.ex = ex;
      }
    }

    if (file.length) {
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
    res.json(output);
  }
});

export default userRouter;
