import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Upload, Modal, Form } from "antd";


export default function MulterTest() {
    const {register,handleSubmit} = useForm()
    const onSubmit = async (data) => {
        console.log(data.image[0])
        const formData = new FormData()

        const response = await axios.post("http://localhost:3002/api/restaurant/image-upload")
        
    }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("image")}/>
        <button type="submit">送出</button>
      </form>
    </>
  );
}
