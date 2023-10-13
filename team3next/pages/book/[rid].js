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
    restaurant_opening: "",
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

  const specSplit = data.rows?.restaurant_info.split("\\n").map((v) => {
    return <>{v ? <p>{v}</p> : <br></br>}</>;
  });

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
        {data.rowsImgs?.map((v, i) => {
          return (
            <SwiperSlide key={i}>
              <img
                className="w-100 swiper1Img"
                src={"/images/book/" + v.r_img_route}
                alt=""
              />
            </SwiperSlide>
          );
        })}
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
            <div>
              {data.rows?.restaurant_city}
              {data.rows?.restaurant_district}
              {data.rows?.restaurant_address}
            </div>
          </div>
          <div className="d-flex">
            <span className="pe-2">
              <span className="icon-Call"></span>
            </span>
            <div>{data.rows?.restaurant_phone}</div>
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
          <p>{data.rows && specSplit}</p>
        </div>
        <br />
        <hr className="grey" style={{ maxWidth: "1320px" }} />
        <br />
        <div className="row g-5" style={{ minHeight: "450px" }}>
          <div className="fs18 align-self-center col-12 col-xl-4">
            <p className="h5">營業時間</p>
            <br />
            <p>{data.rows?.restaurant_opening}</p>
          </div>
          <div className="col-xl-8">
            <iframe
              width="80%"
              height="100%"
              style={{ minHeight: "400px" }}
              frameborder="0"
              marginheight="0"
              marginwidth="0"
              src={`https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${data.rows?.restaurant_city}
              ${data.rows?.restaurant_district}
              ${data.rows?.restaurant_address}&output=embed&t=`}
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
          {data.rowsMenuImgs?.map((v, i) => {
            return (
              <SwiperSlide key={i}>
                <img
                  className="w-100 swiper2Img"
                  src={"/images/book/" + v.menu_img_route}
                  alt=""
                />
              </SwiperSlide>
            );
          })}
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
          .swiper1Img {
            max-height: 780px;
            object-fit: cover;
          }
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
