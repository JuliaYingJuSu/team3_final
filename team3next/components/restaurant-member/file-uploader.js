import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FileUploader() {
  const { register, handleSubmit, watch,formState: { errors } } = useForm();

  const onSubmit = async (data) => { 
    console.log(data)
  }

  return (
      <input className="input-area"
                type="file"
                {...register("photo", { required: "請輸入資料" })}
                id="photo"
                style={{ height: "150px" }} />
  );
}
