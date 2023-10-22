import express from "express";
import db from "../module/connect.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/verify-google-token", async (req, res) => {
  const { email, displayName } = req.body.user;

  const [duplicatedCheck] = await db.query(
    "SELECT * FROM `restaurant_user` WHERE restaurant_gmail = ?",
    [email]
  );

  if (duplicatedCheck.length > 0) {
    console.log("user already is ", duplicatedCheck[0]);
    // 執行登錄login路由
    const id = duplicatedCheck[0].restaurant_id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    delete duplicatedCheck[0].restaurant_password_hash;
    delete duplicatedCheck[0].restaurant_city;
    delete duplicatedCheck[0].restaurant_district;
    delete duplicatedCheck[0].restaurant_address;
    delete duplicatedCheck[0].restaurant_info;
    const withToken = {
      token,
      ...duplicatedCheck[0],
    };

    res.json({
      auth: true,
      result: withToken,
    });
  } else {
    const newUser = await db.query(
      "INSERT INTO `restaurant_user`(`restaurant_name`, `restaurant_gmail`) VALUES (?,?)",
      [displayName, email]
    );

    const [user] = await db.query(
      "SELECT * FROM `restaurant_user` WHERE restaurant_gmail = ?",
      [email]
    );
    const id = user[0].restaurant_id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    delete user[0].restaurant_password_hash;
    delete user[0].restaurant_city;
    delete user[0].restaurant_district;
    delete user[0].restaurant_address;
    delete user[0].restaurant_info;
    const withToken = {
      token,
      ...user[0],
    };

    res.json({
      auth: true,
      result: withToken,
    });
  }
});

export default router;
