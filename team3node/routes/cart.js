import express from "express";
import db from "../module/connect.js";

import { createLinePayClient } from "line-pay-merchant";
import util from "util";

import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
const cartRouter = express.Router();

// -------------------------------------- 專題cart ----------------------------------------------------------------------

// ------------------------編輯訂單-------------------------

cartRouter.put("/edit/:order_id", async (req, res) => {
  const output = {
    success: false,
    errors: {},
    result: {},
    postData: req.body,
  };
  // todo: 檢查格式, 修改的資料送出前一樣要檢查
  //   let isPass = true;

  let result;
  try {
    const sql =
      "UPDATE `address_book` SET `name`=?,`email`=?,`mobile`=?,`birthday`=?,`address`=? WHERE `sid`=? ";
    const sql2 =
      "UPDATE `order_general` SET `delivery_address` = ? WHERE `order_general`.`order_id` =? ";

    [result] = await db.query(sql, [delivery_address, order_id]);
    output.success = !!result.changedRows;
    // 把資料庫的result, 放到output中的result
    output.result = result;
  } catch (ex) {
    output.error = "SQL 錯誤";
    output.ex = ex;
  }

  res.json(output);
});

// ----------------------消費紀錄 my-order,寫死user_id=10 ----------------------
cartRouter.get("/my-order", async (req, res) => {
  let output = {
    success: false,
    rows: [],
  };

  const sql = `SELECT * FROM order_general WHERE user_id = 10`;
  const [rows] = await db.query(sql);
  for (let r of rows) {
    r.order_date = dayjs(r.order_date).format("YYYY/MM/DD");
  }

  console.log(rows);
  res.json(rows);
});

// ---------------------- order-complete -------------------------------
cartRouter.get("/order-complete", async (req, res) => {
  let output = {
    success: false,
    rows: [],
  };

  const sql = `SELECT * FROM order_general JOIN user on user.user_id = order_general.user_id WHERE order_general.user_id = 10`;
  const [rows] = await db.query(sql);
  console.log(rows);
  for (let r of rows) {
    r.order_date = dayjs(r.order_date).format("YYYY/MM/DD");
  }
  console.log(rows);
  res.json(rows);
});

//---------------------- 消費紀錄細項 order-d ----------------------
cartRouter.get("/order-d/:order_id", async (req, res) => {
  console.log("nice");
  let output = {
    success: false,
    result: [],
  };

  const order_id = parseInt(req.params.order_id);
  //   const order_id = req.params.order_id;
  // 沒問題的sql: SELECT * FROM order_general JOIN oder_detail ON oder_detail.order_id = order_general.order_id JOIN product_img ON product_img.product_id = oder_detail.product_id WHERE order_general.order_id ='4354' AND product_img.showed_1st=1;
  const sql = `SELECT * FROM order_general JOIN oder_detail ON oder_detail.order_id = order_general.order_id JOIN product ON product.product_id = oder_detail.product_id JOIN product_img ON product_img.product_id = oder_detail.product_id JOIN user ON order_general.user_id = user.user_id WHERE oder_detail.order_id = ${order_id} AND product_img.showed_1st=1 AND user.user_id = 10 `;
  const [result] = await db.query(sql);
  console.log(result);
  for (let r of result) {
    r.order_date = dayjs(r.order_date).format("YYYY/MM/DD hh:mmA");
  }
  output.result = result;
  if (result.length > 0) {
    output.success = true;
  }
  res.json(output);
});

// ---------------------- 購物車詳細頁 --------------------
// cartRouter.get("/", async (req, res) => {
//   let output = {
//     success: false,
//     rows: [],
//   };

//   const sql =
//     "SELECT * FROM cartproduct_detail JOIN product ON cartproduct_detail.product_id = product.product_id LEFT JOIN product_img ON cartproduct_detail.product_id = product_img.product_id LEFT JOIN user ON cartproduct_detail.user_id = user.user_id WHERE cartproduct_detail.user_id = 10 AND product_img.showed_1st=1;";
//   const [rows] = await db.query(sql);
//   console.log(rows);
//   res.json(rows);
// });

