import { useState, useEffect } from "react";
import styles from "./order-complete.module.css";
import MyNavbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";
import style from "@/pages/product/list.module.css";
import productDetail from "@/pages/product/[pid]";
import swal from "sweetalert2";
import Pay from '@/components/cart/LoadingLinePay'


export default function OrderComplete() {
  const [data, setData] = useState([]);


  // const sweet = () => {
  //   new swal({
  //     title: "訂單已成立!",
  //     text: "訂單詳細內容請至會員中心查詢",
  //     icon: "success",
  //     timer: 1500,
  //   });
  // };

  useEffect(() => {
    fetch("http://localhost:3002/api/cart/order-complete")
      .then((r) => r.json())
      .then((obj) => {
        setData(obj);
        console.log(obj);
      });
  }, []);

//---------------- 做linePay Loading ---------------------
const [loading, setLoading] = useState(false);

useEffect(() => {
  setTimeout(() => {
    setLoading(true);
  }, 1200000);
}, []);
//---------------- 做linePay Loading end ---------------------



  return (
    <>
      <MyNavbar />

      {/* 商城bar */}
      <div
        className={style.topBox + " container d-flex justify-content-around"}
      >
        <button className="btn" type="button">
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

      {/* 購物進度條 */}
      <div className={styles.sectionBar + " mt-5"}>
        {/* <div className="w-75 d-flex justify-content-between"> */}
        <a href="" className={styles.step}>
          <p className="text-start ">顧客</p>
        </a>

        <a href="" className={styles.step}>
          <p className="text-start">配送</p>
        </a>

        <a href="" className={styles.step}>
          <p className="text-start">付款</p>
        </a>

        <a href="" className={styles.lastStep}>
          <p className="text-start">檢視</p>
        </a>

        {/* </div> */}
      </div>

      <div className="container text-center">
        {/* check文字 */}
        {/* <div className="icon-check mt-4"></div> */}

        <div className="my-5 h5">謝謝您！您的訂單已經成立！</div>
        {/* <button onClick={sweet}> 送出</button> */}
      </div>
{/* linePay-Loading畫面 */}
{loading ?   
data.map((v, i) => {
        return (
          <>
            <div
              className="container w-50 d-flex border p-5 mb-5 justify-content-between"
              key={i}
            >
              <div className="row justify-content-center w-50">
                <div className="col-sm-6 py-1">訂單號碼</div>
                <div className="col-sm-6 py-1">{v.order_id.split("-")[0]}</div>
                <div className="col-sm-6 py-1">訂單日期</div>
                <div className="col-sm-6 py-1">{v.order_date}</div>
                <div className="col-sm-6 py-1">配送方式</div>
                <div className="col-sm-6 py-1">{v.delivery_method}</div>
                <div className="col-sm-6 py-1">付款方式</div>
                <div className="col-sm-6 py-1">{v.payment_method}</div>
                <div className="col-sm-6 py-1">收件資訊</div>
                <div className="col-sm-6 py-1">{v.delivery_address}</div>
                {/* 強迫col換行 */}
                {/* <div class="w-100"></div> */}
              </div>

              <div className="row justify-content-center d-flex w-25">
                <a
                  href="http://localhost:3080/user/:user_id/my-order"
                  className="col-12 col-sm-12 py-1"
                >
                  <button className="btn btn-middle w-100">訂單詳情</button>
                </a>
                <div className="col-12 col-sm-12 py-1 justify-content-center d-flex">
                  <p>訂單金額 </p>
                  <p>{"NT$" + v.order_amount}</p>
                </div>
                {/* <div className="col-6 col-sm-6 py-1"></div> */}
              </div>
            </div>
          </>
        );
      }):<Pay />}

      <Footer />
    </>
  );
}
