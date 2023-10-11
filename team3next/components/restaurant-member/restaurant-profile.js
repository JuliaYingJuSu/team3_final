import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import profileSchema from "@/validation/profile-validation";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Profile() {
  const [inputType, setInputType] = useState("password");
  const [reInputType, reSetInputType] = useState("password");
  // eyeopened
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });
  console.log(errors);
  // rhf
  const onSubmit = async (data) => {
    console.log(data);
    try {
      // const isValid = await profileSchema.isValid(data)
      // console.log(isValid)
      const response = await axios.post("http://localhost:3002/try-post", data);
      console.log("Server Response:", response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  // upload

  return (
    <>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <h2 style={{ color: "#985637" }}>餐廳資料維護</h2>
          <form
            className="d-flex flex-column justify-content-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="d-flex flex-column my-3">
              <label className="fs18b" htmlFor="email">
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
                placeholder="test@gmail.com"
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="password">
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
                />
                <span
                  className="eye position-absolute mt-1 me-2 end-0"
                  style={{ fontSize: "20px", color: "#B4C5D2" }}
                  onClick={() => {
                    setInputType(
                      inputType === "password" ? "text" : "password"
                    );
                  }}
                >
                  {inputType === "password" ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="rePassword">
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
                />
                <span
                  className="eye position-absolute mt-1 me-2 end-0"
                  style={{ fontSize: "20px", color: "#B4C5D2" }}
                  onClick={() => {
                    reSetInputType(
                      reInputType === "password" ? "text" : "password"
                    );
                  }}
                >
                  {reInputType === "password" ? (
                    <FaRegEye />
                  ) : (
                    <FaRegEyeSlash />
                  )}
                </span>
              </div>
            </div>

            <button className="btn btn-big mt-4 ms-auto" type="submit">
              確認修改
            </button>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  );
}
