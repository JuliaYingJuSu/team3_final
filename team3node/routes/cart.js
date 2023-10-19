import express from "express";
import db from "../module/connect.js";

import { createLinePayClient } from "line-pay-merchant";
import util from "util";

import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import axios from "axios";
import "dotenv/config.js";
import cors from "cors";

const cartRouter = express.Router();
const router = express.Router();

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    console.log({ origin });
    callback(null, true);
  },
};

// ---------------------- 專題cart ---------------------------------

// ------------------------編輯訂單-------------------------

// cartRouter.put("/edit/:order_id", async (req, res) => {
//   const output = {
//     success: false,
//     errors: {},
//     result: {},
//     postData: req.body,
//   };
//   // todo: 檢查格式, 修改的資料送出前一樣要檢查
//   //   let isPass = true;

//   let result;
//   try {
//     const sql =
//       "UPDATE `address_book` SET `name`=?,`email`=?,`mobile`=?,`birthday`=?,`address`=? WHERE `sid`=? ";
//     const sql2 =
//       "UPDATE `order_general` SET `delivery_address` = ? WHERE `order_general`.`order_id` =? ";

//     [result] = await db.query(sql, [delivery_address, order_id]);
//     output.success = !!result.changedRows;
//     // 把資料庫的result, 放到output中的result
//     output.result = result;
//   } catch (ex) {
//     output.error = "SQL 錯誤";
//     output.ex = ex;
//   }

//   res.json(output);
// });

// ----------------------消費紀錄 my-order,寫死user_id=36 ----------------------
cartRouter.get("/my-order", async (req, res) => {
  let output = {
    success: false,
    rows: [],
  };

  const sql = `SELECT * FROM order_general WHERE user_id = 22 ORDER BY order_date DESC `;
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

  // const sql = `SELECT * FROM order_general JOIN user on user.user_id = order_general.user_id WHERE order_general.user_id = 10`;
  // 選出最新一筆的order_id
  const [[sql3]] = await db.query(
    `SELECT order_id FROM order_general ORDER BY order_date DESC LIMIT 1`
  );
  const sql = `SELECT * FROM order_general JOIN user on user.user_id = order_general.user_id WHERE order_general.order_id ='${sql3.order_id}' `;
  const [rows] = await db.query(sql);
  console.log(rows);
  for (let r of rows) {
    r.order_date = dayjs(r.order_date).format("YYYY/MM/DD");
  }
  console.log(rows);
  res.json(rows);
});

//---------------------- 消費紀錄細項 order-d ----------------------
cartRouter.get("/order-d/:oid", async (req, res) => {
  console.log("nice");
  let output = {
    success: false,
    result: [],
  };

  // const order_id = parseInt(req.params.oid);
  const order_id = req.params.oid;
  console.log(order_id);
  //   const order_id = req.params.order_id;
  // 沒問題的sql: SELECT * FROM order_general JOIN oder_detail ON oder_detail.order_id = order_general.order_id JOIN product_img ON product_img.product_id = oder_detail.product_id WHERE order_general.order_id ='4354' AND product_img.showed_1st=1;
  const sql = `SELECT * FROM order_general JOIN oder_detail ON oder_detail.order_id = order_general.order_id JOIN product ON product.product_id = oder_detail.product_id JOIN product_img ON product_img.product_id = oder_detail.product_id JOIN user ON order_general.user_id = user.user_id WHERE oder_detail.order_id LIKE '%${order_id}%' AND product_img.showed_1st=1 AND user.user_id = 22 `;
  const [result] = await db.query(sql);
  console.log(result);
  console.log("-----------------------------------");
  for (let r of result) {
    r.order_date = dayjs(r.order_date).format("YYYY/MM/DD hh:mmA");
  }
  output.result = result;
  if (result.length > 0) {
    output.success = true;
  }
  res.json(output);
});

// 成立訂單 寫入資料庫

