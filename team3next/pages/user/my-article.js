import { useEffect, useState } from "react";
import MyNavbar from "../../components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";
import UserPictureCard from "@/components/user/user-picturecard";
import Styles from "@/components/user/user-information.module.scss";

export default function UserMyfrom() {
  const [myaricle, setMyAricle] = useState([]);

  useEffect(() => {
    fetch(process.env.API_SERVER + "/api/user/my-article", {
      method: "POST",
      body: JSON.stringify({
        user_id: localStorage.auth.user_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setMyAricle(r);
        console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  return (
    <>
      <MyNavbar />
      <UserInfo></UserInfo>
      <UserNavbar></UserNavbar>
      {myaricle.length > 0 ? (
        <div className={"container mb-5" + " " + `${Styles.wbc}`}>
          <div className={Styles.wma}>XXX篇文章</div>
          <div className={Styles.imgArea}>
            <UserPictureCard></UserPictureCard>
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
          還沒有文章喔~
        </div>
      )}
      <Footer></Footer>
      <Head>
        <title>我的文章</title>
      </Head>
    </>
  );
}