// ------------------ 購物車資料庫刪除功能 ---------------
// cartRouter.get("/:product_id", async (req, res) => {
//   let output = {
//     success: false,
//     result: [],
//   };
//   const product_id = parseInt(req.params.product_id);
//   const sql = `DELETE FROM cartproduct_detail WHERE product_id = '${product_id}' AND user_id = 10 `;
//   const [result] = await db.query(sql);
//   res.json({
//     success: !!result.affectedRows,
//     // sid, 看他當初給的sid是多少
//     product_id,
//   });
// });

// --------------line pay---------

// create order--- 1. 建立order 2. 呼叫line pay request API 3. 取得付款連結, 給user做後需付款動作
// 建立訂單給付款連結(尚未付款) res會拿到付款連結
// 確認付款連結應如何呈現給user, ex: button / 直接轉址導到該頁面(無須button)
// 若用button, 需要一個頁面呈現 按下create-order這api
// 跑loading, 等api完成, get response 是事件監聽, 若有值進去, 就轉導
// confirm-order -----1. 透過queryString取得order-id & transaction-ID (轉址回來會知道的參數)  2. 拿order_id到資料庫查詢, 該筆訂單的狀態（是否有該筆訂單） 需增加amount欄位 3.copy confirm API, if success 表付款完成, 需要改寫order狀態成『已付款』  付款成功！！
// app.get("/cart/create-order" 原本是這樣寫
cartRouter.get("/cart/create-order", async (req, res) => {
  try {
    //建立訂單
    const uuid = uuidv4();
    // 注意：user_id寫死 10 / order_amount寫死: 500
    const sql = `INSERT INTO order_general(order_id, payment_status, user_id, payment_method, order_amount, delivery_method, delivery_address, delivery_status, order_date) VALUES (${uuid}, '未付款', 10, 'LINE PAY', 500, '宅配', ${delivery_address}, '備貨中', now())`;
    const [result] = await db.query(sql);
    // 把cart拿掉
    // 上課寫的 --> const sql2 = `INSERT INTO oder_detail(order_id, product_id, order_quantity) VALUES (?)`;
    const sql2 = `INSERT INTO oder_detail(order_id, product_id, order_quantity) VALUES (?) `;

    const dataToInsert = req.packages.map((idpackage) => {
      return {
        // 這裡的uuid要去帶sql的uuid?
        order_id: uuid,
        product_id: idpackage.id,
        order_quantity: idpackage.products[0].quantity,
      };
    });
    const [result2] = await db.query(sql2, [
      dataToInsert.map((order) => [
        order.order_id,
        order.product_id,
        order.order_quantity,
      ]),
    ]);
    // 寫法2 （嚴謹）

    // db.query(query, [dataToInsert.map(item => [item.name, item.age])], (err, results) => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       console.log(`${results.affectedRows} 行被插入`);
    //     }
    //   });

    const res = await createlinePayClient.request.send({
      body: req,
      //   body: {
      //     amount: 1000,
      //     currency: "TWD",
      //     orderId: "20231008004",
      //     packages: [
      //       {
      //         id: "c99abc79-3b29-4f40-8851-bc618ca57856",
      //         amount: 1000,
      //         products: [
      //           {
      //             name: "Product Name",
      //             quantity: 2,
      //             price: 500,
      //           },
      //         ],
      //       },
      //     ],
      //     redirectUrls: {
      //       confirmUrl: "http:localhost:3000/confirm",
      //       cancelUrl: "http:localhost:3000/cancel",
      //     },
      //   },
    });
    console.log(util.inspect(res, { depth: Infinity, colors: true }));
  } catch (e) {
    console.log("error", e);
  }

  res.json({
    success: !!result.affectedRows,
  });
});

// --------------confirm--------------------------

try {
  const res = await linePayClient.confirm.send({
    transactionId: "2023100802022614510",
    body: {
      currency: "TWD",
      // amount需要查資料庫的訂單
      amount: 1000,
    },
  });
  console.log(util.inspect(res, { depth: Infinity, colors: true }));
} catch (e) {
  console.log("error", e);
}

//   -------------------------- 商品加入購物車 -------------------------------
// ?????是用post?????
// app.post("/cart", async (req, res) => {
//   const sql = "SELECT * FROM cart JOIN user ON cart.user_id = user.user_id";
// });

export default cartRouter;
