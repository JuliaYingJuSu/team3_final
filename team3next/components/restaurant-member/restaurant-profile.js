import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import profileSchema from "@/validation/profile-validation";

export default function Profile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });
  console.log(errors);

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
              <input
                className="input-res"
                type="password"
                {...register("password")}
                id="password"
              />
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
              <input
                className="input-res"
                type="password"
                {...register("rePassword")}
                id="rePassword"
              />
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
