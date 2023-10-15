import AuthContext from "@/hooks/AuthContext";
import { useEffect, useState, useContext } from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";
import Styles from "@/components/user/user-information.module.scss";
import UserSCard from "@/components/user/user-s-card";

export default function Author() {
  const { auth } = useContext(AuthContext);
  const [myauthor, setMyAuthor] = useState([]);

  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${auth.user_id}/myauthor`)
      .then((r) => r.json())
      .then((r) => {
        setMyAuthor(r);
        console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [auth.user_id]);

  return (
    <>
      <MyNavbar></MyNavbar>
      <UserInfo myauthor={myauthor}></UserInfo>
      <UserNavbar />
      {myauthor.length > 0 ? (
        <div className={"container mb-5" + " " + `${Styles.afs}`}>
          <div className={Styles.authorText}>共有 {myauthor.length} 位追蹤</div>
          <div className="container mt-4">
            <div className="row row-cols-auto g-4">
              {myauthor.map((author, i) => {
                return (
                  <div className="col" key={i}>
                    <UserSCard author={author}></UserSCard>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            fontSize: 22,
            color: "grey",
            width: 800,
            textAlign: "center",
            marginTop: 45,
            height: 400,
            marginLeft: 20,
          }}>
          還沒有人追蹤喔~
        </div>
      )}

      <Footer></Footer>
      <Head>
        <title>追蹤作者</title>
      </Head>
    </>
  );
}
