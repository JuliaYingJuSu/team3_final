import { useState, useEffect } from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";
import { useRouter } from "next/router";
import Link from "next/link";

export default function createOrder() {
  const [data, setData] = useState([]);
  // const [orderNum, setOrderNum] = useState([]);
  //看linePay回傳的訊息 --->  console.log(data);
  const handleClick = (data) => {
    if (data.returnCode === "0000") {
      redirectdata?.body?.info.paymentUrl.web;
    } else {
      console.log("出錯");
    }
  };
  const router = useRouter();
  // console.log(data);
  // const order_id = data.order_id;
  // const order_id = "4354";
  useEffect(() => {
    if (router.isReady) {
      const oid = router.query.createOrder;
      // 因一開始使用, const oid = router.query.order_id; oid顯示undefined !
      //router.asPath --> 可看現在router抓到的網址
      // console.log(typeof oid);
      // const oid = JSON.stringify(ooo);
      fetch(`http://localhost:3002/api/cart/createOrder/${oid}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((obj) => {
          setData(obj);
          console.log(obj);
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
    // router好了, 就再重新run 一次
  }, [router.isReady]);

  // useEffect(() => {
  //   fetch("http://localhost:3002/api/cart/my-order")
  //     .then((r) => r.json())
  //     .then((obj) => {
  //       setData(obj);
  //       console.log(obj);
  //     });
  //   // [data], 指當data有個更新時, 重做useEffect
  // }, []);

  return (
    <>
      <MyNavbar />

      <div>訂單總額</div>
      <div>orderId</div>
      <div>PackagesId</div>
      <div>productName</div>
      <div>productQuantity</div>
      <div>productPrice</div>
      {/* /cart/createOrder/ */}

      <Link href={data}>
        <button>送出表單</button>
      </Link>

      <Footer />
    </>
  );
}
