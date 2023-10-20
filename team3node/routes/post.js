import express from "express";
import db from "../module/connect.js";
import upload from "../module/upload-imgs.js";
import multer from 'multer'

const postRouter = express.Router();
// const uploadImg = multer()

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

const uploadImg=multer({dest:'tmp_uploads/',  fieldname: 'photo'});//設定上傳檔案位置
//新增文章路由
postRouter.post(
  "/add-post",
  upload.any(),
  async (req, res) => {
    //return res.json([req.files,req.body])
    /*
    [
    [
        {
            "fieldname": "post_image1",
            "originalname": "Group 76_0.png",
            "encoding": "7bit",
            "mimetype": "image/png",
            "destination": "public/img",
            "filename": "3d03b0b8-59fc-4c43-8a38-8bb1850bbae3.png",
            "path": "public/img/3d03b0b8-59fc-4c43-8a38-8bb1850bbae3.png",
            "size": 114993
        },
        {
            "fieldname": "post_image2",
            "originalname": "Group 77_0.png",
            "encoding": "7bit",
            "mimetype": "image/png",
            "destination": "public/img",
            "filename": "7ca84900-3c59-4969-88aa-02389f431115.png",
            "path": "public/img/7ca84900-3c59-4969-88aa-02389f431115.png",
            "size": 126211
        }
    ],
    {
        "user_id": "22",
        "post_title": "好吃的2",
        "post_content": "123",
        "post_restaurant_id": "2",
        "food_tag_id": [
            "2",
            "7"
        ]
    }
]
    */
    // console.log(req.body);
    let { post_title, post_content, post_restaurant_id, user_id, food_tag_id } =
      req.body;
    console.log(food_tag_id);
    const output = {
      success: false,
      errors: {},
      result: {},
      postData: {}, // 除錯檢查用
    };
    const sqlPost = `INSERT INTO post ( post_title, post_content, post_restaurant_id, createTime, user_id, editingTime, postisValid) VALUES (?, ?, ?, NOW(),  ?,  NOW(), 1)`;

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

      const foodTagInsertPromises = [];

      for (let i = 0; i < food_tag_id.length; i++) {
        const sqlTags = `INSERT INTO post_food_tag (post_food_tag_id, post_id, food_tag_id) VALUES (NULL, ?, ?)`;
        const foodTagInsertPromise = await db.query(sqlTags, [
          postId,
          food_tag_id[i],
        ]);
        foodTagInsertPromises.push(foodTagInsertPromise);
      }/*
      try {
        await Promise.all(foodTagInsertPromises);
      } catch (err) {
        console.error("Error while inserting food tags:", err);
      }
      */

      if (req.files && req.files.length > 0) {
        const sqlImg = `INSERT INTO post_image (post_id, post_image_name) VALUES (?, ?)`;

        for(let f of req.files){
          try {
            [result] = await db.query(sqlImg, [postId, f.filename]);
            console.log(`File ${f.filename} inserted into database.`);
          } catch (err) {
            console.error(
              `Error inserting file ${f.filename} into database: ${err}`
            );
          }
        }
      }
    } catch (err) {
      console.log({err})
      output.errors = "SQL 錯誤";
      output.err = err;
    }
    output.reqfiles = req.files;
    res.json(output);
  }
);


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
postRouter.get("/fav", async (req, res) => {
  if (!res.locals.jwtData?.user_id) {
    return res.json({});
  }
  const loguid = res.locals.jwtData.user_id;
  // console.log(loguid)
  const sql = `SELECT post_id FROM post_favorite WHERE user_id = ? `;

  const [data] = await db.query(sql, [loguid]);

  const newData = data.map((i) => i.post_id);

  // console.log(newData)
  res.json(newData); //回傳json格式
});

