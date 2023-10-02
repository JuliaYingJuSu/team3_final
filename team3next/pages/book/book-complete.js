import Head from "next/head";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";

export default function Index() {
  return (
    <>
      <Head>
        <title>食食嗑嗑-訂位完成</title>
      </Head>
      <Navbar></Navbar>
      <div className="container text-center">
        {/* check文字 */}
        <div className="icon-check my-4"></div>
        <div className="my-5 h5">謝謝您！您的訂位已經成立！</div>
      </div>

      {/* 底下訂單資訊 */}
      <div className="container w-50 d-flex border p-5 mb-5 justify-content-between">
        <div className="row justify-content-center w-50">
          <div className="col-sm-6 py-1">訂位日期</div>
          <div className="col-sm-6 py-1">2023/09/30</div>
          <div className="col-sm-6 py-1">訂單時間</div>
          <div className="col-sm-6 py-1">18:00</div>
          <div className="col-sm-6 py-1">訂位人數</div>
          <div className="col-sm-6 py-1">4 位</div>
          <div className="col-sm-6 py-1">餐廳名稱</div>
          <div className="col-sm-6 py-1">Cin Cin Osteria 請請義大利餐廳</div>
          {/* 強迫col換行 */}
          {/* <div class="w-100"></div> */}
        </div>

        <div className="row justify-content-center d-flex w-25">
          <div className="col-12 col-sm-12 py-1">
            <button className="btn btn-middle w-100">訂位詳情</button>
          </div>
          {/* <div className="col-6 col-sm-6 py-1"></div> */}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
