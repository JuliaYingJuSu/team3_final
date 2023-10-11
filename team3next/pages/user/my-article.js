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
    fetch(process.env.API_SERVER + "/api/user/my-article")
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
      <div className={"container mb-5" + " " + `${Styles.wbc}`}>
        <div className={Styles.wma}>XXX篇文章</div>
        <div className={Styles.imgArea}>
          {myaricle.length > 0 ? (
            <UserPictureCard></UserPictureCard>
          ) : (
            "目前沒有文章喔!"
          )}
        </div>
      </div>
      <Footer></Footer>
      <Head>
        <title>我的文章</title>
      </Head>
    </>
  );
}
