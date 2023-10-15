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
        <title>訂位紀錄</title>
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
              <th className="align-middle">訂位日期</th>
              <th className="align-middle">訂位時間</th>
              <th className="align-middle">訂位人數</th>
              <th className="align-middle">餐廳名稱</th>
              <th className="align-middle"></th>
            </tr>
          </thead>

          <tbody>
            {myBook.map((book, i) => {
              const shortBookDate = book.book_date.split("T")[0];
              const shortBookTime = book.book_time.split(":")[0] + ":00";
              return (
                <tr key={i} className={styles.topLine}>
                  <td className="align-middle pt-2">{shortBookDate}</td>
                  <td className="align-middle pt-2">{shortBookTime}</td>
                  <td className="align-middle pt-2">
                    {book.book_num_adult + book.book_num_kid}
                  </td>
                  <td className="align-middle pt-2">
                    <Link href={`/book/${book.restaurant_id}`}>
                      {book.restaurant_name}
                    </Link>
                  </td>
                  <td className="align-middle pt-2">
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
