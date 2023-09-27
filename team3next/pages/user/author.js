import React from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";
import Styles from "@/components/user/user-information.module.scss";
import UserSCard from "@/components/user/user-s-card";

export default function Author() {
  return (
    <>
      <MyNavbar></MyNavbar>
      <UserInfo></UserInfo>
      <UserNavbar />
      <div className={"container mb-5" + " " + `${Styles.afs}`}>
        <div className={Styles.authorText}>共有 XXX 位追蹤</div>
        <div className="container mt-4">
          <div className="row row-cols-auto g-4">
            <div className="col">
              <UserSCard></UserSCard>
            </div>
            <div className="col">
              <UserSCard></UserSCard>
            </div>
            <div className="col">
              <UserSCard></UserSCard>
            </div>
            <div className="col">
              <UserSCard></UserSCard>
            </div>
            <div className="col">
              <UserSCard></UserSCard>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <Head>
        <title>追蹤作者</title>
      </Head>
    </>
  );
}
