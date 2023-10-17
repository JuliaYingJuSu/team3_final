import React from "react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "@/validation/register-validation";
import { Upload, Modal, Form } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
// 製作form的外框，把含有上傳功能的form作為模板使用,因此使用rhf自帶的context從這裡往下傳送即可，其他地方不需要用到
export default function FormLayout({
  children,
  prevPage,
  nextPage,
  page,
  currentField,
}) {
  const router = useRouter();
  const methods = useForm({ resolver: yupResolver(registerSchema) });
  const {
    handleSubmit,
    formState: { errors },
    trigger,
  } = methods;
  console.log(errors);
  const onSubmit = async (data) => {
    // 一個formdata物件
    const formData = new FormData();

    // 將表單的name加到formdata,因為rhf的data是obj，可以這麼做
    for (let key in data) {
      formData.append(key, data[key]);
    }
    // 添加檔到 FormData，其中 "photo" 是欄位名稱
    // 拆解到只剩下file
    data.photo.forEach((file) => {
      formData.append("photo", file.originFileObj);
    });
    // console.log(data.photo[0].originFileObj);

    try {
      const response = await axios.post(
        "http://localhost:3002/member-register",
        formData
      );
      console.log("Server Response:", response.data);
      router.push(`/restaurant-member/member-login`);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <div className="row w-100">
          <div className="col-3"></div>
          <div className="col-6">
            <Form
              className="d-flex flex-column justify-content-center"
              onFinish={handleSubmit(onSubmit)}
            >
              {children}
              <div className="d-flex justify-content-between">
                <button
                  onClick={prevPage}
                  className={`btn btn-big mt-4 ${page === 0 ? "d-none" : ""}`}
                  type="button"
                >
                  上一步
                </button>
                {/* 下一步的按鈕用rhf的trigger即使不用submit也能暫時觸發檢查，currentField為本頁目前所含的欄位 */}
                <button
                  onClick={async () => {
                    nextPage;
                    const output = await trigger(currentField, {
                      shouldFocus: true,
                    });
                    if (output) {
                      // 這裡rhf會回傳佈林值，如果為true就下一頁
                      nextPage();
                    }
                  }}
                  className={`btn btn-big mt-4 ms-auto ${
                    page === 2 ? "d-none" : ""
                  }`}
                  type="button"
                >
                  下一步
                </button>
                <button
                  className={`btn btn-big mt-4 ms-auto ${
                    page === 2 ? "" : "d-none"
                  }`}
                >
                  確認修改
                </button>
              </div>
            </Form>
          </div>
          <div className="col-3"></div>
        </div>
      </FormProvider>
    </>
  );
}
