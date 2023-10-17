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
    // console.log(req.body);
    const saltRounds = 10;

    let { email, password, name, address, city, district, description, phone } =
      req.body;
    const output = {
      success: false,
      errors: {},
      result: {},
      postData: {}, // 除錯檢查用
    };

    const sql =
      "INSERT INTO `restaurant_user`(`restaurant_name`, `restaurant_password_hash`, `restaurant_email`, `restaurant_phone`, `restaurant_city`, `restaurant_district`, `restaurant_address`, `restaurant_info`) VALUES (?,?,?,?,?,?,?,?)";

    let result;

    try {
      const hash = await bcrypt.hash(password, saltRounds);

      [result] = await db.query(sql, [
        name,
        hash, // 雜湊後的密碼
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

      const files = req.files;
      // console.log(req.files);
      if (files && files.length > 0) {
        for (const file of files) {
          const { filename } = file;
          const sqlUploadImage =
            "INSERT INTO `r_img` (`restaurant_id`, `r_img_route`, `r_img_isValid`) VALUES (?, ?, ?)";

          try {
            [result] = await db.query(sqlUploadImage, [
              restaurantId,
              filename,
              1,
            ]);
            console.log(`File ${filename} inserted into database.`);
          } catch (err) {
            console.error(
              `Error inserting file ${filename} into database: ${err}`
            );
          }
        }
      }
    } catch (err) {
      console.error("密碼雜湊或者sql錯誤:", err);
      // 這裡處理錯誤
      output.errors = "密碼雜湊或者sql錯誤";
      output.err = err;
    }

    res.json(output);
  }
);

restaurantRouter.get("/member-info", async (req, res) => {
  const restaurantId = parseInt(req.id);
  const sql = "SELECT * FROM `restaurant_user` WHERE `restaurant_id` = ?";
  const [result] = await db.query(sql, [restaurantId]);
  console.log(result);
  res.json(result);
});

restaurantRouter.put("/member-info-update", async (req, res) => {
  const restaurantId = parseInt(req.id);
  const saltRounds = 10;

  let {
    email,
    password,
    name,
    opening,
    city,
    district,
    address,
    description,
    phone,
  } = req.body;
  const output = {
    success: false,
    errors: {},
    result: {},
    postData: {}, // 除錯檢查用
  };
  const hash = await bcrypt.hash(password, saltRounds);
  const sql = `
  UPDATE restaurant_user
  SET
    restaurant_email = ?,
    restaurant_password_hash = ?
  WHERE restaurant_id=?
`;
  if (restaurantId) {
    const [result] = await db.query(sql, [email, hash, restaurantId]);
    output.success = !!result.affectedRows;
    output.result = result;
    console.log("修改成功", result);
    res.json(result);
  }
});

restaurantRouter.put(
  "/member-page-content-update",
  upload.array("photo"),
  async (req, res) => {
    const restaurantId = parseInt(req.id);

    let { name, opening, city, district, address, description, phone } =
      req.body;

    const output = {
      success: false,
      errors: {},
      result: {},
      postData: {}, // 除錯檢查用
    };

    try {
      // 更新 restaurant_user 表格
      const sql = `
        UPDATE restaurant_user
        SET
          restaurant_name = ?,
          restaurant_phone = ?,
          restaurant_city = ?,
          restaurant_district = ?,
          restaurant_address = ?,
          restaurant_opening = ?,
          restaurant_info = ?
        WHERE restaurant_id = ?
      `;

      if (restaurantId) {
        const [result] = await db.query(sql, [
          name,
          phone,
          city,
          district,
          address,
          opening,
          description,
          restaurantId,
        ]);

        output.success = !!result.affectedRows;
        output.result = result;
        console.log("修改成功", result);
      }

      // 處理上傳圖片
      const files = req.files;
      console.log(req.files);

      if (files && files.length > 0) {
        for (const file of files) {
          const { filename } = file;
          const sqlUploadImage =
            "INSERT INTO `r_img` (`restaurant_id`, `r_img_route`, `r_img_isValid`) VALUES (?, ?, ?)";

          try {
            const [result] = await db.query(sqlUploadImage, [
              restaurantId,
              filename,
              1,
            ]);
            console.log(`File ${filename} inserted into database.`);
          } catch (err) {
            console.error(
              `Error inserting file ${filename} into database: ${err}`
            );
          }
        }
      }

      // send response
      res.json(output);
    } catch (err) {
      console.error("路由处理错误:", err);
      output.errors = "路由处理错误";
      output.err = err;
      res.status(500).json(output); // 
    }
  }
);
// restaurantRouter.post("/image-upload",upload.single("image"),async (req,res) =>{
//   console.log(req.file)
// })

export default restaurantRouter;
