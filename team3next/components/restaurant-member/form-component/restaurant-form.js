import React from "react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Upload, Modal, Form } from "antd";
import axios from "axios";

export default function Form({ children }) {
  const methods = useForm(yupResolver());
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <FormProvider {...methods}>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <Form
              className="d-flex flex-column justify-content-center"
              onFinish={methods.handleSubmit(onSubmit)}
            >
              {children}
            </Form>
          </div>
          <div className="col-3"></div>
        </div>
      </FormProvider>
    </>
  );
}
