import React from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import WhoInfo from "@/components/user/who-info";
import Link from "next/link";
import Styles from "@/components/user/user-information.module.scss";
import WhoCard from "@/components/user/who-card";
import Footer from "@/components/layout/default-layout/footer";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function UserMyArticleCard() {
  const router = useRouter();
  const [usermycard, setUserMyCard] = useState([]);
  //由動態變數獲得user_id
  const { user_id } = router.query;

  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${user_id}/userInfoImg`)
      .then((r) => r.json())
      .then((r) => {
        setUserMyCard(r);
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
            href={`/user/${user_id}/user-my-article-i/`}
            className="icon-square"
            style={{ fontSize: 35 }}></Link>

          <Link
            href={`/user/${user_id}/user-my-article-card/`}
            className="icon-list-active"
            style={{ fontSize: 35 }}></Link>
        </div>
      </div>
      {usermycard.length > 0 ? (
        <div className={"container mb-5" + " " + `${Styles.wbc}`}>
          <div className={Styles.wma}>{usermycard.length}篇文章</div>
          <div className="row row-cols-1 row-cols-xl-3 container mx-1 my-3 px-5 mb-5 ">
            {usermycard.map((usercard, i) => {
              return (
                <div key={i}>
                  <WhoCard usercard={usercard}></WhoCard>
                </div>
              );
            })}
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
        <title>XXX的文章</title>
      </Head>
    </>
  );
}
