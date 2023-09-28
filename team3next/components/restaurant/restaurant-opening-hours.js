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
  console.log(errors);

  const daysOfWeek = ["星期日,星期一,星期二,星期三,星期四,星期五,星期六"];
  return (
    <>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h2 style={{ color: "#985637" }}>會員資料管理</h2>
          <form>
            {daysOfWeek.map((v, i) => {
              <label htmlFor="opening">
                <input type="checkbox" name="opening" value={i} />
              </label>;
            })}
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
}
