import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";
import styles from "./restaurant.module.css";
import Link from "next/link";
import BreadcrumbRestaurant from "@/components/book/breadcrumb-restaurant";
import BookCalendar from "@/components/book/book-calendar";
import { Navigation, Scrollbar, A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

export default function RestaurantDetail() {
  const [data, setData] = useState({
    restaurant_id: "",
    restaurant_name: "",
    restaurant_city: "",
    restaurant_district: "",
    restaurant_address: "",
    restaurant_phone: "",
    restaurant_info: "",
    r_img_id: "",
    r_img_route: [],
  });
  console.log(data);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const rid = router.query.rid; //***
      const uid = "10" || "";
      // const uid = localStorage.getItem()

      console.log(rid);

      fetch(`http://localhost:3002/api/book/${rid}/${uid}`)
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          setData(r);
        });
    }
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>食食嗑嗑-餐廳主頁</title>
      </Head>
      <Navbar></Navbar>
      {/* ========輪播牆swiper========= */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#FBF9EF",
          "--swiper-navigation-size": "70px",
          "--swiper-navigation-sides-offset": "35px",
          "--swiper-scrollbar-size": "6px",
          "--swiper-scrollbar-sides-offset": "40%",
          "--swiper-scrollbar-bottom": "50px",
          "--swiper-scrollbar-drag-bg-color": "rgba(255, 255, 255, 0.9)",
          "--swiper-scrollbar-bg-color": "rgba(255, 255, 255, 0.3)",
        }}
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        scrollbar={{
          draggable: true,
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <img className="w-100" src="../../images/book/r1-1.png" alt="..." />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-100" src="../../images/book/r1-2.png" alt="..." />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-100" src="../../images/book/r1-3.png" alt="..." />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-100" src="../../images/book/r1-4.png" alt="..." />
        </SwiperSlide>
      </Swiper>
      <br />
      {/* ==========麵包屑========= */}
      <div className="container">
        <BreadcrumbRestaurant></BreadcrumbRestaurant>
      </div>
      <div className="container" style={{ maxWidth: "1320px" }}>
        <p className="h3 my-3">{data.rows?.restaurant_name}</p>
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
        <br />
        <hr className="grey" style={{ maxWidth: "1320px" }} />
        <br />
        <div className="fs18">
          <p>
            『堅持原型食材，簡單調味』『我們只提供我們自己也吃的食物』堅持使用台灣島嶼的當季農產與、新鮮現流海鮮漁獲，和進口的調味品，所融合出的義式料理餐廳，帶給每一位貴賓視覺與味覺上的饗宴。
            <br />
            <br />
            <br />
            ***
            為了提供貴客完美用餐體驗與品質、尊重員工及其他用餐客人，以下說明請您詳閱，謝謝您的體諒與配合
            ****
            <br />
            <br />
            １．訂位保留 10 分鐘，如逾時將視場狀況重新安排座位。每一輪用餐限時 2
            小時
            <br />
            ２．低消為每人累積點滿 $150、加收 10% 服務費
            <br />
            ３．本系統接受 60
            天內訂位。若需取消或更改訂位，請提前線上操作或來電告知
            <br />
            ４．提供兒童專用安全餐具及座位，您可於線上訂位時留言告知需求
            <br />
            ５．提供部分蛋奶素餐點，請參考菜單上綠色標示
            <br />
            ６．本餐廳未販售酒精類飲品，若您欲攜帶酒類進場不加收開瓶費
            <br />
            ７．超過８人用餐之訂位，請直接致電我們將為您特別安排
          </p>
        </div>
        <br />
        <hr className="grey" style={{ maxWidth: "1320px" }} />
        <br />
        <div className="row g-5" style={{ minHeight: "450px" }}>
          <div className="fs18 align-self-center col-12 col-xl-4">
            <p className="h5">營業時間</p>
            <br />
            <p>
              週二至週五
              <br />
              <br />
              11:00-21:00 (最後點餐20:00)
              <br />
              <br />
              <br />
              週六至週日
              <br />
              <br />
              11:00-21:00 (最後點餐20:00)
            </p>
          </div>
          <div className="col-xl-8">
            <iframe
              width="80%"
              height="100%"
              style={{ minHeight: "400px" }}
              frameborder="0"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=台北市松山區慶城街16巷16號&output=embed&t="
            ></iframe>
            {/* <img className="r-map" src="../../images/book/map.png" alt="" />/ */}
          </div>
        </div>
        <br />
        <hr className="grey" style={{ maxWidth: "1320px" }} />
        <br />
        <br />
        <p className="h5">美味饗宴</p>
        <br />
        <br />
        <Swiper
          style={{
            "--swiper-pagination-color": "#FBF9EF",
            "--swiper-pagination-progressbar-size": "10px",
            "--swiper-pagination-bullet-size": "20px",
            "--swiper-pagination-bottom": "16px",
          }}
          slidesPerView={"auto"}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/images/book/r1-menu1.png" alt="" className="menu-img" />
          </SwiperSlide>
        </Swiper>
        <br />
        <br />
        <br />
        <hr className="grey" style={{ maxWidth: "1320px" }} />
        <br />
        <div className="row justify-content-between">
          {/* 人數 */}
          <div className="col-auto row mb-2 mt-5">
            <label
              htmlFor="readdress"
              className="form-label col-12 col-form-label h5"
            >
              用餐人數
            </label>
            <div className={styles.sortnum + " me-4"}>
              <br />
              <br />
              <select className={styles.selectbox + " fs18"}>
                <option value="2">2 位 大人</option>
                <option value="3">3 位 大人</option>
                <option value="4">4 位 大人</option>
              </select>
            </div>
            <div className={styles.sortnum + " me-3"}>
              <br />
              <br />
              <select className={styles.selectbox + " fs18"}>
                <option value="0">0 位 孩童</option>
                <option value="1">1 位 孩童</option>
                <option value="2">2 位 孩童</option>
              </select>
            </div>
          </div>
          <br />
          <br />
          {/* 日期 */}
          <div
            style={{ width: "400px" }}
            className="col row mb-2 align-self-start mt-5"
          >
            <label
              htmlFor="readdress"
              className="form-label col-12 col-form-label h5"
            >
              用餐日期
            </label>
            <div className={styles.sortnum + " me-4 w-100"}>
              <br />
              <br />
              <select className={styles.selectbox + " fs18 w-100"}>
                <option value="2">10 月 25 日 週三</option>
              </select>
            </div>
          </div>
        </div>
        <br />
        <BookCalendar></BookCalendar>
        <br />
        <br />
        <br />
        <br />
        <br />
        <p className="h5">用餐時段</p>
        <br />
        <br />
        <div className="mb-4">
          <input name="id" type="hidden" />
          <div className="mt-2">
            <div className="row row-cols-sm-3 row-cols-md-6 g-1 gy-4">
              <div className="col">
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-1"
                  name="selectTime[]"
                  value="1"
                />
                <label
                  className={
                    styles.btnLg +
                    " btn btn-lg btn-outline-warning rounded rounded-4 fw-bold"
                  }
                  htmlFor="btn-check-1"
                >
                  11:00
                </label>
              </div>
              <div className="col">
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-2"
                  name="selectTime[]"
                  value="2"
                />
                <label
                  className={
                    styles.btnLg +
                    " btn btn-lg btn-outline-warning rounded rounded-4 fw-bold"
                  }
                  htmlFor="btn-check-2"
                >
                  12:00
                </label>
              </div>
              <div className="col">
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-3"
                  name="selectTime[]"
                  value="3"
                />
                <label
                  className={
                    styles.btnLg +
                    " btn btn-lg btn-outline-warning rounded rounded-4 fw-bold"
                  }
                  htmlFor="btn-check-3"
                >
                  13:00
                </label>
              </div>
              <div className="col">
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-4"
                  name="selectTime[]"
                  value="4"
                />
                <label
                  className={
                    styles.btnLg +
                    " btn btn-lg btn-outline-warning rounded rounded-4 fw-bold"
                  }
                  htmlFor="btn-check-4"
                >
                  14:00
                </label>
              </div>
              <div className="col">
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-5"
                  name="selectTime[]"
                  value="5"
                />
                <label
                  className={
                    styles.btnLg +
                    " btn btn-lg btn-outline-warning rounded rounded-4 fw-bold"
                  }
                  htmlFor="btn-check-5"
                >
                  15:00
                </label>
              </div>
              <div className="col">
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-6"
                  name="selectTime[]"
                  value="6"
                />
                <label
                  className={
                    styles.btnLg +
                    " btn btn-lg btn-outline-warning rounded rounded-4 fw-bold"
                  }
                  htmlFor="btn-check-6"
                >
                  16:00
                </label>
              </div>
              <div className="col">
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-7"
                  name="selectTime[]"
                  value="7"
                />
                <label
                  className={
                    styles.btnLg +
                    " btn btn-lg btn-outline-warning rounded rounded-4 fw-bold"
                  }
                  htmlFor="btn-check-7"
                >
                  17:00
                </label>
              </div>
              <div className="col">
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-8"
                  name="selectTime[]"
                  value="8"
                />
                <label
                  className={
                    styles.btnLg +
                    " btn btn-lg btn-outline-warning rounded rounded-4 fw-bold"
                  }
                  htmlFor="btn-check-8"
                >
                  18:00
                </label>
              </div>
              <div className="col">
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-9"
                  name="selectTime[]"
                  value="9"
                />
                <label
                  className={
                    styles.btnLg +
                    " btn btn-lg btn-outline-warning rounded rounded-4 fw-bold"
                  }
                  htmlFor="btn-check-9"
                >
                  19:00
                </label>
              </div>
              <div className="col">
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-10"
                  name="selectTime[]"
                  value="10"
                />
                <label
                  className={
                    styles.btnLg +
                    " btn btn-lg btn-outline-warning rounded rounded-4 fw-bold"
                  }
                  htmlFor="btn-check-10"
                >
                  20:00
                </label>
              </div>
              <div className="col">
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-11"
                  name="selectTime[]"
                  value="11"
                />
                <label
                  className={
                    styles.btnLg +
                    " btn btn-lg btn-outline-warning rounded rounded-4 fw-bold"
                  }
                  htmlFor="btn-check-11"
                >
                  21:00
                </label>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="container d-flex justify-content-center my-5">
          <Link href="/book/customer-info" className="btn btn-middle">
            立即訂位
          </Link>
        </div>
        <br />
      </div>
      <Footer></Footer>
      <style jsx>
        {`
          .r-map {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .menu-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .calendar-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}
      </style>
    </>
  );
}