cartRouter.post("/", async (req, res) => {
  let {
    payment_status,
    user_id,
    payment_method,
    order_amount,
    delivery_method,
    delivery_name,
    delivery_address,
    order_id,
    data,
  } = req.body;
  // const user_id = req.body.user_id;
  console.log(data);
  let output = {
    success: false,
    rows: [],
  };

  const uuid = uuidv4();
  try {
    // 注意：user_id寫死 10

    const sql = `INSERT INTO order_general(order_id, payment_status, user_id, payment_method, order_amount, delivery_method, delivery_name, delivery_phone, delivery_address, delivery_status) VALUES ('${uuid}', '已付款', ${user_id}, 'LINE PAY', ${order_amount}, '${delivery_method}', NULL, NULL, NULL, '備貨中')`;
    console.log(sql);

    const [result] = await db.query(sql);
    // console.log(result);
    // 可以取得剛才新增紀錄的id流水號
    // const orderInsertId = result.insertId;
    const [[sql3]] = await db.query(
      `SELECT order_id FROM order_general ORDER BY order_date DESC LIMIT 1`
    );
    console.log(sql3);
    // const sql2 = data.map((v, i) => {
    //   return `INSERT INTO oder_detail (orderproduct_id, order_id, product_id, order_quantity, score, content) VALUES (NULL, '${sql3.order_id}', ${v.product_id}, ${v.quantity}, NULL, "")`;
    // });

    const sql2Promises = data.map((v, i) => {
      return db.query(
        `INSERT INTO oder_detail (orderproduct_id, order_id, product_id, order_quantity, score, content) VALUES (NULL, '${sql3.order_id}', ${v.product_id}, ${v.quantity}, NULL, "")`
      );
    });
    const result2Array = await Promise.all(sql2Promises);

    console.log(result2Array);

    res.json({
      success: !!result.affectedRows,
    });
  } catch {
    (ex) => {
      console.log(ex);
    };
  }
});

// ---------------------- 寄送資訊寫入資料庫 ---------------------------

cartRouter.post("/del-detail", async (req, res) => {
  console.log("nnice");
  let { delivery_name, delivery_phone, delivery_address } = req.body;
  console.log(req.body);

  let output = {
    success: false,
    rows: [],
  };

  try {
    const [[sql3]] = await db.query(
      `SELECT order_id FROM order_general ORDER BY order_date DESC LIMIT 1`
    );
    const sql = `UPDATE order_general SET delivery_name='${delivery_name}',delivery_phone='${delivery_phone}',delivery_address='${delivery_address}' WHERE 
    order_id='${sql3.order_id}'`;
    // console.log(sql);
    const [result] = await db.query(sql);
    res.json({
      success: !!result.affectedRows,
    });
  } catch {
    (ex) => {
      console.log(ex);
    };
  }
});

// ---------------------- 購物車詳細頁 line pay --------------------
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

// sample data

const orders = {
  body: {
    amount: 1000,
    currency: "TWD",
    orderId: "20231008004",
    packages: [
      {
        id: "8792c14f-9f63-42da-8636-0367183070cf",
        amount: 2010,
        products: [
          {
            name: "38",
            quantity: 3,
            price: 650,
          },
        ],
      },
    ],
    redirectUrls: {
      confirmUrl: "http:localhost:3002/confirm",
      cancelUrl: "http:localhost:3002/cancel",
    },
  },

  2: {
    amount: 1000,
    currency: "TWD",
    orderId: "20231008004",
    packages: [
      {
        id: "8e9a7bbd-eb0e-4849-a6fc-98ab0c1b59a9",
        amount: 2660,
        products: [
          {
            name: "38",
            quantity: 4,
            price: 650,
          },
        ],
      },
    ],
    redirectUrls: {
      confirmUrl: "http:localhost:3002/confirm",
      cancelUrl: "http:localhost:3002/cancel",
    },
  },
};

cartRouter
  .get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
  })
  .get("/checkout/:id", (req, res) => {
    // 取得路由上的路徑資料
    const { id } = req.params;
    console.log(id);
    const order = orders[id];
    // 顯示出我們的訂單內容
    console.log(order);
    const order_id = parseInt(new Date().getTime() / 1000);
    orders.order_id = order_id;
    // ??? ??
    order[order.order_id] = order;
    // 把建好的訂單送到前端去
    //  res.render("checkout") --> 前端要渲染出什麼畫面出來
    // { order } --> 渲染時, 要帶什麼資料
    // 總結：把建好的訂單結構資料送到前端頁面
    res.render("checkout", { order });
  });

