import React, { useState, useContext } from "react";
import { PictureOutlined } from "@ant-design/icons";
import { Upload, Form, Button, Input, message } from "antd";
import Swal from "sweetalert2";
import AuthContext from "@/hooks/AuthContext";
import AntdRestaurant from "./antd_restaurant";
import AntdFoodtag from "./antd_foodtag";

export default function TryAntd() {
  const { auth } = useContext(AuthContext);
  const [form] = Form.useForm(); //新增表單
  
  //sweetalert 設定
  const swalButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const onFinish = async (values) => {
    const { post_title, post_content, post_restaurant_id } = values;

    const selectedOptionValues = selectedOptions.map((v) => v.value);
    values.food_tag_id = selectedOptionValues;

    try {
      const response = await fetch("http://localhost:3002/api/post/add-post", {
        method: "POST",
        body: JSON.stringify({
          user_id: auth.user_id,
          ...vaules,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log(result);

      if (result.success) {
        message.success("文章发布成功");
        form.resetFields(); // 重置表单
      } else {
        message.error("文章发布失败");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("发布文章时发生错误");
    }
  };

  const props = {
    name: "files",
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

  const { TextArea } = Input;
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };

  // const sendArticle = (e) => {
  //   //console.log("submitting")
  //   e.preventDefault();
  //   const selectedOptionValues = selectedOptions.map((v,i) => v.value)
  //   fetch("http://localhost:3002/api/post/add-post", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       user_id: auth.user_id,
  //       post_title: title.Posttitle,
  //       post_content: content.content,
  //       post_restaurant_id: selectedOption.value,
  //       food_tag_id:selectedOptionValues,
  //     }),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((r) => r.json())
  //     .then((r) => {
  //       console.log(r);
  //     });

  //   // const sendPost = async (data) => {
  //   //   const formData = new FormData();
  //   //   for (let key in data) {
  //   //     formData.append(key, data[key]);
  //   //   }
  //   //   data.photo.forEach((file) => {
  //   //     formData.append("photo", file.originFileObj);
  //   //   });
  //   //   try {
  //   //     const response = await axios.post(
  //   //       "http://localhost:3002/api/post/add-post",
  //   //       formData
  //   //     );
  //   //     console.log("Server Response:", response.data);
  //   //   } catch (err) {
  //   //     console.error("Error:", err);
  //   //   }
  //   // };
  // };
  return (
    <>
      <div className="container-sm bg-color mb-2 d-flex justify-content-center ">
        <Form form={form} onFinish={onFinish}>
          
            <Form.Item
              control=""
              name="post_image"
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
                <div className="mt-5">
                  <p className="ant-upload-drag-icon">
                    <PictureOutlined style={{ color: "#ae4818" }} />
                  </p>
                  <p className="ant-upload-text">
                    請從電腦選擇照片或拖曳到這裡
                  </p>
                  <p className="ant-upload-hint">可多選，最多十張</p>
                </div>
              </Upload.Dragger>
            </Form.Item>
         
          
            <Form.Item>
              <div className="input-group mb-3 mt-5 w-100">
                <span
                  className="input-group-text icon-edit"
                ></span>
                <Input
                  style={{
                    width: 387,
                  }}
                  showCount
                  maxLength={30}
                  onChange={onChange}
                  placeholder="新增標題"
                  name="post_title"
                  label="文章標題"
                />
              </div>
            </Form.Item>
            <Form.Item>
              <div className="input-group mb-3 w-100 ">
                <span className="input-group-text icon-map"></span>
                <AntdRestaurant name="post_restaurant"  
                  label="餐廳名稱"/>
              </div>
            </Form.Item>
            <Form.Item>
              <div className="input-group mb-3 w-100">
                <span className="input-group-text icon-tag"></span>
                <AntdFoodtag name="food_tag" label="食物標籤"/>
              </div>
            </Form.Item>
            <Form.Item>
              <div className="input-group mb-3 w-100">
                <span className="input-group-text icon-edit"></span>
                <TextArea
                  showCount
                  maxLength={500}
                  style={{
                    height: 120,
                    resize: "none",
                    width: 387,
                    
                  }}
                  onChange={onChange}
                  placeholder="撰寫內文..."
                  name="post_content"
                  label="文章內容"
                />
              </div>
            </Form.Item>
            <Form.Item><Button htmlType="submit" className="btn btn-big">
              發表文章
            </Button></Form.Item>
            
          
        </Form>
      </div>
    </>
  );
}
