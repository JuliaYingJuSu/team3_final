import express from "express";
import db from "../module/connect.js";
import upload from "../module/upload-imgs.js";

const postRouter = express.Router();

//送資料給post主頁
postRouter.get("/", async (req, res) => {
  const sql = `SELECT * from post join post_image on post.post_id = post_image.post_id join post_restaurant on post.post_restaurant_id = post_restaurant.post_restaurant_id join post_food_tag on post.post_id = post_food_tag.post_id join food_tag on food_tag.food_tag_id = post_food_tag.food_tag_id where post.postisValid=1;`;

  const [data] = await db.query(sql);
  // console.log(data)
  res.json(data); //回傳json格式
});

//MODAL要圖片檔
postRouter.post("/post-pid", async (req, res) => {
  const post_id = req.body.post_id;
  // console.log(post_id);

  const sql = `SELECT * FROM post_image where post_id=${post_id}`;

  const [rowsImgs] = await db.query(sql);
  res.json(rowsImgs);
});

//MODAL要留言資訊
postRouter.post("/post-comment", async (req, res) => {
  const post_id = req.body.post_id;
  // console.log(post_id);

  const sql = `SELECT * FROM post_comment join user on  post_comment.user_id = user.user_id where post_comment.post_id=${post_id};`;

  const [rowsComments] = await db.query(sql);
  res.json(rowsComments);
});

//新增文章路由
postRouter.post("/add-post", upload.array("post_image_name"), async (req, res) => {
  // console.log(req.body);
  let { post_title, post_content, post_restaurant_id, user_id } = req.body;
  const output = {
    success: false,
    errors: {},
    result: {},
    postData: {}, // 除錯檢查用
  };
  const sqlPost = `INSERT INTO post (post_id, post_title, post_content, post_restaurant_id, createTime, user_id, editingTime, postisValid) VALUES (?, ?, ?, ?, NOW(), ?, ?, 1)`;

  let result;

  try {
    [result] = await db.query(sqlPost, [
      post_title,
      post_content,
      post_restaurant_id,
      user_id,
    ]);
    output.success = !!result.affectedRows;
    output.result = result;

    const postId = result.insertId;

    

    const files = req.files;
    console.log(req.files);
    if (files && files.length > 0) {
      files.forEach(async (file) => {
        const { filename } = file;
        // 從req.file結構出需要存入資料庫的filename
        const sqlImg = `INSERT INTO post_image (post_image_id, post_id, post_image_name) VALUES (?, ?, ?)`;

        try {
          [result] = await db.query(sqlImg, [postId, filename, 1]);
          console.log(`File ${filename} inserted into database.`);
        } catch (err) {
          console.error(
            `Error inserting file ${filename} into database: ${err}`
          );
        }

      });
    }
  } catch (err) {
    output.errors = "SQL 錯誤";
    output.err = err;
  }

  res.json(output);
});

//新增留言
postRouter.post("/add-comment", async (req, res) => {
  const uid = req.body.uid;
  const pid = req.body.pid;
  const content = req.body.content;

  const sql = `INSERT INTO post_comment (post_comment_id, content, create_time, post_id, user_id) VALUES (NULL, '${content}', current_timestamp(), '${pid}', '${uid}');`;
  console.log(sql);

  const [result] = await db.query(sql);
  console.log(result);

  if (result.affectedRows) {
    const success = true;
    res.send(success);
    console.log(success);
  }
});

//文章主頁要收藏訊息
postRouter.get('/fav', async(req,res)=>{
  
  if(!res.locals.jwtData?.user_id){
    return res.json({});
  }
  const loguid = res.locals.jwtData.user_id
  // console.log(loguid)
  const sql = `SELECT post_id FROM post_favorite WHERE user_id = ? `;

  const [data] = await db.query(sql, [loguid]);
  
  const newData = data.map(i=>i.post_id);

  // console.log(newData)
  res.json(newData);//回傳json格式
})


//加入收藏
postRouter.get("/toggle-fav/:post_id", async (req, res) => {
  console.log("running route")
  const post_id = req.params.post_id || 0;
  const output = {
    action: '', // insert, delete
    post_id,
  };
  console.log(req.query)
  
  console.log(res.locals.jwtData?.user_id)

  if(!res.locals.jwtData?.user_id){
    return res.json({});
  }
  const user_id = res.locals.jwtData.user_id

  const sql1 = `SELECT * FROM post_favorite WHERE user_id=? AND post_id=?`;
  const [rows1] = await db.query(sql1, [user_id, post_id]);
  if(rows1.length){
    // delete
    const sql2 = `DELETE FROM post_favorite WHERE user_id=? AND post_id=?`;
    await db.query(sql2, [user_id, post_id]);
    output.action = 'delete';
  } else {
    // insert
    const sql3 = `INSERT INTO post_favorite (user_id, post_id) VALUES (?, ?)`;
    await db.query(sql3, [user_id, post_id]);
    output.action = 'insert';
    console.log(sql3)
  }
  res.json(output)
});


export default postRouter;
