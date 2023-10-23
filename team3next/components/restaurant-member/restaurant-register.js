import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Wave03 from "@/components/icons/wave03";
import Wave04 from "@/components/icons/wave04";
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
      <div className="backgs z-n1" style={{height:"300px"}}>
      </div>
        <div className="container-fluid middle flex-column mb-4">
          <div className="position-absolute" style={{ top: 130 }}>
            <h1 className="fw-bold">會員註冊</h1>
          </div>
          <span className="bgi position-absolute opacity-25"></span>
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


      <style jsx>
        {`
          .backgs {
            background: #2980b9; /* fallback for old browsers */
            background: linear-gradient(
              to bottom,
              #2980b9,        
              #6dd5fa,
              #ffffff
            ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          }
          svg {
            position: absolute;
            top: 0px;
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
