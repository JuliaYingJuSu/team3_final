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

  const specSplit1 = data.rows?.restaurant_info.split("\\n").map((v) => {
    return <>{v ? <p>{v}</p> : <br></br>}</>;
  });
  const specSplit2 = data.rows?.restaurant_opening.split("\\n").map((v) => {
    return <>{v ? <p>{v}</p> : <br></br>}</>;
  });

  // 日曆
  const now = {
    y: new Date().getFullYear(),
    m: new Date().getMonth() + 1,
    d: new Date().getDate(),
  };
  const [bookMonth, setBookMonth] = useState(`${now.m}`);
  const [bookDate, setBookDate] = useState(`${now.d + 1}`);

  const handleBookMonth = (newMonth) => {
    setBookMonth(newMonth);
  };
  const handleBookDate = (newDate) => {
    setBookDate(newDate);
  };
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
        <p className="h3 my-4">{data.rows?.restaurant_name}</p>
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
          <p>{data.rows && specSplit1}</p>
        </div>
        <hr className="grey" style={{ maxWidth: "1320px" }} />
        <br />
        <div className="row g-5" style={{ minHeight: "450px" }}>
          <div className="fs18 align-self-center col-12 col-xl-4">
            <p className="h5">營業時間</p>
            <br />
            <p>{data.rows && specSplit2}</p>
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
          {/* 用餐人數 */}
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
                {Array(6)
                  .fill(1)
                  .map((v, i) => {
                    return (
                      <option value={i + 1} selected={i + 1 === 2}>
                        {i + 1} 位 大人
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className={styles.sortnum + " me-3"}>
              <br />
              <br />
              <select className={styles.selectbox + " fs18"}>
                {Array(5)
                  .fill(1)
                  .map((v, i) => {
                    return <option value={i}>{i} 位 小孩</option>;
                  })}
              </select>
            </div>
          </div>
          <br />
          <br />
          {/* 用餐日期 */}
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
                <option value={`${bookMonth}-${bookDate}`} selected>
                  {bookMonth} 月 {bookDate} 日
                </option>
              </select>
            </div>
          </div>
        </div>
        <br />
        <BookCalendar
          now={now}
          onBookMonth={handleBookMonth}
          onBookDate={handleBookDate}
        />
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
                  type="radio"
                  className="btn-check"
                  id="btn-check-1"
                  name="selectTime"
                  value="11:00"
                />
                <label
                  className={
                    styles.btnLg +
                    " btn btn-lg btn-outline-warning rounded-4 fw-bold"
                  }
                  htmlFor="btn-check-1"
                >
                  11:00
                </label>
              </div>
              <div className="col">
                <input
                  type="radio"
                  className="btn-check"
                  id="btn-check-2"
                  name="selectTime"
                  value="12:00"
                />
                <label
                  className={
                    styles.btnLg +
                    " btn btn-lg btn-outline-warning rounded-4 fw-bold"
                  }
                  htmlFor="btn-check-2"
                >
                  12:00
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
        `}
      </style>
    </>
  );
}