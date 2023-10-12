import React from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";
import styles from "./my-book.module.css";
import Link from "next/link";

export default function MyBook() {
  const data = [
    {
      book_date: "2023/11/07",
      book_time: "17:00",
      book_num: "4 位",
      r_name: "Cin Cin Osteria 請請義大利餐廳",
    },
    {
      book_date: "2023/11/07",
      book_time: "17:00",
      book_num: "4 位",
      r_name: "Cin Cin Osteria 請請義大利餐廳",
    },
  ];
  return (
    <>
      <Head>
        <title>訂位紀錄</title>
      </Head>
      <MyNavbar></MyNavbar>
      <UserInfo></UserInfo>
      <UserNavbar />

      {/* 訂位紀錄開始 */}
      <div className={styles.recordBox + " container p-5 w-100"}>
        <p className={styles.head + " grey"}>訂位紀錄</p>

        <table className="table table-hover">
          <thead className=" bottom-line-g">
            <tr>
              <th className="align-middle">訂位日期</th>
              <th className="align-middle">訂位時間</th>
              <th className="align-middle">訂位人數</th>
              <th className="align-middle">餐廳名稱</th>
              <th className="align-middle"></th>
            </tr>
          </thead>

          <tbody>
            {data.map((i) => {
              return (
                <tr key={i.book_date} className={styles.topLine}>
                  <td className="align-middle pt-2">{i.book_date}</td>
                  <td className="align-middle pt-2">{i.book_time}</td>
                  <td className="align-middle pt-2">{i.book_num}</td>
                  <td className="align-middle pt-2">
                    <Link href="/book/restaurant">{i.r_name}</Link>
                  </td>
                  <td className="align-middle pt-2">
                    <div className="my-1 d-flex justify-content-end a">
                      <Link href="/book/detail" className="btn btn-big">
                        詳細
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Footer></Footer>
    </>
  );
}
