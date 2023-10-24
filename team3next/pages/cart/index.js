import { useState, useEffect } from "react";
import styles from "./cart-detail.module.css";
import MyNavbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";
import { useRouter } from "next/router";
import {Helmet} from "react-helmet";
import { useShip711StoreOpener } from "@/hooks/use-ship-711-store";

export default function CartDetail() {
  const [data, setData] = useState([]);
  // 運費
  // const [shippingFee, setShippingFee] = useState(60);
 
  useEffect(() => {
    // localStorage 取資料
    const getCartItem = JSON.parse(localStorage.getItem("cart"));
    if (getCartItem) {
      //setData, 非同步的關係
      setData(getCartItem);
    }
  }, []);

  // 購物車小計
  const calculateTotal = () => {
    // 計算所有商品的小計
    const subtotal = data.reduce((acc, v) => acc + v.price * v.quantity, 0);

    const shippingFee = subtotal >= 600 ? 0 : 60;
    // 總計
    const total = subtotal + shippingFee;

    return { subtotal, shippingFee, total };
  };

  // 數量增加寫入local Storage

  const updateCount = (product_id, value) => {
    // 更新 data 中的數量
    const updatedData = data.map((v) => {
      //  if (v.product_id === product_id) { return { ...v, quantity: v.quantity + value },
      // 先比對product_id是否相同, 在return新的數量回去
      if (v.product_id === product_id) {
        return { ...v, quantity: v.quantity + value };
      } else {
        return { ...v };
      }
    });

    // 更新 local storage
    localStorage.setItem("cart", JSON.stringify(updatedData));

    setData(updatedData);
  };

  // minus 寫入loccalStorage

  const minusCount = (product_id, value) => {
    // 更新 data 中的數量
    const updatedMinus = data.map((v) => {
      //  if (v.product_id === product_id) { return { ...v, quantity: v.quantity + value },
      // 先比對product_id是否相同, 在return新的數量回去
      if (v.product_id === product_id) {
        return { ...v, quantity: v.quantity - value };
      } else {
        return { ...v };
      }
    });
    // 更新 local storage
    localStorage.setItem("cart", JSON.stringify(updatedMinus));
    setData(updatedMinus);
  };

  // ------------------------ localStorage 垃圾桶 -------------------------
  //findIndex, 返回返回符合條件的元素的index
  const delProduct = (v) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      // const delProductId = cart.findIndex((i) => i.product_id == v.product_id);
      const trashcan = cart.filter((i) => i.product_id !== v.product_id);
      localStorage.setItem("cart", JSON.stringify(trashcan));
      setData(trashcan);
    }
  };

  // if (getCartItem.quantity <= 0) {
  //   localStorage.removeItem("product_id");
  //   localStorage.setItem("cart", JSON.stringify(getCartItem));
  // }

  // 運送方式
  const deliveryMethod = ["請選擇運送方式", "宅配", "7-11超商取貨"];
  const [delivery, setDelivery] = useState(["請選擇運送方式"]);

  // 訂單寫入資料庫
  const insertDatabase = () => {
    const getUserid = JSON.parse(localStorage.getItem("auth"));
    const getUser = getUserid.user_id;
    // const orderTotal = total;
    const orderTotal = calculateTotal().total;
    const a = `${store711.storename}`
    console.log(a)
    const b = `${store711.storeaddress}`
    console.log('妍寶')
    console.log(b)
    if (getUser) {
      fetch("http://localhost:3002/api/cart", {
        method: "post",
        body: JSON.stringify({
          data: data,
          user_id: getUser,
          order_amount: orderTotal,
          delivery_method: delivery,
          // 1020新增
          delivery_address: `${a} ${b}`,
        
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((obj) => {
          console.log(obj);
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
  };

  // 7-11
  const { store711, openWindow, closeWindow } = useShip711StoreOpener(
    "http://localhost:3002/api/cart/711",
    { autoCloseMins: 3,
      title: '7-11運送店家選擇視窗', //跳出視窗標題
      h : 680, //跳出視窗高度
      w : 950, //跳出視窗寬度
      autoCloseMins : 5, //自動關閉
      enableLocalStorage : true, //是否didMount時要讀取localStorage中資料
      keyLocalStorage : 'store711', // localStorage中的key
  
    } // x分鐘沒完成選擇會自動關閉，預設5分鐘。
  );

  return (
    <>

      <Helmet>
        <title>食食嗑嗑-購物車</title>
      </Helmet>
      <MyNavbar />
      <div className={styles.designTop}>
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
              console.log(v);
              return (
                <>
                  <tr
                    className={styles.productDetail + " container"}
                    key={v.product_id}
                  >
                    <td className={styles.imgWidth + " w-20r"}>
                      <img
                        className=" rounded-1 w-100 h-100 "
                        src={`images/product/${v.product_img}`}
                        alt=""
                      />
                      {/* <p>123</p> */}
                    </td>
                    <td className={styles.cutBorder + " align-middle"}>
                      {v.product_name}
                      {/* <span>{v.product_id}</span> */}
                    </td>
                    <td className={styles.cutBorder + " align-middle"}>
                      <button
                        className={styles.minus + " btn icon-minus me-3"}
                        onClick={() => {
                          minusCount(v.product_id, 1);
                        }}
                      ></button>
                      <span className={styles.hey}>
                      {v.quantity}
                      </span>
                      <button
                        className={styles.minus + " btn icon-plus ms-3"}
                        onClick={() => {
                          updateCount(v.product_id, 1);
                        }}
                      >
                        {/* <span className="icon-plus ms-3"></span> */}
                      </button>
                    </td>
                    <td className={styles.cutBorder + " align-middle"}>
                      {`NT$` + v.price}
                    </td>
                    <td className={styles.cutBorder + " align-middle"}>
                      {`NT$` + v.price * v.quantity}
                    </td>
                  </tr>

                  <tr className="container">
                    <td>移至願望清單</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <a
                        className={styles.trash}
                        //   href={"/cart/" + v.product_id}
                        // href={`/cart/${product_id}`}
                      >
                        <span
                          className="icon-trash d-flex justify-content-end"
                          onClick={(e) => {
                            // e.preventDefault();
                            delProduct(v);
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

              <div className={styles.chooseStore}>
                {delivery == "7-11超商取貨" ? (
                  <>
                  <button
                    className="btn btn-sm me-3"
                    onClick={() => {
                      openWindow();
                    }}
                  >
                    選擇超商
                  </button>
                 <br />
         <input type="text" value={store711.storename}  className="input-group border-0 mt-1" style={{ backgroundColor: '#FBF9EF, width: 50%' }} disabled/>
       
        <input type="text" value={store711.storeaddress} className="input-group border-0" style={{ backgroundColor: '#FBF9EF , width: 50%' }} disabled />
                 </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {/* 總額計算 */}
          <div className="w-100 d-flex justify-content-end">
            <div className="w-25">
              <div className="row">
                <div className="col-6">小計</div>
                <div className="col-6">{`NT$` + calculateTotal().subtotal}</div>
                <div className="col-6 py-2">運費</div>
                <div className="col-6 py-2">{`NT$` + calculateTotal().shippingFee}</div>
                {/* <div className="col-12 py-2">已達NT.600免運門檻</div> */}
                <div className="col-6 pt-2 border-top">總計</div>
                <div className="col-6 pt-2 border-top">
                  {`NT$` + calculateTotal().total}
                </div>
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
            </div>
          </div>
        </div>
        <a href="/cart/del-detail " className={styles.linkText}>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-middle mt-5 mb-5"
              onClick={() => {
                insertDatabase();
              }}
            >
              前往結帳
            </button>
          </div>
         </a>
        </div>
      </div>
      <Footer />
     
    </>
  );
}
