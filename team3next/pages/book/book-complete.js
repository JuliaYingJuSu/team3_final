import Head from "next/head";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";
import Link from "next/link";
import BreadcrumbBookComplete from "@/components/book/breadcrumb-bookComplete";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const {
    restaurant_id,
    restaurant_name,
    bookMonth,
    bookDate,
    bookNum,
    selectedTime,
  } = router.query;
  console.log(router.query);
  return (
    <>
      <Head>
        <title>食食嗑嗑-訂位完成</title>
      </Head>
      <Navbar></Navbar>
      <div style={{ marginTop: "225px" }}></div>
      <div className="container d-flex justify-content-center">
        <div style={{ width: "90%" }}>
          <BreadcrumbBookComplete
            key={restaurant_id}
            restaurant_name={restaurant_name}
          />
        </div>
      </div>
      <div className="container text-center mt-5">
        {/* check文字 */}
        <div className="icon-check my-4"></div>
        <div className="my-5 h5">謝謝您！您的訂位已經成立！</div>
      </div>

      {/* 底下訂單資訊 */}
      <div
        className="container w-50 d-flex border p-5 justify-content-between"
        style={{ marginBottom: "200px" }}
      >
        <div className="row justify-content-center w-50">
          <div className="col-sm-6 py-1">訂位日期</div>
          <div className="col-sm-6 py-1">
            2023/{bookMonth}/{bookDate}
          </div>
          <div className="col-sm-6 py-1">訂位時間</div>
          <div className="col-sm-6 py-1">{selectedTime}</div>
          <div className="col-sm-6 py-1">訂位人數</div>
          <div className="col-sm-6 py-1">{bookNum} 位</div>
          <div className="col-sm-6 py-1">餐廳名稱</div>
          <div className="col-sm-6 py-1">{restaurant_name}</div>
          {/* 強迫col換行 */}
          {/* <div class="w-100"></div> */}
        </div>

        <div className="row justify-content-center d-flex w-25">
          <div className="col-12 col-sm-12 py-1">
            <Link
              href="/user/:user_id/my-book"
              className="btn btn-middle w-100"
            >
              訂位紀錄
            </Link>
          </div>
          {/* <div className="col-6 col-sm-6 py-1"></div> */}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
