import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Profile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  return (
    <>
      <h2 style={{ color: "#985637" }}>會員資料管理</h2>
      <form onSubmit={handleSubmit((data)=>{console.log(data)})}>
        <div className="d-flex flex-column">
          <label htmlFor="email">電子信箱</label>
          <input
            type="text"
            {...register("email", { required: "input something" })}
            id="email"
            placeholder="test@gmail.com"
          />
          <span></span>
        </div>
        <button className="btn btn-big" type="submit">確認修改</button>
      </form>
    </>
  );
}
