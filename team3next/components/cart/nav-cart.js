import { useState, useEffect } from "react";
import styles from "./nav-cart.module.css";

export default function NavCart() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3002/cart")
  //     .then((r) => r.json())
  //     .then((data) => {
  //       setData(data);
  //       console.log(data);
  //     })
  //     .catch((ex) => {
  //       console.log(ex + "good");
  //     });
  // }, []);

  return (
    <>
      {data.map((v, i) => {
        return (
          <div className="d-flex w-100 border-top border-bottom py-3">
            <div className="w-50">
              <img
                className="img-fluid"
                src={"images/product/" + v.product_img}
                alt="檸檬大叔"
              />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12">{v.product_name}</div>
                <div className="col-6 pt-2">售價</div>
                <div className="col-6 pt-2">{v.price}</div>
                <div className="col-6 pt-2">數量</div>
                <div className="col-6 pt-2">{v.cart_quantity}</div>
              </div>
            </div>
          </div>
        );
      })}

      <div className={styles.checkout + " d-grid col-12 mx-auto mt-4"}>
        <button className="btn align-items-center">結帳</button>
      </div>
    </>
  );
}
