import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import CitySelector from "./city-selector";
import Btn from "@/pages/restaurant-member/dropzone";
import {
  Button,
  Checkbox,
  Col,
  ColorPicker,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Upload,
} from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

export default function PageContent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(errors);

  console.log(watch());
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
                  className="input-res w-100"
                  type="text"
                  {...register("address", { required: "請輸入資料" })}
                  id="password"
                  placeholder="請輸入資料"
                />
              </div>
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="phone">
                市內電話
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.phone?.message}
                </span>
              </label>
              <input
                className="input-res"
                type="text"
                {...register("phone", { required: "請輸入資料" })}
                id="phone"
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="opening">
                營業時間
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.opening?.message}
                </span>
              </label>
              <input
                className="input-res"
                type="text"
                {...register("opening", { required: "請輸入資料" })}
                id="opening"
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="description">
                餐廳介紹
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.description?.message}
                </span>
              </label>
              <textarea
                className="input-area"
                type="text"
                {...register("description")}
                id="description"
                style={{ height: "150px" }}
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="photo">
                {" "}
                餐廳照片
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.photo?.message}
                </span>
              </label>
              {/* <div
                  className="fs18b input-area"
                  htmlFor="photo"
                  style={{ height: "150px" }}
                >
                  <input
                    type="file"
                    className="w-100 h-100 hid"
                    multiple
                    {...register("photo", { required: "請輸入資料" })}
                    id="photo"
                  />
                  <input type="file"></input>
                </div> */}
            </div>
            <Btn />
            <button className="btn btn-big mt-4 ms-auto" type="submit">
              確認修改
            </button>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
      <style jsx>
        {`
          .hid input[type="file"] {
            opacity: 0;
          }
        `}
      </style>
      <button></button>
    </>
  );
}
