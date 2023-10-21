import Link from "next/link";
import React, { useState, useContext }from "react";
import Head from "next/head";
import { Upload, Form, Button, Input } from "antd";
import PostRestaurant from "./post_restaurant";
import FoodTags from "./foodtags";
import Swal from "sweetalert2";
import AuthContext from "@/hooks/AuthContext";
import router from "next/router";
import { PictureOutlined } from "@ant-design/icons";

export default function EditPost() {
  const { auth } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  console.log({ selectedOption, selectedOptions });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const swalButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-middle",
      cancelButton: "btn btn-middle",
    },
    buttonsStyling: false,
  });
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

  const onFinish = async (values) => {
    const formData = new FormData();
    if (values.photo && values.photo.length > 0) {
      values.photo.forEach((file, index) => {
        formData.append(`post_image${index + 1}`, file.originFileObj);
      });
    }

    formData.append("user_id", auth.user_id);
    formData.append("post_title", title);
    formData.append("post_content", content);
    formData.append("post_restaurant_id", selectedOption.value);
    selectedOptions.forEach((value, index) => {
      formData.append(`food_tag_id[${index}]`, value.value);
    });

    try {
      const response = await fetch("http://localhost:3002/api/post/add-post", {
        method: "POST",
        body: formData,
        // headers:{"Content-Type": "multipart/form-data"}
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        Swal.fire("文章發表成功", "", "success");
        // Reset the form
        // setSelectedOption("");
        // setSelectedOptions([]);
        // setTitle("");
        // setContent("");
        router.push("/post");
      } else {
        Swal.fire("文章發表失敗", "", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("發表文章時發生錯誤", "", "error");
    }
  };

  const titleChanged = (e) => {
    setTitle(e.target.value);
  };

  const contentChanged = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <div className="container bg-color mb-2 d-flex justify-content-around">
        <Form
          onFinish={onFinish}
          initialValues={{ title: title, content: content }}
          style={{
          display: 'flex',
          width: 600, // Adjust the width as needed
        }}>
          <div className="my-3" style={{ flex: 1, marginRight: '50px' }}>
            <Form.Item
              name="photo"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
              noStyle>
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
          </div>
          <div>
            <Form.Item>
              <div className="input-group mt-5">
                <span className="input-group-text icon-edit"></span>
                <Input
                  type="text"
                  value={title}
                  onChange={titleChanged}
                  placeholder="新增標題"
                  style={{
                    width: 268
                  }}
                  showCount
                  maxLength={30}
                  name="post_title"
                  autoFocus
                />
              </div>
            </Form.Item>
            <Form.Item  >
              <div className="input-group  w-100">
                <span className="input-group-text icon-map"></span>
                <PostRestaurant
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  classNames={{
    control: (state) =>
      state.isFocused ? 'border-red-600' : 'border-grey-300',
  }}
                />
              </div>
            </Form.Item>
            <Form.Item>
              <div className="input-group w-100">
                <span className="input-group-text icon-tag"></span>
                <FoodTags
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                />
              </div>
            </Form.Item>
            <Form.Item>
              <div className="input-group ">
                <span className="input-group-text icon-edit"></span>
                <Input.TextArea
                  value={content}
                  onChange={contentChanged}
                  placeholder="撰寫內文..."
                  rows={10}
                  maxLength={500}
                  showCount
                  style={{
                    height: 120,
                    resize: "none",
                    width: 268,
                  }}
                  name="post_content"
                  autoFocus
                />
              </div>
            </Form.Item>
            <Form.Item>
              <a
                className="btn btn-big me-3"
                onClick={() => {
                  swalButtons
                    .fire({
                      title: "確定要放棄這篇文章?",
                      text: "放棄文章將不會被保留喔！",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText:
                        '<i class="far fa-check-circle fs-5"></i>確定放棄',
                      cancelButtonText: '<i class="fa-regular fa-circle-xmark fs-5"></i>先不要',
                      reverseButtons: true,
                    })
                    .then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire("放棄成功", "您已放棄發表", "success");
                        router.push("/user/:user_id");
                      } else if (result.dismiss == Swal.DismissReason.cancel) {
                        swalButtons.fire("取消放棄", "請繼續編輯文章", "error");
                      }
                    });
                }}
              >
                捨棄文章
              </a>
              <Button htmlType="submit" className="btn btn-big ">
                發表文章
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <style jsx>
        {`
          .btn {
            color: #ae4818;
          }
          .object-fit-cover {
            width: 600px;
            height: 520px;
          }
          .bg-color {
            background-color: #fbf9ef;
            border-radius: 10px 10px 10px 10px;
            width: 850px;
            height: 550px;
          }
        `}
      </style>
      <Head>
        <title>食食嗑嗑-編輯文章</title>
      </Head>
    </>
  );
}
