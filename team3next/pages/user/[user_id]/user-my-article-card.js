import React from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import WhoInfo from "@/components/user/who-info";
import Link from "next/link";
import Styles from "@/components/user/user-information.module.scss";
import Card from "@/components/layout/card";
import Footer from "@/components/layout/default-layout/footer";
import Head from "next/head";

export default function UserMyArticleCard() {
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
        <title>XXX的文章</title>
      </Head>
    </>
  );
}
