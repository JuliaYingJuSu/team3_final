import { useState, useEffect } from "react";
import styles from "./pay-method.module.css";
import MyNavbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";
import style from "@/pages/product/list.module.css";
import secstyle from "@/pages/cart/del-detail.module.css";
import productDetail from "@/pages/product/[pid]";
import { Helmet } from "react-helmet";
import { useRouter } from "next/router";
import Link from "next/link";

export default function PayMethod() {
  const [data, setData] = useState([]);

  // 付款方式
  const payOptions = ["7-11超商取貨付款", "LinePay", " 貨到付款(現金)"];
  // 付款方式的狀態
  const [payMethod, setPayMethod] = useState("");
  // 發票
  const [invoice, setInvoice] = useState(false);
  const [selectedValue, setSelectedValue] = useState("giveDog");
  const options = [
    { invoiceName: "愛貓協會(921314)", value: "giveCat " },
    { invoiceName: "台灣流浪動物希望協會(119)", value: "giveDog" },
  ];
  // 錯誤用初始狀態
  const originError = { paymethod: "" };
  const [error, setError] = useState(originError);

  const handleSend = (e) => {
    e.preventDefault();
    // 信號值
    let hasError = false;
    const newError = { ...originError };
    if (!payMethod) {
      hasError = true;
      newError.paymethod = "*請選擇付款方式";
    }

    if (hasError) {
      setError(newError);
      return;
    }
  };

  const router = useRouter();
  // const order_id = data.order_id;
  // const order_id = "4354";
  useEffect(() => {
    if (router.isReady) {
      console.log(router.asPath);
      // 1018 先註
      // const oid = router.query.payMethod;

      // console.log(oid);
      // 因一開始使用, const oid = router.query.order_id; oid顯示undefined !
      //router.asPath --> 可看現在router抓到的網址
      // console.log(typeof oid);
      // const oid = JSON.stringify(ooo);
      //  1018 ----> `http://localhost:3002/api/cart/payMethod/${oid}`
      fetch(`http://localhost:3002/api/cart/payMethod`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((obj) => {
          setData(obj);
          console.log("---------------------------");
          console.log(obj);
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
    // router好了, 就再重新run 一次
  }, [router.isReady]);

  return (
    <>
      <Helmet>
        <title>食食嗑嗑-購物車</title>
      </Helmet>
      <MyNavbar />
      <div className={styles.designTop}>
        {/* 商城bar */}
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

        {/* 購物進度條 */}
        <div className={secstyle.sectionBar + " mt-5"}>
          {/* <div className="w-75 d-flex justify-content-between"> */}
          <a href="" className={secstyle.firstStep}>
            <p className="text-start ">顧客</p>
          </a>

          <a href="" className={secstyle.firstStep}>
            <p className="text-start">配送</p>
          </a>

          <a href="" className={secstyle.firstStep}>
            <p className="text-start">付款</p>
          </a>

          <a href="" className={secstyle.lastStep}>
            <p className="text-start">檢視</p>
          </a>

          {/* </div> */}
        </div>
        {/* form */}
        <form onSubmit={handleSend}>
          {/* 付款方式 */}
          <div className="container d-flex justify-contet-center flex-column mt-5 w-50">
            <p className={styles.pay + " pb-1 "}>
              付款方法
              {
                <span
                  className="ms-3"
                  style={{ color: "red", fontSize: "13px" }}
                >
                  {error.paymethod}
                </span>
              }
            </p>

            {payOptions.map((v, i) => {
              return (
                <div className="form-check" key={i}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={v}
                    value={v} // value指的是當前選中的選項的值
                    checked={payMethod === v}
                    onChange={(e) => {
                      //狀態中記錄的是每個選項被選中的值
                      setPayMethod(e.target.value);
                      // 每次選項更改時, 重置錯誤消息
                      setError(originError);
                    }}
                  />
                  <label
                    className={styles.payFontt + " form-check-label mb-2"}
                    htmlFor={v}
                  >
                    {v}
                  </label>
                </div>
              );
            })}
          </div>

          {/* 發票資訊 */}
          <div className="container mt-4 w-50">
            <p className={styles.pay + " pb-1"}>發票資訊</p>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="invoice1"
                value="cloudInvoice"
                onChange={() => setInvoice(true)}
                checked
              />
              <label
                className={styles.payFontt + " form-check-label"}
                htmlFor="invoice1"
              >
                捐贈發票
              </label>
            </div>
          </div>
          {/* 隱私條款 */}
          <div className="form-check container d-flex justify-content-center my-5 fs14">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="agreecheck"
            />

            <label className="form-check-label" htmlFor="agreecheck">
              我同意接受 服務條款 & 隱私權政策
            </label>
          </div>

          <div className="container d-flex justify-content-center fs12">
            <div className="row">
              <div className="col-12">
                ※下單前請再次確認您的購買明細及配送資訊，訂單成立後無法異動訂單內容
              </div>
            </div>
          </div>
        </form>
        <div className="container d-flex justify-content-center my-5">
          <a href={data}>
            <button
              type="submit"
              // onClick={handleSend}
              className="btn btn-middle"
            >
              前往結帳
            </button>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
