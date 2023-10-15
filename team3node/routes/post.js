import express from "express";
import db from "../module/connect.js";
import upload from "../module/upload-imgs.js";

const postRouter = express.Router();

//送資料給post主頁
postRouter.get("/", async(req, res)=>{
  const sql = `SELECT * from post join post_image on post.post_id = post_image.post_id join post_restaurant on post.post_restaurant_id = post_restaurant.post_restaurant_id join post_food_tag on post.post_id = post_food_tag.post_id join food_tag on food_tag.food_tag_id = post_food_tag.food_tag_id;`

  const [data] = await db.query(sql);
  // console.log(data)
  res.json(data);//回傳json格式
});

//MODAL要圖片檔
postRouter.post("/post-pid",async(req,res)=>{
  const post_id = req.body.post_id;
  // console.log(post_id);

  const sql= `SELECT * FROM post_image where post_id=${post_id}`;

  const [rowsImgs] = await db.query(sql);
  res.json(rowsImgs);
})

//MODAL要留言資訊
postRouter.post("/post-comment",async(req,res)=>{
  const post_id = req.body.post_id;
  // console.log(post_id);

  const sql= `SELECT * FROM post_comment join user on  post_comment.user_id = user.user_id where post_comment.post_id=${post_id};`

  const [rowsComments] = await db.query(sql);
  res.json(rowsComments);
})

//新增文章路由
postRouter.post("/addpost",upload.array("photo"), async(req,res)=>{
  const title = req.body.post_title;
  const content = req.body.post_content;
  const uid = req.body.uid;
  

})

//新增留言
postRouter.post('/add-comment',async(req,res)=>{
  const uid = req.body.uid;
  const pid = req.body.pid;
  const content = req.body.content;

  const sql= `INSERT INTO post_comment (post_comment_id, content, create_time, post_id, user_id) VALUES (NULL, '${content}', current_timestamp(), '${pid}', '${uid}');`
  console.log(sql);

  const [result] = await db.query(sql);
  console.log(result);

  if(result.affectedRows) {
    const success =true;
    res.send(success);
    console.log(success);
  }
})


export default postRouter;

