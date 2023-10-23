import React from "react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useFormContext } from "react-hook-form";

export default function StepFirst() {
  const [inputType, setInputType] = useState("password");
  const [reInputType, reSetInputType] = useState("password");
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div className="d-flex flex-column my-3">
        <label
          className="fs18b"
          htmlFor="email"
          onClick={() => {
            setValue("email", "alex123@gmail.com");
          }}
        >
          電子信箱
          <span className="ps-1" style={{ color: "red" }}>
            *
          </span>
          <span className="ps-1" style={{ color: "red" }}>
            {errors.email?.message}
          </span>
        </label>
        <input
          className="input-res"
          type="text"
          {...register("email")}
          id="email"
          placeholder="請輸入正確的email格式"
        />
      </div>
      <div className="d-flex flex-column mb-3">
        <label
          className="fs18b"
          htmlFor="password"
          onClick={() => {
            setValue("password", "12345");
          }}
        >
          密碼
          <span className="ps-1" style={{ color: "red" }}>
            *
          </span>
          <span className="ps-1" style={{ color: "red" }}>
            {errors.password?.message}
          </span>
        </label>
        <div className="withIcon position-relative">
          <input
            className="input-res w-100"
            type={inputType}
            {...register("password")}
            id="password"
            placeholder="請輸入密碼"
          />
          <span
            className="eye position-absolute mt-1 me-2 end-0"
            style={{ fontSize: "20px", color: "#B4C5D2" }}
            onClick={() => {
              setInputType(inputType === "password" ? "text" : "password");
            }}
          >
            {inputType === "password" ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
      </div>
      <div className="d-flex flex-column mb-3">
        <label
          className="fs18b"
          htmlFor="rePassword"
          onClick={() => {
            setValue("rePassword", "12345a");
          }}
        >
          密碼確認
          <span className="ps-1" style={{ color: "red" }}>
            *
          </span>
          <span className="ps-1" style={{ color: "red" }}>
            {errors.rePassword?.message}
          </span>
        </label>
        <div className="withIcon position-relative">
          <input
            className="input-res w-100"
            type={reInputType}
            {...register("rePassword")}
            id="rePassword"
            placeholder="請再次輸入密碼"
          />
          <span
            className="eye position-absolute mt-1 me-2 end-0"
            style={{ fontSize: "20px", color: "#B4C5D2" }}
            onClick={() => {
              reSetInputType(reInputType === "password" ? "text" : "password");
            }}
          >
            {reInputType === "password" ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
      </div>
    </>
  );
}
