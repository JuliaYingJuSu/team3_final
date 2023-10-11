import React from "react";
import cityArray from "@/data/city.json";
import { useState, useEffect } from "react";

export default function CitySelector({ register, watch }) {
  // const selectedCity = watch("city");
  // console.log([selectedCity]);

  useEffect(() => {
    const selectedCityIndex = cityArray[0].findIndex(
      (city) => city === watch("city")
    );
    setCityIndex(selectedCityIndex);
  }, [watch("city")]);
  const [cityIndex, setCityIndex] = useState("");
  // 記錄第一個input選中的city的index到state裡

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
