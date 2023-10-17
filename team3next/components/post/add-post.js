import React, { useState, useContext } from "react";
import { PictureOutlined } from "@ant-design/icons";
import { Upload, Form } from "antd";
import PostRestaurant from "./post_restaurant";
import FoodTags from "./foodtags";
import Swal from "sweetalert2";
import AuthContext from "@/hooks/AuthContext";

export default function AddPost() {
  const { auth } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  console.log({ selectedOption, selectedOptions });
  //sweetalert 設定
  const swalButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const props = {
    name: "files",
    multiple: true,
    listType: "picture-card",
    maxCount: 10,
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    style: {
      backgroundColor: "#FBF9EF",
      border: "none",

    },
  };
    const [title, setTitle] = useState({ title: "" });
     const [content, setContent] = useState({ content: "" });
     const titleChanged = (e) => {
       const { id, value } = e.target;
       console.log({ id, value });
       const newTitle = { ...title, [id]: value };
       setTitle(newTitle);
     };
  const contentChanged = (e) => {
    const { id, value } = e.target;
    console.log({ id, value });
    const newContent = { ...content, [id]: value };
    setContent(newContent);
  };

  const sendArticle = (e) => {
    e.preventDefault();
    fetch("http://localhost:3002/api/post/add-post", {
      method: "POST",
      body: JSON.stringify({
        user_id: auth.user_id,
        post_title: title.Posttitle,
        post_content: content.content,
        post_restaurant_id: selectedOption.value,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
      });

    const sendPost = async (data) => {
      const formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      data.photo.forEach((file) => {
        formData.append("photo", file.originFileObj);
      });
      try {
        const response = await axios.post(
          "http://localhost:3002/api/post/add-post",
          formData
        );
        console.log("Server Response:", response.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
  };
  return (
    <>
      <div className="container-sm  bg-color mb-2 d-flex justify-content-around ">
        
          <Form>
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
          </Form>
     
        <div>
          <form onSubmit={sendArticle}>
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
                  id="Posttitle"
                  onChange={titleChanged}
                  value={title.Posttitle}
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
                <PostRestaurant
                  className="input-group-text"
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              </div>
              <div
                className="input-group mb-3 w-100"
                style={{ width: "310px" }}
              >
                <span className="input-group-text icon-tag"></span>
                <FoodTags
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                />
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
                  aria-label="content"
                  placeholder="撰寫內文..."
                  rows="10"
                  cols="20"
                  maxLength="500"
                  id="content"
                  onChange={contentChanged}
                  value={content.content}
                ></textarea>
              </div>
              <div className="d-flex justify-content-center mb-3">
                <button
                  className="btn btn-big me-2"
                  onClick={() => {
                    swalButtons
                      .fire({
                        title: "確定要放棄這篇文章?",
                        icon: "warning",
                        showCancelButton: true,
                        cancelButtonText:
                          '<i class="fa-regular fa-circle-xmark fs-5"></i> 先不要',
                        confirmButtonText:
                          '<i class="far fa-check-circle fs-5"></i> 放棄',
                      })
                      .then((result) => {
                        if (result.isConfirmed) {
                          swalButtons.fire("結束發表", "", "success");
                        }
                      });
                  }}
                >
                  放棄發表
                </button>
                <button type="submit" className="btn btn-big">
                  發表文章
                </button>
              </div>
            </div>
          </form>
        </div>
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
