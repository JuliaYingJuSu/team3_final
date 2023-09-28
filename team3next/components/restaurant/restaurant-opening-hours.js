import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function OpeningHours() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    try{const response = await axios.post("http://localhost:3002/try-post",data);
    console.log("Server Response:", response.data);}
    catch(err){console.error("Error:",err)}
    
  }

  const daysOfWeek = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
  return (
    <>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h2 style={{ color: "#985637" }}>營業時間管理</h2>
          <form
            onSubmit={handleSubmit(onSubmit)
            }
          >
            {daysOfWeek.map((v, i) => {
              return (
                <label key={i} htmlFor={`day${i}`}>
                  <input type="checkbox" id={`day${i}`} {...register("opening")} value={i} />
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