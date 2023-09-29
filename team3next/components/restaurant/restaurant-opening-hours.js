import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";

export default function OpeningHours() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("http://localhost:3002/try-post", data);
      console.log("Server Response:", response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const daysOfWeek = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日",
  ];
  const hoursOption = [];
  for (let i = 0; i < 24; i++) {
    const hm = dayjs().hour(i).minute(0);
    hoursOption.push(hm.format("HH:mm"));
  }
  //  算出24小時陣列
  console.log(hoursOption);
  return (
    <>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h2 style={{ color: "#985637" }}>營業時間管理</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {daysOfWeek.map((v, i) => {
              return (
                <div key={i}>
                  <label htmlFor={`day${i}`}>
                    <input
                      type="checkbox"
                      id={`day${i}`}
                      {...register(`weekday${i}`)}
                      value={i == 6 ? i - 6 : i + 1}
                    />
                    {v}
                    <select {...register(`startTime${i}`)}>
                      {/*修正bug： 因為 startime 名稱相同，所以只會傳送最後一筆名為 starttime 的資料。 */}
                      {hoursOption.map((v, i) => {
                        return (
                          <option key={i} value={v}>
                            {v}
                          </option>
                        );
                      })}
                    </select>
                    <select {...register(`endTime${i}`)}>
                      {hoursOption.map((v, i) => {
                        return (
                          <option key={i} value={v}>
                            {v}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>
              );
            })}
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
}
