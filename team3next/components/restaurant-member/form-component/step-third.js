import React from "react";
import { FormItem } from "react-hook-form-antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Upload, Modal, Form } from "antd";
import { useFormContext } from "react-hook-form";

export default function StepThird() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext();

  const props = {
    name: "files",
    multiple: true,
    listType: "picture",
    maxCount: 5,
    style: {
      backgroundColor: "#FBF9EF",
      border: "none",
    },
  };
  return (
    <>
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

        <FormItem
          control={control}
          name="photo"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
          noStyle
          // bug fixed用來解決filelist錯誤
        >
          <Upload.Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ color: "#ae4818" }} />
            </p>
            <p className="ant-upload-text">請從電腦選擇照片或拖曳到這裡</p>
            <p className="ant-upload-hint">可多選，最多五張</p>
          </Upload.Dragger>
        </FormItem>
      </div>
    </>
  );
}
