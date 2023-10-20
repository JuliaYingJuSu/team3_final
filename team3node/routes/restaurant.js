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
      console.error("路由處理錯誤:", err);
      output.errors = "路由處理錯誤";
      output.err = err;
      res.status(500).json(output); //
    }
  }
);

restaurantRouter.get("/member-orders", async (req, res) => {
  const restaurantId = parseInt(req.id);
  const sql =
    "SELECT * FROM `book` WHERE `restaurant_id` = ? ORDER BY `book_date` DESC;";
  try {
    const [result] = await db.query(sql, [restaurantId]);
    // console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);
  }
});

restaurantRouter.get("/member-orders-count", async (req, res) => {
  const restaurantId = parseInt(req.id);
  const [[totalRecords]] = await db.query(
    "SELECT COUNT(*) AS total_records FROM `book`  WHERE `restaurant_id` = ? && `book_notification` = 1;",
    [restaurantId]
  );
  res.json(totalRecords);
});

restaurantRouter.put("/member-orders-read", async (req, res) => {
  let {off} = req.body
  const restaurantId = parseInt(req.id);
  const [read] = await db.query(
    "UPDATE `book` SET `book_notification` = '?' WHERE `restaurant_id` = ?;",
    [off,restaurantId]
  );
  console.log(read)
  res.json(read)
});

restaurantRouter.get("/member-opening-hours", async (req, res) => {
 const {
    limit,
    weekday1,
    startTime1,
    endTime1,
    weekday2,
    startTime2,
    endTime2,
    weekday3,
    startTime3,
    endTime3,
    weekday4,
    startTime4,
    endTime4,
    weekday5,
    startTime5,
    endTime5,
    weekday6,
    startTime6,
    endTime6,
    weekday0,
    startTime0,
    endTime0,
  }= req.body
  const openingHoursData = [
    { dayOfWeek: 1, startTime: startTime1, endTime: endTime1, isOpen: weekday1 },
    { dayOfWeek: 2, startTime: startTime2, endTime: endTime2, isOpen: weekday2 },
    { dayOfWeek: 3, startTime: startTime3, endTime: endTime3, isOpen: weekday3 },
    { dayOfWeek: 4, startTime: startTime4, endTime: endTime4, isOpen: weekday4 },
    { dayOfWeek: 5, startTime: startTime5, endTime: endTime5, isOpen: weekday5 },
    { dayOfWeek: 6, startTime: startTime6, endTime: endTime6, isOpen: weekday6 },
    { dayOfWeek: 0, startTime: startTime0, endTime: endTime0, isOpen: weekday0 },
  ];

  try {
    // 使用 Promise.all 执行插入操作
    const insertPromises = openingHoursData.map(async (data) => {
      const result = await db.query(
        "INSERT INTO `restaurant_opening_hours`(`restaurant_id`, `day_of_week`, `start_time`, `end_time`, `is_open`, `max_capacity`) VALUES (?,?,?,?,?,?)",
        [restaurantId, data.dayOfWeek, data.startTime, data.endTime, data.isOpen, limit]
      );
      return result;
    });

    // 等待所有插入操作完成
    await Promise.all(insertPromises);

    res.json({ message: "Opening hours added successfully" });
  } catch (error) {
    console.error("Error adding opening hours:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default restaurantRouter;
