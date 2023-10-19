import { useState, useEffect } from "react";
import styles from "./nav-cart.module.css";
// import { Router, useRouter } from "next/router";
import Link from "next/link";
import RunContext from "@/hooks/RunContext";
import { useContext } from "react";

export default function NavCart() {
  const [data, setData] = useState([]);
  const { run } = useContext(RunContext);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setData(cart);
    }
  }, [run]);

  // const router = useRouter();
  return (
    <>
      {data &&
        data.map((v, i) => {
          // console.log(v || 0);

          return (
            <div key={i} className="d-flex w-100 border-top border-bottom py-3">
              <div className="w-50">
                <img
                  className="img-fluid"
                  src={"/images/product/" + v.product_img}
                  alt=""
                />
              </div>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12">{v.product_name}</div>
                  <div className="col-6 pt-2">售價</div>
                  <div className="col-6 pt-2">{v.price}</div>
                  <div className="col-6 pt-2">數量</div>
                  <div className="col-6 pt-2">{v.quantity}</div>
                </div>
              </div>
            </div>
          );
        })}
      <p style={{ textAlign: "end", padding: "10px", fontWeight: "bold" }}>
        {data.length > 0
          ? `小計:${data.reduce((a, i) => {
              return a + i.quantity * i.price;
            }, 0)}`
          : ""}
      </p>

      {data.length > 0 ? (
        <div
          className={
            styles.checkout +
            "d-flex justify-content-end d-grid col-12 mx-auto mt-4"
          }
        >
          {/* <button
          className="btn align-items-center"
          onClick={() => {
            router.push("/cart");
          }}
        >
          結帳
        </button> */}
          <a href="/cart" className="btn btn-big h-auto">
            結帳
          </a>
        </div>
      ) : (
        <h5 className="h6 px-4">快快挑選商品吧~</h5>
      )}
    </>
  );
}
