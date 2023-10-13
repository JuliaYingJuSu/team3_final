import express from "express";
import db from "../module/connect.js";
import upload from "../module/upload-imgs.js";

const postRouter = express.Router();

//由此開始撰寫路由
postRouter.get("/", async(req, res)=>{
  const sql = `SELECT * from post join post_image on post.post_id = post_image.post_id join post_restaurant on post.post_restaurant_id = post_restaurant.post_restaurant_id join post_food_tag on post.post_id = post_food_tag.post_id join food_tag on food_tag.food_tag_id = post_food_tag.food_tag_id;`

  const [data] = await db.query(sql);
  // console.log(data)
  res.json(data);//回傳json格式
});

// userRouter.post("/add-post", upload.any(), async (req, res) => {
//   console.log(req.file, req.files);
//   const output = {
//     success: false,
//     errors: {},
//     result: {},
//     postData: req.body, // 除錯檢查用
//   };
//   // TODO: 欄位格式檢查
//   if(req.body.user_id){
//     try{
//       const sql = `INSERT INTO post (post_id, post_title, post_content, post_restaurant_id, createTime, user_id, editingTime, postisValid) VALUES (NULL, ?, ?, ?, current_timestamp(), ?, NULL, '1')`;

//   [result] = await db.query(sql,[
//     post_id,
//     post_title, 
//     post_content, 
//     post_restaurant_id, 
//     createTime, 
//     user_id, 
//     editingTime, 
//     postisValid
//   ]);
//   output.success = !!result.affectedRows; //轉為布林值，有為1，無為0
//         output.result = result;
//     }catch (ex) {
//       output.error = "SQL寫入錯誤";
//       output.ex = ex;
//     } 
//   }res.json(output);

//   });
  

 
export default postRouter;

