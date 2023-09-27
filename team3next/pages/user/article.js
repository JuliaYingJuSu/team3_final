import React from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";
import Styles from "@/components/user/user-information.module.scss";
import Card from "@/components/layout/card";

export default function Article() {
  return (
    <>
      <MyNavbar></MyNavbar>
      <UserInfo></UserInfo>
      <UserNavbar />
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
        <title>收藏文章</title>
      </Head>
    </>
  );
}