//加入收藏
postRouter.get("/toggle-fav/:post_id", async (req, res) => {
  console.log("running route");
  const post_id = req.params.post_id || 0;
  const output = {
    action: "", // insert, delete
    post_id,
  };
  console.log(req.query);

  console.log(res.locals.jwtData?.user_id);

  if (!res.locals.jwtData?.user_id) {
    return res.json({});
  }
  const user_id = res.locals.jwtData.user_id;

  const sql1 = `SELECT * FROM post_favorite WHERE user_id=? AND post_id=?`;
  const [rows1] = await db.query(sql1, [user_id, post_id]);
  if (rows1.length) {
    // delete
    const sql2 = `DELETE FROM post_favorite WHERE user_id=? AND post_id=?`;
    await db.query(sql2, [user_id, post_id]);
    output.action = "delete";
  } else {
    // insert
    const sql3 = `INSERT INTO post_favorite (user_id, post_id) VALUES (?, ?)`;
    await db.query(sql3, [user_id, post_id]);
    output.action = "insert";
    console.log(sql3);
  }
  res.json(output);
});

//文章主頁要按讚訊息
postRouter.get("/like", async (req, res) => {
  if (!res.locals.jwtData?.user_id) {
    return res.json({});
  }
  const loguid = res.locals.jwtData.user_id;
  // console.log(loguid)
  const sql = `SELECT post_id FROM likes WHERE user_id = ? `;

  const [data] = await db.query(sql, [loguid]);

  const newData = data.map((i) => i.post_id);

  // console.log(newData)
  res.json(newData); //回傳json格式
});

//按讚
postRouter.get("/toggle-like/:post_id", async (req, res) => {
  console.log("running route");
  const post_id = req.params.post_id || 0;
  const output = {
    action: "", // insert, delete
    post_id,
  };
  console.log(req.query);

  console.log(res.locals.jwtData?.user_id);

  if (!res.locals.jwtData?.user_id) {
    return res.json({});
  }
  const user_id = res.locals.jwtData.user_id;

  const sql1 = `SELECT * FROM likes WHERE user_id = ? AND post_id= ?`;
  const [rows1] = await db.query(sql1, [user_id, post_id]);
  if (rows1.length) {
    // delete
    const sql2 = `DELETE FROM likes WHERE user_id=? AND post_id=?`;
    await db.query(sql2, [user_id, post_id]);
    output.action = "delete";
  } else {
    // insert
    const sql3 = `INSERT INTO likes (user_id, post_id) VALUES (?, ?)`;
    await db.query(sql3, [user_id, post_id]);
    output.action = "insert";
    console.log(sql3);
  }
  res.json(output);
});

//接收追蹤資訊
postRouter.get("/follow", async (req, res) => {
  if (!res.locals.jwtData?.user_id) {
    return res.json({});
  }
  const loguid = res.locals.jwtData.user_id;
  console.log(res.json)
  // console.log(loguid)
  const sql = `SELECT user_id_followed FROM followers JOIN user ON followers.user_id_followed=user.user_id WHERE followers.user_id_following=?;`;

  const [data] = await db.query(sql, [loguid]);

  const newData = data.map((i) => i.user_id_followed);

  // console.log(newData)
  res.json(newData); //回傳json格式
});

//新增追蹤取消追蹤
postRouter.get("/toggle-follow/:user_id", async (req, res) => {
  console.log("running route");
  const user_id = req.params.user_id || 0;
  const output = {
    action: "", // insert, delete
    user_id,
  };
  console.log(req.query);

  console.log(res.locals.jwtData?.user_id);

  if (!res.locals.jwtData?.user_id) {
    return res.json({});
  }
  const user_id_following = res.locals.jwtData.user_id;

  const sql1 = `SELECT * FROM followers WHERE user_id_following = ? AND user_id_followed= ?`;
  const [rows1] = await db.query(sql1, [user_id_following, user_id]);
  if (rows1.length) {
    // delete
    const sql2 = `DELETE FROM followers WHERE user_id_following = ? AND user_id_followed= ?`;
    await db.query(sql2, [user_id_following, user_id]);
    output.action = "delete";
  } else {
    // insert
    const sql3 = `INSERT INTO followers (user_id_following, user_id_followed) VALUES (?, ?)`;
    await db.query(sql3, [user_id_following, user_id]);
    output.action = "insert";
    console.log(sql3);
  }
  res.json(output);
});


export default postRouter;
