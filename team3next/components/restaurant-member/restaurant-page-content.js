import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CitySelector from "./city-selector";

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
          <form
            className="d-flex flex-column justify-content-center"
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
            <div className="d-flex flex-column  mb-3">
              <label className="fs18b" htmlFor="address">
                店家地址
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.address?.message}
                </span>
              </label>
              <div className="d-flex justify-content-start">
                <CitySelector />
                <input
                  className="input-res flex-grow-1"
                  type="text"
                  {...register("address", { required: "請輸入資料" })}
                  id="password"
                  placeholder="輸入完整的地址資料"
                />
              </div>
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="phone">
                市內電話
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.rePassword?.message}
                </span>
              </label>
              <input
                className="input-res"
                type="password"
                {...register("phone", { required: "* 請再輸入一次密碼" })}
                id="phone"
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
