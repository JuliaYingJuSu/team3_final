import express, { Router } from "express";
import db from "../module/connect.js";

const bookRouter = express.Router();

// ======== 寫入訂位資料 =========
bookRouter.post("/add-book", async (req, res) => {
  const {
    user_id,
    restaurant_id,
    book_date,
    book_time,
    book_num_adult,
    book_num_kid,
    book_name,
    book_gender,
    book_phone,
    book_email,
    book_note,
  } = req.body;

  const sql = `INSERT INTO book (book_id, user_id, restaurant_id, book_date, book_time, book_num_adult, book_num_kid, book_name, book_gender, book_phone, book_email, book_note, book_create_time, book_isValid) VALUES (NULL, '${user_id}', '${restaurant_id}', '${book_date}', '${book_time}', '${book_num_adult}', '${book_num_kid}', '${book_name}', '${book_gender}', '${book_phone}', '${book_email}', '${book_note}', current_timestamp(), 1);`;
  console.log(sql);

  try {
    // 執行SQL查詢來插入新資料
    const result = await db.query(sql, [
      user_id,
      restaurant_id,
      book_date,
      book_time,
      book_num_adult,
      book_num_kid,
      book_name,
      book_gender,
      book_phone,
      book_email,
      book_note,
    ]);

    // 如果成功，返回成功的回應
    res.json({ message: "訂位資料已成功寫入！", insertedId: result.insertId });
  } catch (error) {
    // 如果發生錯誤，返回錯誤的回應
    res.status(500).json({ error: "寫入資料時發生錯誤：" + error.message });
  }
});

//================餐廳卡片================
bookRouter.post("/", async (req, res) => {
  const sql = `
  SELECT * FROM restaurant_user
  JOIN r_img
  ON restaurant_user.restaurant_id=r_img.restaurant_id
  JOIN r_food_tag
  ON restaurant_user.restaurant_id = r_food_tag.restaurant_id
  JOIN food_tag
  ON food_tag.food_tag_id = r_food_tag.food_tag_id
  `;

  const [data] = await db.query(sql);
  // console.log(data);
  res.json(data);
});

// ================餐廳主頁================
bookRouter.get("/:rid/:uid?", async (req, res) => {
  const rid = req.params.rid;
  const uid = req.params.uid;
  console.log(uid);

  let output = {
    rows: [],
    rowsImgs: [],
    rowsMenuImgs: [],
    rowsRoutine: [],
    // rowsFull: [],
  };
  const sql = `SELECT * FROM restaurant_user WHERE restaurant_id = ${rid}`;

  const sqlImgs = `SELECT r_img_route FROM r_img 
  JOIN restaurant_user 
  ON r_img.restaurant_id = restaurant_user.restaurant_id 
  WHERE r_img.restaurant_id = ${rid};`;

  const sqlMenuImgs = `SELECT menu_img_route FROM menu_img 
  JOIN restaurant_user 
  ON menu_img.restaurant_id = restaurant_user.restaurant_id 
  WHERE menu_img.restaurant_id = ${rid};`;

  const sqlRoutine = `SELECT * FROM restaurant_opening_hours WHERE restaurant_opening_hours.restaurant_id = ${rid};`;

  const [[rows]] = await db.query(sql);
  output.rows = rows;
  const [rowsImgs] = await db.query(sqlImgs);
  output.rowsImgs = rowsImgs;
  const [rowsMenuImgs] = await db.query(sqlMenuImgs);
  output.rowsMenuImgs = rowsMenuImgs;
  const [rowsRoutine] = await db.query(sqlRoutine);
  output.rowsRoutine = rowsRoutine;

  res.json(output);
});

export default bookRouter;
