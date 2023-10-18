import React, { useState } from "react";
import axios from "axios";
import { Upload, Modal, Form, Button } from "antd";

export default function MulterTest() {
  const [fileList, setFileList] = useState([]); // 存fileList

  const handleSubmit = async () => {
    try {
      console.log(fileList);
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("avatar", file.originFileObj);
      });
      const res = await axios.post(
        "http://localhost:3002/image-upload",
        formData
      );
      console.log("Server Response:", res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (info) => {
    if (info.fileList.length > 0) {
      console.log("上傳文件列表", info.fileList);
      setFileList(info.fileList);
    }
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="avatar"
          label="Upload profile picture"
          getValueFromEvent={({ file }) => {
            console.log(file.originFileObj);
          }}
        >
          <Upload
            accept="image/png, image/jpeg"
            maxCount={5}
            listType="picture-card"
            showUploadList={false}
            multiple={true}
            onChange={handleChange}
          >
            <Button>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
