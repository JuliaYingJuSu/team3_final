import React, { useEffect, useState } from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";
import styles from "./wishlist.module.css";

export default function WishList() {
  const [wish, setWish] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/wishList", {
      method: "POST",
      // body: JSON.stringify({
      //   uid: localStorage.???
      // }),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    })
      .then((r) => r.json())
      .then((r) => {
        setWish(r);
        console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  const handleWish = (v) => {
    console.log(v);
    fetch("http://localhost:3002/product/del-wish", {
      method: "POST",
      body: JSON.stringify({
        pid: v.product_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if (r) {
          location.reload();
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  return (
    <>
      <MyNavbar></MyNavbar>
      <UserInfo></UserInfo>
      <UserNavbar />
      <div className={styles.wishBox + " container p-5"}>
        <p className={styles.head + " grey"}>
          {wish.length > 0 ? "收藏商品" : "還沒有收藏收品唷～"}
        </p>
        {console.log(wish)}
        {wish.map((v, i) => {
          return (
            <div key={i} className={styles.wishItem + " w-100 d-flex mb-5"}>
              <p className={styles.pic}>
                <img
                  className=" w-100 h-100"
                  src={`/images/product/${v.product_img}`}
                  alt=""
                />
              </p>
              <div className={styles.content + " w-100 ms-3"}>
                <p>
                  <span className="">{v.product_name}</span>
                  <button
                    className="btn icon-trash rounded-pill"
                    onClick={
                      () => {
                        // console.log(v);
                        handleWish(v);
                      }
                      // handleWish //reat中不用傳參數時使用
                    }
                  ></button>
                </p>
                <p className="">
                  <span>NT$ </span>
                  <span>{v.price}</span>
                </p>
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
