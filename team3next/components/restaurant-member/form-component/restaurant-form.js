import React from "react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "@/validation/register-validation";
import { Upload, Modal, Form } from "antd";
import axios from "axios";

export default function FormLayout({
  children,
  prevPage,
  nextPage,
  page,
  currentField,
}) {
  const methods = useForm({ resolver: yupResolver(registerSchema) });
  const {
    handleSubmit,
    formState: { errors },
    trigger,
  } = methods;
  console.log(errors);
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3002/api/restaurant/member-register",
        data
      );
      console.log("Server Response:", response.data);
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
                <button
                  onClick={async () => {
                    nextPage;
                    const output = await trigger(currentField, {
                      shouldFocus: true,
                    });
                    if (output) {
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
