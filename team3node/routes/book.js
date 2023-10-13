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

  const [[rows]] = await db.query(sql);
  output.rows = rows;
  const [rowsImgs] = await db.query(sqlImgs);
  output.rowsImgs = rowsImgs;
  const [rowsMenuImgs] = await db.query(sqlMenuImgs);
  output.rowsMenuImgs = rowsMenuImgs;

  // console.log(output);
  res.json(output);
});

export default bookRouter;
