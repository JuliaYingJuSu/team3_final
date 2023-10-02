import React from "react";
import styles from "./order-d.module.css";
import MyNavbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";
import style from "@/pages/product/list.module.css";
import productDetail from "@/pages/product/[pid]";
import ProductComment from "@/components/cart/product-comment";

export default function OrderComplete() {
  return (
    <>
      <MyNavbar />
      <div
        className={style.topBox + " container d-flex justify-content-around"}
      >
        <button class="btn" type="button">
          全部商品
        </button>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            飲品/沖泡類
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                茶葉/水果茶
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                咖啡
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                果汁/蔬果汁
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                醋/水果醋
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            烘焙食品/甜點
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                蛋糕/派
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                手工餅乾
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                麵包/吐司
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                奶酪/布丁/果凍
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            休閒零食
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                零食
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                糖果/巧克力
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                果醬/抹醬
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                水果乾
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                堅果/穀物
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            烹料料理
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                熟食/冷藏、冷凍食品
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                米/麵條
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                調理包/料理包
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                調味料/醬料
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            其他
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                其他
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container d-flex flex-column my-5">
        <div className={styles.secondBox + " text-center py-4"}>
          <p className="m-0">合計：NT$320</p>
          <p className="m-0 pt-2">購物車(1件)</p>
        </div>

        {/* 訂單細項 */}
        <table className={styles.cutBorder + " table mt-3"}>
          <thead>
            <tr className={styles.productTitle}>
              <th className={styles.cutBorder} scope="col">
                商品資訊
              </th>
              <th className={styles.cutBorder} scope="col"></th>
              <th className={styles.cutBorder} scope="col">
                數量
              </th>
              <th className={styles.cutBorder} scope="col">
                單價
              </th>
              <th className={styles.cutBorder} scope="col">
                小計
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.productDetail + " container"}>
              <td className={styles.imgWidth + " w-20"}>
                <img
                  className="img-fluid rounded-1"
                  src="https://rs.joo.com.tw/website/uploads_product/website_1060/P0106000282607_3_1674263.jpg?_4431"
                  alt=""
                />
              </td>
              <td className={styles.cutBorder + " align-middle"}>
                【檸檬大叔】100%純檸檬磚(12入/盒)
              </td>
              <td className={styles.cutBorder + " align-middle"}>
                <span className="icon-minus me-3"></span>1
                <span className="icon-plus ms-3"></span>
              </td>
              <td className={styles.cutBorder + " align-middle"}>NT$320</td>
              <td className={styles.cutBorder + " align-middle"}>NT$320</td>
              <td className={styles.cutBorder + " align-middle"}>
                {<ProductComment />}
              </td>
            </tr>
          </tbody>
        </table>

        {/* 計算 */}
        <div className={styles.totalBox + " text-end"}>
          <p>小計NT$320</p>
          <p>運費NT$60</p>
          <p>合計NT$380</p>
        </div>

        {/* 底下訂單資訊 */}
        <div className="container w-100 border mt-4 d-flex justify-content-center ">
          <div className="row d-flex justify-content-start m-auto">
            <div className="ms-1 mt-3 row col-xxl-6">
              <div className={styles.titleBar + " col-12 py-1"}>訂單資訊</div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                訂單號碼：
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                2023071411125
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                訂單郵件：
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                fdfmnnk@gmail.com
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                訂單日期：
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                2023-09-08 10:38PM
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                訂單狀態：
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                備貨中
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                訂單完成時間：
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                備貨中
              </div>
            </div>
            {/* ------------ */}
            <div className="ms-1 mt-3 row col-xxl-6">
              <div className={styles.titleBar + " col-12 py-1"}>顧客資訊</div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                姓名：
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                田嘉瑞
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                電話號碼：
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                0972981204
              </div>
              <div className="h-100 col-xxl-12 py-1"></div>
              {/* <div className="col-xxl-12 py-1"></div> */}
              {/* <div className="col-xxl-12 py-1"></div> */}
            </div>

            <div className="ms-1 mt-3 row col-xxl-6">
              <div className={styles.titleBar + " col-12 py-1"}>送貨資訊</div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                送貨方式：
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                宅配
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                送貨狀態：
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                備貨中
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                配送地址：
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                松山區興安街
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                收件人中文全名：
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                田嘉瑞
              </div>
              {/* 強迫col換行 */}
              {/* <div class="w-100"></div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
