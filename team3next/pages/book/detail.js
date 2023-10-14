import Head from "next/head";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";
import styles from "./restaurant.module.css";
import Link from "next/link";
import BreadcrumbDetail from "@/components/book/breadcrumb-detail";

export default function Index() {
  return (
    <>
      <Head>
        <title>食食嗑嗑-訂位詳細頁</title>
      </Head>
      <Navbar></Navbar>
      <div className="container">
        <BreadcrumbDetail></BreadcrumbDetail>
      </div>
      <br />
      <br />
      <div className="container mt-3">
        <div className="d-flex justify-content-center">
          <div
            className="row ps-5 g-5 justify-content-around"
            style={{ width: "70%" }}
          >
            <div className="fs18 align-self-center col-12 col-xl-5">
              <p className="h4">
                Cin Cin Osteria
                <br />
                請請義大利餐廳
              </p>
              <br />
              <div className="fs18">
                <div className="d-flex">
                  <span className="pe-2">
                    <span className="icon-map"></span>
                  </span>
                  <div>台北市松山區慶城街16巷16號1F</div>
                </div>
                <div className="d-flex">
                  <span className="pe-2">
                    <span className="icon-Call"></span>
                  </span>
                  <div>02-2712-2050</div>
                </div>
                <div className="d-flex">
                  <span className="pe-2">
                    <span className="icon-calender"></span>
                  </span>
                  <div>每週一休息</div>
                </div>
              </div>
            </div>
            <div className="col-xl-7">
              <iframe
                className="iframe-map"
                width="80%"
                height="100%"
                style={{ minHeight: "300px" }}
                frameborder="0"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=台北市松山區慶城街16巷16號&z=16&output=embed&t="
              ></iframe>
            </div>
          </div>
        </div>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className="d-flex justify-content-center">
          <div
            className="d-flex justify-content-around"
            style={{ width: "80%" }}
          >
            <div>
              <div className="h5 mb-4">用餐人數</div>
              <div className="d-flex">
                <div className="fs18 me-5 ps-3">3 位 大人</div>
                <div className="fs18 ps-3">1 位 孩童</div>
              </div>
              <div className="h5 mt-5 mb-4">用餐時段</div>
              <div className="fs18 ps-3">17:00</div>
            </div>
            <div>
              <div className="h5 mb-4">用餐日期</div>
              <div className="fs18 ps-3">11月7日 週二</div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className="d-flex justify-content-center">
          <div className="container3">
            <div className="h5 mb-4">訂位人姓名</div>
            <div className="fs18 ps-3">洪琪方 小姐</div>
            <div className="h5 mb-4 mt-5">訂位人手機號碼</div>
            <div className="fs18 ps-3">0963850549</div>
            <div className="h5 mb-4 mt-5">訂位人 email</div>
            <div className="fs18 ps-3">apple667733@gmail.com</div>
            <div className="h5 mb-4 mt-5">其他備註</div>
            <div className="fs18 ps-3">
              請準備兒童餐具,
              <br />
              另外其中有一位對海鮮過敏, 再麻煩協助點菜。
            </div>
          </div>
        </div>
        <br />
        <div className="container d-flex justify-content-center my-5">
          <Link
            href="/user/my-book"
            className="btn btn-middle me-3"
            onClick={(event) => {
              const result = window.confirm("確認要取消這筆訂位嗎?");
              if (result) {
              } else {
                event.preventDefault();
              }
            }}
          >
            取消訂位
          </Link>
          <Link href="/user/my-book" className="btn btn-middle ms-3">
            回上一頁
          </Link>
        </div>
      </div>
      <Footer></Footer>
      <style jsx>
        {`
          .iframe-map {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .container3 {
            border: 1px solid #d9d9d9;
            border-radius: 40px;
            width: 700px;
            padding: 100px;
          }
        `}
      </style>
    </>
  );
}
