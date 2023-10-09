import express from "express";
import db from "../module/connect.js";

const postRouter = express.Router();

//由此開始撰寫路由
postRouter.get("/", async(req, res)=>{
  const sql = `SELECT * from post join post_image on post.post_id = post_image.post_id join post_restaurant on post.post_restaurant_id = post_restaurant.post_restaurant_id join post_food_tag on post.post_id = post_food_tag.post_id join food_tag on food_tag.food_tag_id = post_food_tag.food_tag_id ORDER BY post.post_id DESC;`

  // const sql2 = `SELECT * FROM post join likes on post.post_id = likes.post_id;`

  // const sql4 = `SELECT * FROM post_favorite;`

  // const sql5 = `SELECT * FROM post_comment;`

  

  const [data] = await db.query(sql);
  console.log(data)
  res.json(data);//回傳json格式
})


export default postRouter;

