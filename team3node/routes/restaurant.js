import express from "express";
import db from "../module/connect.js";
import upload from "../module/upload-imgs.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const restaurantRouter = express.Router();

restaurantRouter.post(
  "/member-register",
  upload.array("photo"),
  async (req, res) => {
    console.log(req.body);
    const saltRounds = 10;

    let { email, password, name, address, city, district, description, phone } =
      req.body;
    const output = {
      success: false,
      errors: {},
      result: {},
      postData: {}, // 除錯檢查用
    };

    // try {
    //   const hash = await bcrypt.hash(password, saltRounds);
    // } catch (err) {
    //   console.error("密码哈希化错误:", err);
    //   // 在这里处理错误
    // }
    // //異步的hash

    const sql =
      "INSERT INTO `restaurant_user`(`restaurant_name`, `restaurant_password_hash`, `restaurant_email`, `restaurant_phone`, `restaurant_city`, `restaurant_district`, `restaurant_address`, `restaurant_info`) VALUES (?,?,?,?,?,?,?,?)";

    let result;

    try {
      [result] = await db.query(sql, [
        name,
        password,
        email,
        phone,
        city,
        district,
        address,
        description,
      ]);
      output.success = !!result.affectedRows;
      output.result = result;

      const restaurantId = result.insertId;
      // db.query返回的物件中記錄著自增id

      const files = req.files;
      console.log(req.files);
      if (files && files.length > 0) {
        files.forEach(async (file) => {
          const { filename } = file;
          // 從req.file結構出需要存入資料庫的filename
          const sql2 =
            "INSERT INTO `r_img` (`restaurant_id`, `r_img_route`, `r_img_isValid`) VALUES (?, ?, ?)";

          try {
            [result] = await db.query(sql2, [restaurantId, filename, 1]);
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
  }
);

// restaurantRouter.post("/image-upload",upload.single("image"),async (req,res) =>{
//   console.log(req.file)
// })

export default restaurantRouter;
