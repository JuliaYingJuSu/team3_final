import React from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";
import Link from "next/link";

export default function MyBook() {
  return (
    <>
      <Head>
        <title>訂位紀錄</title>
      </Head>
      <MyNavbar></MyNavbar>
      <UserInfo></UserInfo>
      <UserNavbar />
      <div
        className="container"
        style={{ marginTop: "50px", marginBottom: "80px" }}
      >
        <div className="msg mb-2 pb-2 fs-5 d-flex justify-content-start">
          <div className="th">日期</div>
          <div className="th">時間</div>
          <div className="th">人數</div>
          <div className="th">餐廳名稱</div>
        </div>
        {Array(5)
          .fill(1)
          .map((i) => {
            return (
              <div
                key={i}
                className="msg2 fs-6 my-1 py-3 d-flex justify-content-start"
              >
                <div className="th">2023/09/30</div>
                <div className="th">18:00</div>
                <div className="th">4 位</div>
                <div className="th">
                  <Link href="/book/restaurant">
                    Cin Cin Osteria 請請義大利餐廳
                  </Link>
                </div>
                <button className="btn btn-little fs16 ms-auto me-4">
                  詳細
                </button>
              </div>
            );
          })}
      </div>
      <Footer></Footer>
      <style jsx>
        {`
          .msg {
            border-bottom: 1px solid black;
          }
          .msg2 {
            border-bottom: 1px solid #869aaa;
          }
          .th {
            width: 250px;
            text-align: center;
          }
        `}
      </style>
    </>
  );
}
