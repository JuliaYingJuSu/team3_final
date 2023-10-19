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

//我的收藏
userRouter.get("/:user_id/article", async (req, res) => {
  const user_id = parseInt(req.params.user_id) || 0; // 從動態路由參數中獲取user_id
  const sql = `SELECT * from post join post_image on post.post_id = post_image.post_id join post_restaurant on post.post_restaurant_id = post_restaurant.post_restaurant_id join post_food_tag on post.post_id = post_food_tag.post_id join food_tag on food_tag.food_tag_id = post_food_tag.food_tag_id JOIN post_favorite ON post.post_id=post_favorite.post_id WHERE post_favorite.user_id = ? GROUP BY post.post_id`;

  try {
    const [rows] = await db.query(sql, [user_id]);
    console.log(rows);
    res.json(rows);
  } catch (ex) {
    console.log(ex);
  }
});

//其他使用者資訊---------------------
userRouter.get("/:user_id/userInfoImg", async (req, res) => {
  const user_id = parseInt(req.params.user_id) || 0; // 從動態路由參數中獲取user_id
  const sql = `SELECT user.*, post.*, post_image.*, post_restaurant.*, post_food_tag.*, food_tag.*,followers.* FROM user JOIN post ON user.user_id = post.user_id JOIN post_image ON post.post_id = post_image.post_id JOIN post_restaurant ON post.post_restaurant_id = post_restaurant.post_restaurant_id JOIN post_food_tag ON post.post_id = post_food_tag.post_id JOIN food_tag ON food_tag.food_tag_id = post_food_tag.food_tag_id JOIN followers ON followers.user_id_following = user.user_id WHERE user.user_id = ? GROUP BY post.post_id;`;

  try {
    const [rows] = await db.query(sql, [user_id]);
    console.log(rows);
    res.json(rows);
  } catch (ex) {
    console.log(ex);
  }
});

//其他使用者追蹤數
userRouter.get("/:user_id/userfollow", async (req, res) => {
  const user_id = parseInt(req.params.user_id) || 0; // 從動態路由參數中獲取user_id
  const sql = `SELECT user.*,followers.* FROM user JOIN followers ON followers.user_id_following = user.user_id WHERE user.user_id = ?;`;

  try {
    const [rows] = await db.query(sql, [user_id]);
    console.log(rows);
    res.json(rows);
  } catch (ex) {
    console.log(ex);
  }
});

//其他使用者個人資訊
userRouter.get("/:user_id/userinfo", async (req, res) => {
  const user_id = parseInt(req.params.user_id) || 0; // 從動態路由參數中獲取user_id
  const sql = `SELECT * FROM user WHERE user_id=?`;

  try {
    const [rows] = await db.query(sql, [user_id]);
    console.log(rows);
    res.json(rows);
  } catch (ex) {
    console.log(ex);
  }
});

//食物標籤---------------------
userRouter.get("/:user_id/food_tag", async (req, res) => {
  const user_id_followed = parseInt(req.params.user_id) || 0; // 從動態路由參數中獲取user_id
  const sql = `SELECT user.user_id,food_tag.food_tag_id 
  FROM user_tag 
  JOIN food_tag ON food_tag.food_tag_id = user_tag.food_tag_id 
  JOIN user ON user.user_id=user_tag.user_id 
  WHERE user.user_id=?;
`;

  try {
    const [rows] = await db.query(sql, [user_id_followed]);
    console.log(rows);
    res.json(rows);
  } catch (ex) {
    console.log(ex);
  }
});

//大頭照上傳
userRouter.put("/update-img", upload.single("user_img"), async (req, res) => {
  const output = {
    success: false,
    error: null,
    errors: {},
    result: {},
    postData: req.body, // 除錯檢查用
  };

  try {
    const { user_id } = req.body;
    const user_img = req.file ? req.file.filename : null; // 拿到上傳名稱

    if (!user_id) {
      output.error = "沒有user_id";
      return res.status(400).json(output);
    }

    if (!user_img) {
      output.error = "沒有上傳檔案";
      return res.status(400).json(output);
    }

    const sql = "UPDATE user SET user_img = ? WHERE user_id = ?";
    const [result] = await db.query(sql, [user_img, user_id]);

    output.success = !!result.changedRows; //有改變，changedRows會>0
    output.result = result;
    res.json(output);
  } catch (error) {
    output.error = error.message;
    res.status(500).json(output);
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
        //寫入user
        [result] = await db.query(sql, [
          user_name,
          nickname,
          user_email,
          user_password,
          user_phone,
          filename,
        ]); //這邊欄位要跟寫入SQL的?一樣，不然會出錯

        if (result.affectedRows === 1) {
          //如果有寫入成功
          const user_id = result.insertId; //拿到user_id
          const userTagInsertSql = `INSERT INTO user_tag (user_id, food_tag_id) VALUES (?, ?)`;

          for (const foodtagid of food_tag_id) {
            await db.query(userTagInsertSql, [user_id, foodtagid]);
          }
        }
        output.success = true;
        output.result = result;
      } catch (ex) {
        output.errors = "SQL寫入錯誤";
        output.ex = ex;
      }
    }
    res.json(output);
  }
});

// 修改會員資料表單
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
    try {
      const {
        user_id,
        user_name,
        nickname,
        user_password,
        user_phone,
        food_tag_id,
      } = req.body;

      // 檢查姓名欄位
      if (user_name.length < 2) {
        output.errors.name = "姓名要大於2個字";
        isPass = false;
        output.error = true;
      }

      if (isPass) {
        const sql =
          "UPDATE `user` SET `user_name`=?,`nickname`=?,`user_password`=?,`user_phone`=? WHERE `user_id`=?";

        //更新user資料
        const [result] = await db.query(sql, [
          user_name,
          nickname,
          user_password,
          user_phone,
          user_id,
        ]);

        output.success = !!result.changedRows; // 有改變1，沒有為0
        output.result = result;

        // 刪除user的標籤
        const delSql = `DELETE FROM user_tag WHERE user_id = ?`;
        await db.query(delSql, [user_id]);

        // 新增user的標籤
        for (const foodtagid of food_tag_id) {
          const tagSql = `INSERT INTO user_tag (user_id, food_tag_id) VALUES (?, ?)`;
          await db.query(tagSql, [user_id, foodtagid]);
        }
      }
    } catch (ex) {
      output.error = "SQL寫入錯誤";
      output.ex = ex;
    }
  }

  res.json(output);
});

export default userRouter;
