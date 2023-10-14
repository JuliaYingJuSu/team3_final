import Link from "next/link";
import React from "react";
import { PictureOutlined } from "@ant-design/icons";
import { Upload, Form } from "antd";
import PostRestaurant from "./post_restaurant";
import FoodTags from "./foodtags";

// fetch(process.env.API_SERVER +"/api/post/addpost",{
//   method:"POST",
//   body:JSON.stringify({
//     uid:localStorage.getItem("auth").user_id,

//   })
// })


export default function AddPost() {
  const props = {
    name: "files",
    multiple: true,
    listType: "picture-card",
    maxCount: 10,
    style: {
      backgroundColor: "#FBF9EF",
      border: "none",
    },
  };

  return (
    <>
      <div className="container-sm justify-content-center bg-color mb-2">
        <Form className="d-flex justify-content-around">
          <div className="my-3">
            <Form.Item
              control=""
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
          <div className="">
            <div className="input-group mb-3 mt-5 ">
              <span
                className="input-group-text icon-edit"
                id="basic-addon1"
              ></span>
              <input
                type="text"
                className="form-control"
                placeholder="新增標題"
                aria-label="Posttitle"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3 w-100 ">
              <span className="input-group-text icon-map"></span>
              {/* <input
                type="text"
                className="form-control"
                placeholder="新增餐廳"
                aria-label="Postlocation"
                aria-describedby="button-addon2"
              /> */}
              <PostRestaurant className="input-group-text" />
            </div>
            <div className="input-group mb-3 ">
              <span className="input-group-text icon-tag"></span>
              <FoodTags/>
              {/* <input
                type="text"
                className="form-control"
                placeholder="新增標籤"
                aria-label="Posttag"
                aria-describedby="button-addon3"
              /> */}
            </div>
            <div className="input-group mb-3 ">
              <span className="input-group-text icon-edit"></span>
              <textarea
                className="form-control"
                aria-label="With textarea"
                placeholder="撰寫內文..."
                rows="10"
                cols="20"
                maxlength="500"
              ></textarea>
            </div>
            <div className="d-flex justify-content-center mb-3">
              <Link className="btn btn-big me-2" href="#">
                放棄發表
              </Link>
              <button type="submit" className="btn btn-big">
                發表文章
              </button>
            </div>
          </div>
        </Form>
      </div>
      
      <style jsx>
        {`
          .btn {
            color: #ae4818;
          }
          .bg-color {
            background-color: #fbf9ef;
            border-radius: 10px 10px 10px 10px;
            width: 900px;
            height: 550px;
          }
        `}
      </style>
    </>
  );
}
