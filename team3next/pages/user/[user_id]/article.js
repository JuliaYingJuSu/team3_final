import React from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";
import Styles from "@/components/user/user-information.module.scss";
import WhoCard from "@/components/user/who-card";
import { useEffect, useState, useContext } from "react";
import AuthContext from "@/hooks/AuthContext";

export default function Article() {
  const { auth } = useContext(AuthContext);
  const [article, setArticle] = useState([]);

  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${auth.user_id}/article`)
      .then((r) => r.json())
      .then((r) => {
        setArticle(r);
        console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [auth.user_id]);
  return (
    <>
      <MyNavbar></MyNavbar>
        <UserInfo></UserInfo>
      <UserNavbar />
      <div className={"container mb-5" + " " + `${Styles.wbc}`}>
        <div className={Styles.wma}>{article.length} 篇文章</div>
        <div className="row row-cols-1 row-cols-xl-3 container mx-1 my-3 px-5 mb-5 ">
        {article.map((usercard, i) => {
                return (
                  <div className="col" key={i}>
                    <WhoCard usercard={usercard}></WhoCard>
                  </div>
                );
              })}
         
        </div>
      </div>
      <Footer></Footer>
      <Head>
        <title>收藏文章</title>
      </Head>
    </>
  );
}
