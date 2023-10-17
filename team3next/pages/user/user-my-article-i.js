import React from "react";
import Link from "next/link";
import Head from "next/head";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import WhoInfo from "@/components/user/who-info";
import WhoPictureCard from "@/components/user/who-picturecard";
import Styles from "@/components/user/user-information.module.scss";
import Footer from "@/components/layout/default-layout/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function UserMyArticleI() {
  const router = useRouter();
  const [usermyimgcard, setUserImgMyCard] = useState([]);
  //由動態變數獲得user_id
  const { user_id } = router.query;

  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${user_id}/userInfoImg`)
      .then((r) => r.json())
      .then((r) => {
        setUserImgMyCard(r);
        console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [user_id]);

  return (
    <>
      <MyNavbar></MyNavbar>
      <WhoInfo></WhoInfo>
      <div className="container bottom-line">
        <div className="container d-flex justify-content-around align-items-center my-3">
          <Link
            href="/user/user-my-article-i"
            className="icon-square-active"
            style={{ fontSize: 35 }}></Link>

          <Link
            href="/user/user-my-article-card"
            className="icon-list"
            style={{ fontSize: 35 }}></Link>
        </div>
      </div>
      <div className={"container mb-5" + " " + `${Styles.wbc}`}>
        <div className={Styles.wma}>XXX篇文章</div>
        <div className={Styles.imgArea}>
          <WhoPictureCard></WhoPictureCard>
          <WhoPictureCard></WhoPictureCard>
          <WhoPictureCard></WhoPictureCard>
          <WhoPictureCard></WhoPictureCard>
          <WhoPictureCard></WhoPictureCard>
          <WhoPictureCard></WhoPictureCard>
          <WhoPictureCard></WhoPictureCard>
          <WhoPictureCard></WhoPictureCard>
          <WhoPictureCard></WhoPictureCard>
        </div>
      </div>
      <Footer></Footer>
      <Head>
        <title>{usermyimgcard.nickname}</title>
      </Head>
    </>
  );
}
