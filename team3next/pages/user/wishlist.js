import React from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";
import styles from "./wishlist.module.css";

export default function WishList() {
  return (
    <>
      <MyNavbar></MyNavbar>
      <UserInfo></UserInfo>
      <UserNavbar />
      <div className={styles.wishBox + " container p-5"}>
        <p className={styles.head + " grey"}>收藏商品</p>
        {Array(5)
          .fill(1)
          .map((i) => {
            return (
              <div key={i} className={styles.wishItem + " w-100 d-flex mb-5"}>
                <p className={styles.pic}>
                  <img
                    className=" w-100 h-100"
                    src="/images/product/螢幕擷取畫面 2023-09-26 101926.png"
                    alt=""
                  />
                </p>
                <div className={styles.content + " w-100 ms-3"}>
                  <p>
                    <span className="">品牌 產品產品</span>
                    <button className="btn icon-trash rounded-pill"></button>
                  </p>
                  <p className=""> NT$ 1000</p>
                  <div className="mt-5 text-end btnBox">
                    <div className="me-2 my-1 btn btn-big">立即購買</div>
                    <div className="me-2 my-1 btn btn-big">加入購物車</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Footer></Footer>
      <Head>
        <title>收藏商品</title>
      </Head>
    </>
  );
}
