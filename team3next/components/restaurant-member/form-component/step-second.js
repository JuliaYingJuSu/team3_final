import React from "react";
import CitySelector from "./city-selector";
import { useFormContext } from "react-hook-form";

export default function StepSecond() {
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
          htmlFor="name"
          onClick={() => {
            setValue("name", "貓町珈琲");
          }}
        >
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
          placeholder="請輸入商家名稱"
        />
      </div>
      <div className="d-flex flex-column mb-3">
        <label
          className="fs18b"
          htmlFor="address"
          onClick={() => {
            setValue("address", "義二路2巷4號");
          }}
        >
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
        <label
          className="fs18b"
          htmlFor="phone"
          onClick={() => {
            setValue("phone", "02-27654832");
          }}
        >
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
          placeholder="請輸入聯絡電話"
        />
      </div>
      <div className="d-flex flex-column mb-3">
        <label
          className="fs18b"
          htmlFor="description"
          onClick={() => {
            setValue(
              "description",
              "不同的咖啡豆有不同的作法和味道，一般人在喝咖啡的時候，多半只會說「好香」、「好苦」、「好澀」等簡單的形容詞。實際上咖啡味道形容是有多變化的，以下就來教你如何更專業的描述咖啡的味道。"
            );
          }}
        >
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
          placeholder="請填寫介紹，讓其他用戶更好認識您的餐廳"
        />
      </div>
    </>
  );
}
