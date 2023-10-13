import express, { Router } from "express";
import db from "../module/connect.js";

const bookRouter = express.Router();

// ===============餐廳卡片===============
bookRouter.get("/", async (req, res) => {
  const sql = `SELECT * FROM restaurant_user
  JOIN r_img 
  ON restaurant_user.restaurant_id = r_img.restaurant_id
  JOIN r_food_tag
  ON restaurant_user.restaurant_id = r_food_tag.restaurant_id
  JOIN food_tag
  ON food_tag.food_tag_id = r_food_tag.food_tag_id
  `;

  const [data] = await db.query(sql);
  // console.log(data);
  res.json(data);
});

//================商品列表================
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
    rowsFull: [],
  };
  const sql = `SELECT * FROM restaurant_user WHERE restaurant_id = ${rid}`;

  const sqlFull = `
  SELECT DISTINCT b.restaurant_id, b.book_date, b.book_time
FROM book b
LEFT JOIN (
    SELECT bo.restaurant_id, bo.book_date, bo.book_time,
      SUM(bo.book_num_adult + bo.book_num_kid) AS total_booked
    FROM book bo
    WHERE bo.book_isValid = 1
    GROUP BY bo.restaurant_id, bo.book_date, bo.book_time
) booked ON b.restaurant_id = booked.restaurant_id
          AND b.book_date = booked.book_date
          AND b.book_time = booked.book_time
JOIN restaurant_opening_hours h ON b.restaurant_id = h.restaurant_id
WHERE h.is_open = 1
  AND (h.max_capacity - IFNULL(booked.total_booked, 0)) <= 0;
  `;

  const sqlImgs = `SELECT r_img_route FROM r_img 
  JOIN restaurant_user 
  ON r_img.restaurant_id = restaurant_user.restaurant_id 
  WHERE r_img.restaurant_id = ${rid};`;

  const sqlMenuImgs = `SELECT menu_img_route FROM menu_img 
  JOIN restaurant_user 
  ON menu_img.restaurant_id = restaurant_user.restaurant_id 
  WHERE menu_img.restaurant_id = ${rid};`;

  const [[rows]] = await db.query(sql);
  output.rows = rows;
  const [[rowsFull]] = await db.query(sqlFull);
  output.rowsFull = rowsFull;
  const [rowsImgs] = await db.query(sqlImgs);
  output.rowsImgs = rowsImgs;
  const [rowsMenuImgs] = await db.query(sqlMenuImgs);
  output.rowsMenuImgs = rowsMenuImgs;

  // console.log(output);
  res.json(output);
});

export default bookRouter;
