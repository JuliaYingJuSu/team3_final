import express from "express";
import db from "../module/connect.js";

const bookRouter = express.Router();

bookRouter.get("/", async (req, res) => {
  const sql = `SELECT * from restaurant_user
  JOIN r_img 
  ON restaurant_user.restaurant_id = r_img.restaurant_id
  JOIN r_food_tag
  ON restaurant_user.restaurant_id = r_food_tag.restaurant_id
  JOIN food_tag
  ON food_tag.food_tag_id = r_food_tag.food_tag_id
  `;

  const [data] = await db.query(sql);
  console.log(data);
  res.json(data);
});

export default bookRouter;
