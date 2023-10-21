import React from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";
import Styles from "@/components/user/user-information.module.scss";
import UserCard from "@/components/user/user-card";
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
        // console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [auth.user_id]);
  const [favs, setFavs] = useState([]);
  //接收加入收藏資料庫資料
  useEffect(() => {
    if(auth && auth.token)
    fetch(process.env.API_SERVER + "/api/post/fav",{
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((r) => r.json())
      .then((f) => {
        setFavs(f);
      })
      .catch((ex) => console.log(ex));
  }, [auth]);

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
                    <UserCard usercard={usercard}
                    favs={favs}
                  setFavs={setFavs}></UserCard>
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
  );+9
}
