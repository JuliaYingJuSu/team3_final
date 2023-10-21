import MyNavbar from "@/components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";
import styles from "./my-book.module.css";
import Link from "next/link";
import AuthContext from "@/hooks/AuthContext";
import { useEffect, useState, useContext } from "react";

export default function MyBook() {
  const [myBook, setMyBook] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${auth.user_id}/my-book`)
      .then((r) => r.json())
      .then((r) => {
        setMyBook(r);
        console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [auth.user_id]);

  return (
    <>
      <Head>
        <title>食食嗑嗑-訂位紀錄</title>
      </Head>
      <MyNavbar></MyNavbar>
      <UserInfo></UserInfo>
      <UserNavbar />

      {/* 訂位紀錄開始 */}
      <div className={styles.recordBox + " container p-5 w-100 mb-5"}>
        <p className={styles.head + " grey"}>訂位紀錄</p>

        <table className="table table-hover">
          <thead className=" bottom-line-g">
            <tr>
              <th className="align-middle">用餐日期</th>
              <th className="align-middle">用餐時間</th>
              <th className="align-middle">用餐人數</th>
              <th className="align-middle">餐廳名稱</th>
              <th className="align-middle"></th>
            </tr>
          </thead>

          <tbody>
            {myBook.map((book, i) => {
              const originalBookDate = new Date(book.book_date);
              const offset = originalBookDate.getTimezoneOffset();
              const correctedBookDate = new Date(
                originalBookDate.getTime() - offset * 60 * 1000
              );
              console.log(correctedBookDate);
              const shortBookDate = correctedBookDate
                .toISOString()
                .split("T")[0];
              const shortBookTime = book.book_time.split(":")[0] + ":00";
              const isPastDate = originalBookDate < new Date();
              const grayStyle = isPastDate
                ? { backgroundColor: "" }
                : { backgroundColor: "ivory" };
              return (
                <tr key={i} className={styles.topLine}>
                  <td className="align-middle pt-2" style={grayStyle}>
                    {shortBookDate}
                  </td>
                  <td className="align-middle pt-2" style={grayStyle}>
                    {shortBookTime}
                  </td>
                  <td className="align-middle pt-2" style={grayStyle}>
                    {book.book_num_adult + book.book_num_kid}
                  </td>
                  <td className="align-middle pt-2" style={grayStyle}>
                    <Link href={`/book/${book.restaurant_id}`}>
                      {book.restaurant_name}
                    </Link>
                  </td>
                  <td className="align-middle pt-2" style={grayStyle}>
                    <div className="my-1 d-flex justify-content-end a">
                      <Link
                        href={`/user/:user_id/my-book/${book.book_id}`}
                        className="btn btn-big"
                      >
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
