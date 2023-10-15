import React, { useContext, useEffect, useState } from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";
import styles from "./wishlist.module.css";
import Link from "next/link";
import AuthContext from "@/hooks/AuthContext";
import RunContext from "@/hooks/RunContext";

export default function WishList() {
  const [wish, setWish] = useState([]);
  const { run, setRun } = useContext(RunContext);

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("auth")).user_id);

    const uid = JSON.parse(localStorage.getItem("auth")).user_id;
    // const uid = auth.user_id;

    fetch("http://localhost:3002/api/product/wishList", {
      method: "POST",
      body: JSON.stringify({
        uid: uid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setWish(r);
        console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [run]);

  const handleWish = (v) => {
    console.log(auth);
    fetch("http://localhost:3002/api/product/del-wish", {
      method: "POST",
      body: JSON.stringify({
        pid: v.product_id,
        uid: auth.user_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if (r) {
          // console.log(!run);
          setRun(!run);
          // location.reload();
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  //加入購物車

  const handleAddCart = (v) => {
    //1如果有登入
    if (localStorage.getItem("auth")) {
      //2如果商品已經設定到data了(防useEffect錯)
      if (v.product_id) {
        //3如果localStorage已有購物車資料
        if (localStorage.getItem("cart")) {
          //拿出來找找看裡面有沒有目前頁面商品
          let cart = JSON.parse(localStorage.getItem("cart"));
          const existCart = cart.findIndex(
            (item) => item.product_id == v.product_id
          );
          //4如果localStorage cart有目前頁面商品 >>> 更新數量設定回去
          if (existCart >= 0) {
            const updateQuantity = parseInt(cart[existCart].quantity) + 1;

            const cartUpdateIndex = {
              ...cart[existCart],
              quantity: updateQuantity,
            };
            cart[existCart] = cartUpdateIndex;
            localStorage.setItem("cart", JSON.stringify(cart));
          } else {
            //4如果localStorage cart沒有目前頁面商品 >>> 在cart陣列增一筆新的
            console.log(
              "如果localStorage cart沒有目前頁面商品 >>> 在cart陣列增一筆新的"
            );
            cart.unshift({
              product_id: v.product_id,
              product_name: v.product_name,
              price: v.price,
              product_img: v.product_img,
              quantity: 1,
            });
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        } else {
          //3如果localStorage沒有購物車資料 >>> setItem
          console.log("如果localStorage沒有購物車資料 >>> setItem");
          const cart = [
            {
              product_id: v.product_id,
              product_name: v.product_name,
              price: v.price,
              product_img: v.product_img,
              quantity: 1,
            },
          ];
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    }
    // }
  };

  return (
    <>
      <MyNavbar></MyNavbar>
      <UserInfo></UserInfo>
      <UserNavbar />
      <div className={styles.wishBox + " container p-5"}>
        <p className={styles.head + " grey"}>
          {wish.length > 0 ? `收藏商品(${wish.length})` : "還沒有收藏收品唷～"}
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
                  <div
                    className="me-2 my-1 btn btn-big"
                    onClick={() => {
                      handleAddCart(v);
                    }}
                  >
                    <Link
                      href="/cart"
                      className="btn-big w-100 h-100 d-flex justify-content-center align-items-center p-0"
                    >
                      立即購買
                    </Link>
                  </div>
                  <div
                    className="me-2 my-1 btn btn-big"
                    onClick={() => {
                      handleAddCart(v);
                      setRun(!run);
                    }}
                  >
                    加入購物車
                  </div>
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
