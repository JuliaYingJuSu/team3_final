import React, { useRef, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";
import Link from "next/link";
import BreadcrumbDetail from "@/components/book/breadcrumb-detail";
import AuthContext from "@/hooks/AuthContext";

export default function Detail() {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState({
    restaurant_id: "",
    restaurant_name: "",
    restaurant_city: "",
    restaurant_district: "",
    restaurant_address: "",
    restaurant_phone: "",
    restaurant_opening: "",
  });
  console.log(data);
  const router = useRouter();

  useEffect(
    () => {
      if (router.isReady) {
        const bid = router.query.bid; //***
        console.log(bid);
        fetch(
          process.env.API_SERVER + `/api/user/${auth.user_id}/my-book/${bid}`,
          { method: "GET" }
        )
          .then((r) => r.json())
          .then((r) => {
            console.log(r);
            setData(r);
          });
      }
    },
    [router.isReady],
    [auth.user_id]
  );

  const openingShort = data.rows?.restaurant_opening.split("\\n")[0];

  const originalBookDate = new Date(data.rows?.book_date);
  const offset = originalBookDate.getTimezoneOffset();
  const correctedBookDate = new Date(
    originalBookDate.getTime() - offset * 60 * 1000
  );

  const shortBookMonth = correctedBookDate.getMonth() + 1; // 1月是0
  const shortBookDate = correctedBookDate.getDate();
  const shortBookTime = data.rows?.book_time.split(":")[0] + ":00";

  const dayOfWeek = correctedBookDate.getDay();
  const daysOfWeek = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
  const shortBookDay = daysOfWeek[dayOfWeek];

  const specSplit = data.rows?.book_note.split(",").map((v, i) => {
    return <p key={i}>{v}</p>;
  });

  const gender = ["小姐", "先生", "貴賓"];
  const bookGender = gender[data.rows?.book_gender];

  return (
    <>
      <Head>
        <title>食食嗑嗑-訂位詳細頁</title>
      </Head>
      <Navbar></Navbar>
      <div className="container" style={{ marginTop: "250px" }}>
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
              <p className="h4">{data.rows?.restaurant_name}</p>
              <br />
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
                  <div>{openingShort}</div>
                </div>
              </div>
            </div>
            <div className="col-xl-7">
              <iframe
                className="iframe-map"
                width="80%"
                height="100%"
                style={{ minHeight: "300px" }}
                src={`https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${data.rows?.restaurant_city}
                ${data.rows?.restaurant_district}
                ${data.rows?.restaurant_address}&output=embed&t=`}
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
                <div className="fs18 me-5 ps-3">
                  {data.rows?.book_num_adult} 位 大人
                </div>
                <div className="fs18 ps-3">
                  {data.rows?.book_num_kid} 位 孩童
                </div>
              </div>
              <div className="h5 mt-5 mb-4">用餐時段</div>
              <div className="fs18 ps-3">{shortBookTime}</div>
            </div>
            <div>
              <div className="h5 mb-4">用餐日期</div>
              <div className="fs18 ps-3">
                {"2023-" +
                  shortBookMonth +
                  "-" +
                  shortBookDate +
                  "　" +
                  shortBookDay}
              </div>
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
            <div className="fs18 ps-3">
              {data.rows?.book_name}　{bookGender}
            </div>
            <div className="h5 mb-4 mt-5">訂位人手機號碼</div>
            <div className="fs18 ps-3">{data.rows?.book_phone}</div>
            <div className="h5 mb-4 mt-5">訂位人 email</div>
            <div className="fs18 ps-3">{data.rows?.book_email}</div>
            <div className="h5 mb-4 mt-5">其他備註</div>
            <div className="fs18 ps-3">
              {specSplit === "" ? "無" : specSplit}
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
                const bid = data.rows?.book_id;
                fetch(
                  process.env.API_SERVER +
                    `/api/user/${auth.user_id}/my-book/${bid}`,
                  {
                    method: "POST",
                  }
                )
                  .then((r) => r.json())
                  .then(data);
              } else {
                event.preventDefault();
              }
            }}
          >
            取消訂位
          </Link>
          <Link href="/user/:user_id/my-book" className="btn btn-middle ms-3">
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
