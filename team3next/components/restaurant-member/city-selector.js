import React from "react";
import CityArray from "@/data/city.json";
import { useState } from "react";
import { useForm } from "react-hook-form";

function CitySelector() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(CityArray);
  return (
    <>
      <select {...register("city")}>
        <option value="">請選擇城市</option>
        {CityArray[0].map((v, i) => {
          return (
            <option key={i} value={v}>
              {v}
            </option>
          );
        })}
      </select>
      <select {...register("district")}>
        <option value="">請選擇鄉鎮區</option>
        {/* 當city狀態有值時，以得到的索引，比對出現對應的子下拉清單 */}
        {CityArray[1][CityArray[0].indexOf(city)].map((v, i) => {
          return (
            <option key={i} value={v}>
              {v}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default CitySelector;
