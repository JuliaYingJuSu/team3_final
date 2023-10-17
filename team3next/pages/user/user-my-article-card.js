import React from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import WhoInfo from "@/components/user/who-info";
import Link from "next/link";
import Styles from "@/components/user/user-information.module.scss";
import Card from "@/components/layout/card";
import Footer from "@/components/layout/default-layout/footer";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function UserMyArticleCard() {
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
            className="icon-square"
            style={{ fontSize: 35 }}></Link>

          <Link
            href="/user/user-my-article-card"
            className="icon-list-active"
            style={{ fontSize: 35 }}></Link>
        </div>
      </div>
      <div className={"container mb-5" + " " + `${Styles.wbc}`}>
        <div className={Styles.wma}>XXX篇文章</div>
        <div className="row row-cols-1 row-cols-xl-3 container mx-1 my-3 px-5 mb-5 ">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
      <Footer></Footer>
      <Head>
        <title>{usermyimgcard.nickname}的文章</title>
      </Head>
    </>
  );
}
