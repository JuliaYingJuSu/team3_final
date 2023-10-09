import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import profileSchema from "@/validation/profile-validation";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Wave01 from "@/components/icons/wave01";
import Wave02 from "@/components/icons/wave02";
import Form from "./form-component/restaurant-form";
import StepFirst from "./form-component/step-first";
import StepSecond from "./form-component/step-second";
import StepThird from "./form-component/step-third";
import <S></S>tepThird from "./form-component/step-third";

export default function MemberRegister() {
  return (
    <>
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
        <div className="container middle flex-column mb-4">
          <div className="z-3 position-absolute" style={{ top: 130 }}>
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
          <Form>
            <StepFirst/>
            <StepSecond/>
            <StepThird/>
          </Form>
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
          .no-see-eye {
            position: relative;
          }
          .no-see-eye:before {
            position: absolute;
            left: 465px;
            bottom: 32px;
          }
        `}
      </style>
    </>
  );
}