// create order--- 1. 建立order 2. 建立訂單給付款連結(尚未付款) 傳送line pay request API res會拿到付款連結 3. 取得付款連結, 給user做後需付款動作

// 確認付款連結應如何呈現給user, ex: button / 直接轉址導到該頁面(無須button)
// 若用button, 需要一個頁面呈現 按下create-order這api
// 跑loading, 等api完成, get response 是事件監聽, 若有值進去, 就轉導
// confirm-order -----1. 透過queryString取得order-id & transaction-ID (轉址回來會知道的參數)  2. 拿order_id到資料庫查詢, 該筆訂單的狀態（是否有該筆訂單） 需增加amount欄位 3.copy confirm API, if success 表付款完成, 需要改寫order狀態成『已付款』  付款成功！！
// app.get("/cart/create-order" 原本是這樣寫
cartRouter.get("/create-Order", async (req, res) => {
  try {
    //建立訂單
    const uuid = uuidv4();
    // 注意：user_id寫死 36 / order_amount寫死: 500
    // const sql = `INSERT INTO order_general(order_id, payment_status, user_id, payment_method, order_amount, delivery_method, delivery_address, delivery_status, order_date) VALUES (${uuid}, '未付款', 36, 'LINE PAY', 500, '宅配', ${delivery_address}, '備貨中', now())`;
    // const [result] = await db.query(sql);
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
      // youtube的做法
      // confirmUrl: `${LINEPAY_RETURN_HOST} ${LINEPAY_RETURN_CONFIRM_URL}`,
      // cancelUrl:`${LINEPAY_RETURN_HOST} ${LINEPAY_RETURN_CANCEL_URL}`
      // 家教的做法
      //       confirmUrl: "http:localhost:3002/confirm",
      //       cancelUrl: "http:localhost:3002/cancel",
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

// ------------------------- test linepay ------------------------
// "/createOrder/:oid"
// 1018 --> "/payMethod/:oid"
cartRouter.get("/payMethod", async (req, res) => {
  let output = {
    success: false,
    result: [],
  };
  // const order_id = parseInt(req.params.oid);
  //1018註掉
  // const order_id = req.params.oid;
  // console.log(order_id);

  try {
    // 1018
    const [[sql3]] = await db.query(
      `SELECT order_id FROM order_general ORDER BY order_date DESC LIMIT 1`
    );
    const oo = sql3.order_id;
    console.log(oo);
    // const todo = sql3.order_id;
    // const todos = todo.split("-")[0];
    // console.log(todos);

    // '%${sql3.order_id}%'
    const sql = `SELECT * FROM order_general JOIN oder_detail ON oder_detail.order_id = order_general.order_id JOIN product ON product.product_id = oder_detail.product_id JOIN product_img ON product_img.product_id = oder_detail.product_id JOIN user ON order_general.user_id = user.user_id WHERE oder_detail.order_id = '${oo}' AND product_img.showed_1st=1 AND user.user_id = 22`;
    const [result] = await db.query(sql);
    console.log(result);

    // 格式化 packages 1-1
    function formatData(result) {
      const b = result[0].order_date;
      console.log(b);
      return [
        {
          id: b,
          // id: result[0].order_id,
          amount: result[0].order_amount,
          products: [
            {
              name: result[0].product_name,
              quantity: result[0].order_quantity,
              price: result[0].price,
            },
          ],
        },
      ];
    }
    // 格式化 packages 1-2
    const formattedData = formatData(result);
    // 看packages 1-2格式化的樣子
    // console.log(), 使用JSON.stringify, 因若不用json.stringify, 它可能以[Object]的形式顯示，而不是展開嵌套對象的詳細內容。這是一種簡化的表示方法，防止在控制台中顯示大量的嵌套數據。
    console.log(JSON.stringify(formattedData, null, 2));

    const linePayClient = createLinePayClient({
      channelId: "2001065647",
      channelSecretKey: "5325621a629813e1a10602cc06f96db5",
      env: "development",
    });

    // 1018 -change orderId  & product_id
    // const b = result[0].order_date;
    // console.log(b);
    const toLine = await linePayClient.request.send({
      // body: req,
      body: {
        amount: result[0].order_amount,
        currency: "TWD",
        orderId: result[0].order_id,
        // 原本ok的 orderId: result[0].linpay,
        packages: formattedData,
        redirectUrls: {
          // youtube的做法
          // confirmUrl: `${LINEPAY_RETURN_HOST} ${LINEPAY_RETURN_CONFIRM_URL}`,
          // cancelUrl: `${LINEPAY_RETURN_HOST} ${LINEPAY_RETURN_CANCEL_URL}`,
          // 家教的做法
          // confirmUrl: "http:localhost:3080/cart",
          // cancelUrl: "http:localhost:3080/cart",
          // 1018 --> "http:localhost:3080/cart/order-complete"
          confirmUrl: "http:localhost:3080/cart/order-complete",
          cancelUrl: "linePay/cancel",
        },
      },
    });
    console.log(util.inspect(toLine, { depth: Infinity, colors: true }));

    // cors問題
    router.use(cors(corsOptions));
    // solution 2
    if (toLine?.body?.returnCode === "0000") {
      const aaa = toLine?.body?.info?.paymentUrl?.web;
      res.json(aaa);
      // console.log(webPaymentUrl);
    }


// 1018
// const trans = toLine?.body?.info?.transactionId
// console.log(trans)

    // solution3

    // const aa = util.inspect(toLine, { depth: Infinity, colors: true });
    // console.log(aa);

    // res.json({ success: !!result.affectedRows });

    // ------ 1017 add -------
    // 使用可選串連 --> 『?.』 因line pay回覆結構每次不相同, 使用這運算符讓我們在讀取深度嵌套的對象屬性時，不必明確檢查每一個層級是否存在。如果某個層級不存在，它會返回 undefined，而不會拋出錯誤
    // if (res?.body?.returnCode === "0000") {
    //   res.redirect(res?.body.info.paymentUrl.web);
    // }
  } catch (e) {
    console.log("error", e);
  }
});


// 這段有需要嗎？


// --------------confirm--------------------------

// cartRouter.get("/linePay/confirm/:transactionId/:orderId", async(req, res) => {
//   router.use(cors(corsOptions));
//   console.log('開始')
//   let output = {
//   success: false,
//   result: [],
//   };
//   console.log('back')
// const tran = req.params.transactionId
// const orderId = req.params.orderId
// //hahahha
// const confirmRequest = {
//   transactionId: tran,
//   orderId: orderId, // 与支付请求时的 orderId 相同
//   amount: 1160, // 与支付请求时的 amount 相同
// };


//   try {
//       const lastLine = await createLinePayClient.confirm.send(
//         {confirmRequest}
//       //   {
//       //   transactionId: tran,
//       //   body: {
//       //     currency: "TWD",
//       //     // amount需要查資料庫的訂單
//       //     amount: 1160,
//       //   },
//       // }
//       );
//       console.log('我成功了')
//       console.log(util.inspect(lastLine, { depth: Infinity, colors: true }));
//       console.log("hihihi")
//     } catch (e) {
//       console.log("error", e);
//     }
// });



// 1016註掉
// try {
//   const res = await linePayClient.confirm.send({
//     transactionId: "2023100802022614510",
//     body: {
//       currency: "TWD",
//       // amount需要查資料庫的訂單
//       amount: result[0].order_amount,
//     },
//   });
//   console.log(util.inspect(res, { depth: Infinity, colors: true }));
// } catch (e) {
//   console.log("error", e);
// }


// -------------------------------- 7-11 ----------------------------------------
const callback_url = process.env.SHIP_711_STORE_CALLBACK_URL;

// POST
cartRouter.post("/711", function (req, res, next) {
  console.log(callback_url)
  //console.log(req.body)
  let searchParams = new URLSearchParams(req.body);
  res.redirect(callback_url + "?" + searchParams.toString());
});

export default cartRouter;
