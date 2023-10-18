import express from "express";
const router = express.Router();

// 存取`.env`設定檔案使用
import "dotenv/config.js";

const callback_url = process.env.SHIP_711_STORE_CALLBACK_URL;

// POST
router.post("/711", function (req, res, next) {
  //console.log(req.body)
  let searchParams = new URLSearchParams(req.body);
  res.redirect(callback_url + "?" + searchParams.toString());
});

// only for  test
router.get("/", function (req, res, next) {
  res.render("index", { title: "shipment route is OK" });
});

export default router;
