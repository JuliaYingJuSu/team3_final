import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function PageContent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(errors);

  return (
    <>
      <div className="row">
      <div className="col-3"></div>
        <div className="col-6">
          <h2 style={{ color: "#985637" }}>餐廳資料維護</h2>
          <form className="d-flex flex-column justify-content-center" 
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <div className="d-flex flex-column my-3">
              <label className="fs18b" htmlFor="name">
                店家名稱
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.name?.message}
                </span>
              </label>
              <input
                className="input-res"
                type="text"
                {...register("name", { required: "請輸入資料" })}
                id="name"
                placeholder=""
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="password">
                店家地址
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.password?.message}
                </span>
              </label>
              <input
                className="input-res"
                type="password"
                {...register("password", { required: "*" })}
                id="password"
              />
              <input
                className="input-res"
                type="password"
                {...register("password", { required: "*" })}
                id="password"
              />
              <input
                className="input-res"
                type="password"
                {...register("password", { required: "*" })}
                id="password"
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="rePassword">
                密碼確認
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.rePassword?.message}
                </span>
              </label>
              <input
                className="input-res"
                type="password"
                {...register("rePassword", { required: "* 請再輸入一次密碼" })}
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
