import React from "react";
import CitySelector from "./city-selector";
import { useFormContext } from "react-hook-form";

export default function StepSecond() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div className="d-flex flex-column my-3">
        <label className="fs18b" htmlFor="name">
          商家名稱
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
          {...register("name")}
          id="name"
          placeholder=""
        />
      </div>
      <div className="d-flex flex-column mb-3">
        <label className="fs18b" htmlFor="address">
          商家地址
          <span className="ps-1" style={{ color: "red" }}>
            *
          </span>
          <span className="ps-1" style={{ color: "red" }}>
            {errors.city?.message}
          </span>
          <span className="ps-1" style={{ color: "red" }}>
            {errors.district?.message}
          </span>
          <span className="ps-1" style={{ color: "red" }}>
            {errors.address?.message}
          </span>
        </label>
        <div className="d-flex justify-content-start">
          <CitySelector register={register} watch={watch} />
          {/* 當作PageContent是父組件,將此頁引入的useform方法接著傳遞給CitySelector作為props */}
          <input
            className="input-res w-100"
            type="text"
            {...register("address")}
            id="password"
            placeholder="請輸入資料"
          />
        </div>
      </div>
      <div className="d-flex flex-column mb-3">
        <label className="fs18b" htmlFor="phone">
          聯絡電話
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
          {...register("phone")}
          id="phone"
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
    </>
  );
}
