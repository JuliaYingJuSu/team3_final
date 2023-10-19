import { useState, useEffect } from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";
import styles from "./my-order.module.css";
import Link from "next/link";
import { post } from "request";

export default function MyOrder() {

  const [data, setData] = useState([]);
  const getUid = JSON.parse(localStorage.getItem("auth"))
  const getUser = getUid.user_id;
  console.log(getUser)
  useEffect(() => {
    fetch("http://localhost:3002/api/cart/my-order", {
      method: "post",
      body:JSON.stringify({user_id: getUser}),
      headers: {"Content-Type": "application/json",}
    })
      .then((r) => r.json())
      .then((obj) => {
        setData(obj);
        console.log(obj);
      });
    // [data], 指當data有個更新時, 重做useEffect !
  }, []);
  return (
    <>
      <MyNavbar></MyNavbar>
      <UserInfo></UserInfo>
      <UserNavbar />

      {/* 消費紀錄開始 */}
      <div className={styles.recordBox + " container p-5 w-100"}>
        <p className={styles.head + " grey"}>消費紀錄</p>

        <table className="table table-hover">
          <thead className=" bottom-line-g">
            <tr>
              <th className="align-middle">訂單號碼</th>
              <th className="align-middle">訂單日期</th>
              <th className="align-middle">合計</th>
              <th className="align-middle">訂單狀態</th>
              <th className="align-middle"></th>
            </tr>
          </thead>

          <tbody>
            {data.map((i) => {
              return (
                <tr key={i.order_id} className={styles.topLine}>
                  <td className="align-middle pt-2">{i.order_id.split("-")[0]}</td>
                  <td className="align-middle pt-2">{i.order_date}</td>
                  <td className="align-middle pt-2">{`NT$` + i.order_amount}</td>
                  <td className="align-middle pt-2">{i.delivery_status}</td>
                  <td className="align-middle pt-2">
                    <div className="my-1 d-flex justify-content-end a">
                      {/* <div className="me-3 btn btn-big">編輯訂單</div> */}
                      <a href="../cart/order-d">
                        <div>
                          <Link
                            href={`/cart/order-d/${i.order_id}`}
                            className="btn btn-big"
                            //   href={"/cart/" + v.product_id}
                            // href={`/cart/${product_id}`}
                          >
                            查閱
                          </Link>
                        </div>
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Footer></Footer>
      <Head>
        <title>消費紀錄</title>
      </Head>
    </>
  );
}
