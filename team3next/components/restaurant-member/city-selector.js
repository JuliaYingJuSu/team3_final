import React from "react";
import cityArray from "@/data/city.json";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CitySelector() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

 
  // const selectedCity = watch("city");
  // console.log([selectedCity]);

  useEffect(() => {
    const selectedCityIndex = cityArray[0].findIndex(
      (city) => city === watch("city")
    );
    setCityIndex(selectedCityIndex)
  }, [watch("city")]);
  const [cityIndex, setCityIndex] = useState("");
  // 記錄第一個input選中的city的index


  return (
    <>
    <div className="d-flex">
      <select className="selector me-2" {...register("city")}>
        <option value="">請選擇城市</option>
        {cityArray[0].map((v, i) => {
          return (
            <option key={i} value={v}>
              {v}
            </option>
          );
        })}
      </select>
      <select className="selector me-2" {...register("district")}>
        <option value="">請選擇鄉鎮區</option>
        {/* 當city狀態有值時，以得到的索引，比對出現對應的子下拉清單 */}
        {cityArray[1][cityIndex]?.map((v, i) => {
          return (
            <option key={i} value={v}>
              {v}
            </option>
          );
        })}
      </select>
      </div>
    </>
  );
}
