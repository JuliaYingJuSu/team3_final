import { useState, useEffect } from "react";
import styles from "./cart-detail.module.css";
import MyNavbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";

export default function CartDetail() {
  const [data, setData] = useState([]);

  // 運送方式
  const deliveryMethod = ["請選擇運送方式", "宅配", "7-11超商取貨"];
  const [delivery, setDelivery] = useState(["請選擇運送方式"]);

  // 更新商品數量
  const updateCount = (data, product_id, value) => {
    return data.map((v) => {
      if (v.product_id === product_id)
        return { ...v, cart_quantity: v.cart_quantity + value };
      else return { ...v };
    });
  };

  // 刪除商品
  const remove = (data, product_id) => {
    return data.filter((v) => {
      v.product_id !== product_id;
    });
  };

  useEffect(() => {
    fetch("http://localhost:3002/cart")
      .then((r) => r.json())
      .then((obj) => {
        setData(obj);
        console.log(obj);
      });
  }, []);
  //
  const delProduct = (id) => {
    console.log("---------");
    // const product_id = router.query.product_id;
    console.log(id);
    fetch(`http://localhost:3002/cart/${id}`, { method: "get" })
      .then((r) => r.json())
      .then((obj) => {
        if (obj.success) {
          location.reload();
        } else {
          alert("刪除發生錯誤");
        }
        // console.log(obj);
      })
      .catch((ex) => {
        console.log(123);
      });
  };

  return (
    <>
      <MyNavbar />

      {/* 購物進度條 */}
      <div className={styles.sectionBar + " mt-5"}>
        {/* <div className="w-75 d-flex justify-content-between"> */}
        <a href="" className={styles.firstStep}>
          <p className="text-start">顧客</p>
        </a>

        <div className={styles.step}>
          <p className="text-start">配送</p>
        </div>

        <div className={styles.step}>
          <p className="text-start">付款</p>
        </div>

        <div className={styles.lastStep}>
          <p className="text-start">檢視</p>
        </div>

        {/* </div> */}
      </div>

      {/* 購物車細項 -- START */}
      <div className={styles.cartContainer + " container mt-2"}>
        {/* <div className="fs-6">購物車(1)</div> */}
        <table className={styles.cutBorder + " table"}>
          <thead>
            {/* 若購物車要對齊 className={styles.productTitle + " border-0"} */}
            <tr>
              <th scope="col" className={styles.cartNum + " border-0"}>
                購物車(1)
              </th>
            </tr>
            <tr className={styles.productTitle}>
              <th scope="col">商品資訊</th>
              <th scope="col"></th>
              <th scope="col">數量</th>
              <th scope="col">單價</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            {data.map((v, i) => {
              return (
                <>
                  <tr
                    className={styles.productDetail + " container"}
                    key={v.cartproduct_id}
                  >
                    <td className={styles.imgWidth + " w-20"}>
                      <imgs
                        className=" rounded-1"
                        src={"images/product/" + v.product_img}
                        alt=""
                      />
                    </td>
                    <td className={styles.cutBorder + " align-middle"}>
                      {v.product_name}
                      {/* <span>{v.product_id}</span> */}
                    </td>
                    <td className={styles.cutBorder + " align-middle"}>
                      <button
                        className={styles.minus + " btn icon-minus me-3"}
                        onClick={() => {
                          // 若要移除商品只有在減號按鈕按下時會發生
                          // 臨界值信號：目前是1, 在按下減號按鈕, 會變為0, 變為0時要移除狀態
                          if (v.cart_quantity === 1) {
                            setData(remove(data, v.product_id));
                          } else {
                            setData(updateCount(data, v.product_id, -1));
                          }
                        }}
                      >
                        {/* <span className="icon-minus me-3"></span> */}
                      </button>
                      {v.cart_quantity}
                      <button
                        className={styles.minus + " btn icon-plus ms-3"}
                        onClick={() => {
                          setData(updateCount(data, v.product_id, 1));
                        }}
                      >
                        {/* <span className="icon-plus ms-3"></span> */}
                      </button>
                    </td>
                    <td className={styles.cutBorder + " align-middle"}>
                      {`NT$` + v.price}
                    </td>
                    <td className={styles.cutBorder + " align-middle"}>
                      {`NT$` + v.price * v.cart_quantity}
                    </td>
                  </tr>

                  <tr className="container">
                    <td>移至願望清單</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <a
                      //   href={"/cart/" + v.product_id}
                      // href={`/cart/${product_id}`}
                      >
                        <span
                          className="icon-trash d-flex justify-content-end"
                          onClick={(e) => {
                            e.preventDefault();
                            delProduct(v.product_id);
                          }}
                        ></span>
                      </a>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>

        <div className={styles.delAllContent + " d-flex my-5"}>
          <div className={styles.delContent + " w-50"}>
            <span>配送方式</span>
            {/* select外面包form是為了要做驗證, 送出表單 */}
            <div>
              <select
                className={styles.delWay + " mt-1"}
                onChange={(e) => {
                  setDelivery(e.target.value);
                }}
              >
                <option required>請選擇運送方式</option>
                <option value="宅配">宅配</option>
                <option value="7-11超商取貨">7-11超商取貨</option>
              </select>
            </div>
          </div>

          {/* 總額計算 */}
          <div className="w-100 d-flex justify-content-end">
            <div className="w-25">
              <div className="row">
                <div className="col-6">小計</div>
                <div className="col-6">NT$320</div>
                <div className="col-6 py-2">運費</div>
                <div className="col-6 py-2">NT$60</div>
                <div className="col-6 pt-2 border-top">總計</div>
                <div className="col-6 pt-2 border-top">NT$380</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              {delivery == "7-11超商取貨" ? " ※ 提醒您：" : ""}
            </div>
            <div className="col-12">
              {delivery == "7-11超商取貨"
                ? "當包裹送達您指定之7-11門市時，隔日將會發送簡訊到貨通知。門市純取貨之訂單，收件人務必填寫與身分證上相符的姓名，並攜帶證件至門市領取包裹"
                : ""}
              {console.log(delivery)}
            </div>
          </div>
        </div>

        <a href="/cart/del-detail" className={styles.linkText}>
          <div className="d-flex justify-content-center">
            <button className="btn btn-middle mt-5 mb-5">前往結帳</button>
          </div>
        </a>
      </div>
      <Footer />
    </>
  );
}
