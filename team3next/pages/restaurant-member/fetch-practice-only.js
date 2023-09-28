import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function OpeningHours() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // console.log(errors);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:3002/try-post", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      const uploadData = await response.json();
      console.log("Server Response:", uploadData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const daysOfWeek = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  return (
    <>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h2 style={{ color: "#985637" }}>營業時間管理</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {daysOfWeek.map((v, i) => {
              return (
                <label key={i} htmlFor="opening">
                  <input type="checkbox" {...register("opening")} value={i} />
                  {v}
                </label>
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
