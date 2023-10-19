import React from "react";
import { PictureOutlined } from "@ant-design/icons";
import { Upload, Form, Button } from "antd";
import Swal from "sweetalert2";

export default function TestUpload() {
  const onFinish = async (values) => {
    const formData = new FormData();

    if (values.photo && values.photo.length > 0) {
      values.photo.forEach((file, index) => {
        formData.append(`photo${index + 1}`, file.originFileObj);
      });
    }

    try {
      const response = await fetch("http://localhost:3002/api/post/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        Swal.fire("文件上传成功", "", "success");
      } else {
        Swal.fire("文件上传失败", "", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("上传文件时发生错误", "", "error");
    }
  };

  const props = {
    name: "photo",
    multiple: true,
    listType: "picture-card",
    maxCount: 10,
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    style: {
      backgroundColor: "#FBF9EF",
      border: "none",
    },
  };

  return (
    <div className="container-sm bg-color mb-2 d-flex justify-content-center">
      <Form name="add-post-form" onFinish={onFinish}>
        <div className="my-3">
          <Form.Item
            name="photo"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            noStyle
          >
            <Upload.Dragger {...props}>
              <div className="mt-5">
                <p className="ant-upload-drag-icon">
                  <PictureOutlined style={{ color: "#ae4818" }} />
                </p>
                <p className="ant-upload-text">請從電腦選擇照片或拖曳到這裡</p>
                <p className="ant-upload-hint">可多選，最多十張</p>
              </div>
            </Upload.Dragger>
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
