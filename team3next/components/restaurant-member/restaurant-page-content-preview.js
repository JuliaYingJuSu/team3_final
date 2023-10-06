import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import CitySelector from "./city-selector";

import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

import { Upload, Modal } from "antd";

export default function PageContent() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(errors);

  console.log(watch());
  // rhf

  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const props = {
    name: "files",
    multiple: true,
    listType: "picture",
    maxCount: 5,
    style: {
      backgroundColor: "#FBF9EF",
      border: "none",
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  // antd

  return (
    <>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <h2 style={{ color: "#985637" }}>餐廳資料維護</h2>
          <form
            className="d-flex flex-column justify-content-center"
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <div className="d-flex flex-column my-3">
              <label className="fs18b" htmlFor="name">
                店家名稱
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.name?.message}
                </span>
              </label>
              <input
                className="input-res"
                type="text"
                {...register("name", { required: "請輸入資料" })}
                id="name"
                placeholder=""
              />
            </div>
            <div className="d-flex flex-column  mb-3">
              <label className="fs18b" htmlFor="address">
                店家地址
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.address?.message}
                </span>
              </label>
              <div className="d-flex justify-content-start">
                <CitySelector />
                <input
                  className="input-res w-100"
                  type="text"
                  {...register("address", { required: "請輸入資料" })}
                  id="password"
                  placeholder="請輸入資料"
                />
              </div>
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="phone">
                市內電話
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.phone?.message}
                </span>
              </label>
              <input
                className="input-res"
                type="text"
                {...register("phone", { required: "請輸入資料" })}
                id="phone"
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="opening">
                營業時間
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.opening?.message}
                </span>
              </label>
              <input
                className="input-res"
                type="text"
                {...register("opening", { required: "請輸入資料" })}
                id="opening"
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="description">
                餐廳介紹
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.description?.message}
                </span>
              </label>
              <textarea
                className="input-area"
                type="text"
                {...register("description")}
                id="description"
                style={{ height: "150px" }}
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="photo">
                {" "}
                餐廳照片
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.photo?.message}
                </span>
              </label>
              <FormItem control={control} name="photo" valuePropName="fileList">
                <Upload.Dragger {...props} onPreview={ handlePreview }>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ color: "#ae4818" }} />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload.
                  </p>
                </Upload.Dragger>
              </FormItem>
              <Modal
                className="z-1"
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>
            </div>

            <button className="btn btn-big mt-4 ms-auto" type="submit">
              確認修改
            </button>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  );
}
