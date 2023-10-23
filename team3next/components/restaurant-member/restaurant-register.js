import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Wave01 from "@/components/icons/wave01";
import Wave02 from "@/components/icons/wave02";
import FormLayout from "./form-component/restaurant-form";
import StepFirst from "./form-component/step-first";
import StepSecond from "./form-component/step-second";
import StepThird from "./form-component/step-third";
// 在這個頁面引入表單模板和表單欄位，將分步驟表單欄位作為物件控制多步驟呈現。參考dave multistep register
export default function RestaurantRegister() {
  const display = { 0: <StepFirst />, 1: <StepSecond />, 2: <StepThird /> };
  const inputField = [
    ["email", "password", "rePassword"],
    ["name", "city", "district", "address", "phone", "description"],
    ["photo"],
  ];

  const [page, setPage] = useState(0);
  const prevPage = () => {
    setPage(page - 1);
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  const currentField = inputField[page];
  // derived state依靠先有得state計算而出的方法

  return (
    <>
      <Head>
        <title>食食嗑嗑-餐廳業者註冊</title>
      </Head>
      <div className="backgs">
        <span className="z-1">
          <Wave01></Wave01>
        </span>
        <span
          className="z-2 position-absolute start-50 translate-middle"
          style={{ top: 65 }}
        >
          <Wave02></Wave02>
        </span>
        <div className="container-fluid middle flex-column mb-4">
          <div className="position-absolute" style={{ top: 130 }}>
            <h1 className="fw-bold">會員註冊</h1>
          </div>
          <span className="bgi z-n1 position-absolute opacity-25"></span>
          <div
            className="fw-semibold fs-6 d-flex justify-content-end align-self-stretch"
            style={{ paddingRight: 350 }}
          >
            有{" "}
            <span className="px-1" style={{ color: "red" }}>
              *
            </span>{" "}
            的欄位為必填
          </div>
          <FormLayout
            prevPage={prevPage}
            nextPage={nextPage}
            page={page}
            setPage={setPage}
            currentField={currentField}
            // 在這個頁面和模板頁面傳遞page，setpage，切頁function，目前欄位，讓模板頁面可以控制
            // 可能可以直接寫入form之中，不用傳遞，看起來dave也是寫在form之中的，以後再改吧
          >
            {display[page]}
          </FormLayout>
        </div>
      </div>
      <style jsx>
        {`
          .backgs {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }
          svg {
            position: absolute;
            top: 0px;
          }
          .wave01 {
            width: 800px;
            height: 300px;
            position: absolute;
            top: 0px;
            fill: linear-gradient(
              180deg,
              #efd6c5 76.48%,
              rgba(217, 217, 217, 0) 90.06%
            );
          }
          .wave02 {
            width: 800px;
            height: 200px;
            position: absolute;
            top: 0px;
            fill: linear-gradient(
              266deg,
              rgba(182, 112, 101, 0.93) 1.39%,
              #f9e7a6 1.39%,
              rgba(249, 231, 166, 0.3) 42.15%
            );
            box-shadow: 0px -13px 29px 0px rgba(249, 231, 166, 0.29) inset,
              0px -53px 53px 0px rgba(249, 231, 166, 0.26) inset,
              0px -120px 72px 0px rgba(249, 231, 166, 0.15) inset,
              0px -213px 85px 0px rgba(249, 231, 166, 0.04) inset,
              0px -333px 93px 0px rgba(249, 231, 166, 0.01) inset;
          }
          .bgi {
            width: 390px;
            height: 440px;
            right: 400px;
            top: 146px;
            background: no-repeat;
            background-image: url("/images/onlybro.png");
          }
        `}
      </style>
    </>
  );
}
