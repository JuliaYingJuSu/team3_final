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

restaurantRouter.get("/member-orders-less", async (req, res) => {
  const restaurantId = parseInt(req.id);
  const sql =
    "SELECT * FROM `book` WHERE `restaurant_id` = ? ORDER BY `book_date` DESC LIMIT 3;";
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
  let { off } = req.body;
  const restaurantId = parseInt(req.id);
  const [read] = await db.query(
    "UPDATE `book` SET `book_notification` = ? WHERE `restaurant_id` = ?;",
    [off, restaurantId]
  );
  console.log(read);
  res.json(read);
});

restaurantRouter.get("/member-opening-hours", async (req, res) => {
  const restaurantId = parseInt(req.id);
  const [openingHours] = await db.query(
    "SELECT * FROM `restaurant_opening_hours` WHERE restaurant_id = ? ORDER BY `day_of_week` ASC",
    [restaurantId]
  );
  res.json(openingHours);
});

restaurantRouter.post("/member-opening-hours", async (req, res) => {
  let { limit } = req.body;
  const restaurantId = parseInt(req.id);

  const days = ["0", "1", "2", "3", "4", "5", "6"];
  let values = [];

  for (let day of days) {
    const startTime = req.body[`startTime${day}`];
    const endTime = req.body[`endTime${day}`];
    const weekday = req.body[`weekday${day}`];

    //迴圈填充陣列，
    // 根據weekday設置isopen

    // 如果餐廳開放才填入陣列

    const isOpen = weekday ? 1 : 0;

    // 如果餐厅开放，那么添加到插入的列表中
    if (isOpen) {
      values.push([restaurantId, day, startTime, endTime, isOpen, limit]);
    }

    // console.log(values);
    // [
    //   [ 15, false, '', '', 1, '25' ],
    //   [ 15, '1', '02:00', '11:00', 1, '25' ],
    //   [ 15, '2', '13:00', '20:00', 1, '25' ],
    //   [ 15, false, '', '', 1, '25' ],
    //   [ 15, false, '', '', 1, '25' ],
    //   [ 15, false, '', '', 1, '25' ],
    //   [ 15, false, '', '', 1, '25' ]
    // ]
  }
  const [openingHours] = await db.query(
    "INSERT INTO `restaurant_opening_hours`(`restaurant_id`, `day_of_week`, `start_time`, `end_time`,`is_open`,  `max_capacity`) VALUES ?",
    [values]
  );
  console.log(openingHours);
  res.json(openingHours);
});

restaurantRouter.post("/member-opening-hours-update", async (req, res) => {
  console.log(req.body);
  let { limit } = req.body;
  const restaurantId = parseInt(req.id);
  let updateResult;
  let insertResult;

  const days = ["0", "1", "2", "3", "4", "5", "6"];

  for (let day of days) {
    const startTime = req.body[`startTime${day}`];
    const endTime = req.body[`endTime${day}`];
    const weekday = req.body[`weekday${day}`];
    const isOpen = weekday ? 1 : 0;
    let updateResult;
    let insertResult;
    // 先尝试查找记录
    const [rows] = await db.query(
      "SELECT * FROM `restaurant_opening_hours` WHERE `restaurant_id` = ? AND `day_of_week` = ?",
      [restaurantId, day]
    );

    // 記錄存在且時間選項不為空
    if (rows.length > 0 && startTime != "" && endTime != "") {
      [updateResult] = await db.query(
        "UPDATE `restaurant_opening_hours` SET `start_time` = ?, `end_time` = ?, `is_open` = ?, `max_capacity` = ? WHERE `restaurant_id` = ? AND `day_of_week` = ?",
        [startTime, endTime, isOpen, limit, restaurantId, day]
      );
    } else if (isOpen) {
      // 記錄不存在且
      [insertResult] = await db.query(
        "INSERT INTO `restaurant_opening_hours`(`restaurant_id`, `day_of_week`, `start_time`, `end_time`,`is_open`,  `max_capacity`) VALUES (?, ?, ?, ?, ?, ?)",
        [restaurantId, day, startTime, endTime, isOpen, limit]
      );
    }
  }

  res.json({ updateResult, insertResult });
});

restaurantRouter.delete("/member-opening-hours-delete", async (req, res) => {
  const restaurantId = parseInt(req.id);
  let deleteResult;
  [deleteResult] = await db.query(
    "DELETE FROM `restaurant_opening_hours` WHERE `restaurant_id` = ?",
    [restaurantId]
  );
  res.json(deleteResult);
});

export default restaurantRouter;
