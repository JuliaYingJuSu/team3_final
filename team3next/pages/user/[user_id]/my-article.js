import MyNavbar from "../../../components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";
import UserPictureCard from "@/components/user/user-picturecard";
import Styles from "@/components/user/user-information.module.scss";
import AuthContext from "@/hooks/AuthContext";
import { useEffect, useState, useContext } from "react";

export default function UserMyfrom() {
  const [myaricle, setMyAricle] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${auth.user_id}/my-article`)
      .then((r) => r.json())
      .then((r) => {
        setMyAricle(r);
        // console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [auth.user_id]);

  return (
    <>
      <MyNavbar />
      <UserInfo></UserInfo>
      <UserNavbar></UserNavbar>
      {myaricle.length > 0 ? (
        <div className={"container mb-5" + " " + `${Styles.wbc}`}>
          <div className={Styles.wma}>{myaricle.length} 篇文章</div>
          <div className={Styles.imgArea}>
            {myaricle.map((article,i) => {
              return (
                <div key={i}>
                  <UserPictureCard article={article}></UserPictureCard>
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
        <title>我的文章</title>
      </Head>
    </>
  );
}
