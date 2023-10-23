import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { Upload, Form, Button, Input } from "antd";
import PostRestaurant from "./post_restaurant";
import FoodTags from "./foodtags";
import Swal from "sweetalert2";
import AuthContext from "@/hooks/AuthContext";
import router from "next/router";
import { PictureOutlined } from "@ant-design/icons";
import { Carousel } from "react-bootstrap";

export default function EditPost({ post_id }) {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [imgs, setImgs] = useState([]);
  // 初始化輪播的 activeIndex
  const [activeIndex, setActiveIndex] = useState(0);

  // 處理輪播的下一張圖片
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };
  // 要照片
  useEffect(() => {
    if ((post_id = 1)) {
      fetch(`http://localhost:3002/api/post/post-pid`, {
        method: "POST",
        body: JSON.stringify({
          post_id: post_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((r) => {
          // console.log(r);
          setImgs(r);
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
  }, []);

  useEffect(() => {
    if ((post_id = 1)) {
      fetch(`http://localhost:3002/api/post/edit-post/:uid/:pid`, {
        method: "POST",
        body: JSON.stringify({
          post_id: post_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((r) => {
          // console.log(r);
          set(r);
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
  }, []);

  //sweetalert 設定
  const swalButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-big",
      cancelButton: "btn btn-big",
    },
    buttonsStyling: false,
  });

  const [title, setTitle] = useState({ title: "" });
  const [content, setContent] = useState({ content: "" });
  const titleChanged = (e) => {
    const { id, value } = e.target;
    // console.log({ id, value });
    const newTitle = { ...title, [id]: value };
    setTitle(newTitle);
  };
  const contentChanged = (e) => {
    const { id, value } = e.target;
    console.log({ id, value });
    const newContent = { ...content, [id]: value };
    setContent(newContent);
  };

  const updateArticle = (e) => {
    e.preventDefault();
    fetch("http://localhost:3002/api/post/edit-post", {
      method: "POST",
      body: JSON.stringify({
        user_id: auth.user_id,
        post_title: title.Posttitle,
        post_content: content.content,
      }),
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
      });
  };

  return (
    <>
      <div className="container-sm  bg-color mb-2  ">
        <div className="container mt-2">
          <div className="row">
            <div className="col-lg-6">
              <Carousel
                activeIndex={activeIndex}
                onSelect={handleSelect}
                interval={null} // 停用自動播放
                className="image-radius my-3"
              >
                {imgs.map((v, i) => (
                  <Carousel.Item key={i}>
                    <img
                      src={`http://localhost:3002/img/${v.post_image_name}`}
                      className="d-block w-100 carousel-image"
                      alt="..."
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="col-lg-6">
              <div>
                <form onSubmit={updateArticle}>
                  <div>
                    <div className="input-group mb-3 mt-3 ">
                      <span
                        className="input-group-text icon-edit"
                        id="basic-addon1"
                      ></span>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="我是測試"
                        aria-label="Posttitle"
                        aria-describedby="basic-addon1"
                        id="Posttitle"
                        onChange={titleChanged}
                        value={title.Posttitle}
                      />
                    </div>
                    <div className="input-group mb-3 w-100 ">
                      <span className="input-group-text icon-map"></span>
                      {/* <PostRestaurant
                        className="input-group-text"
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                      /> */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="SABATINI CUCINA 深庭義式餐廳"
                        aria-label="Posttitle"
                        aria-describedby="basic-addon1"
                        disabled
                      />
                    </div>
                    <div
                      className="input-group mb-3 w-100"
                      style={{ width: "310px" }}
                    >
                      <span className="input-group-text icon-tag"></span>
                      {/* <FoodTags
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                      /> */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="義式、午餐、晚餐"
                        aria-label="Posttitle"
                        aria-describedby="basic-addon1"
                        disabled
                      />
                    </div>
                    <div className="input-group mb-3 ">
                      <span className="input-group-text icon-edit"></span>
                      <textarea
                        className="form-control"
                        aria-label="content"
                        placeholder="該拿這個會縮小的介面怎麼辦啊
                                                            我揪竟能轉職成功嗎"
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
                              title: "確定要放棄修改這篇文章?",
                              icon: "warning",
                              showCancelButton: true,
                              cancelButtonText:
                                '<i class="fa-regular fa-circle-xmark fs-5"></i> 先不要',
                              confirmButtonText:
                                '<i class="far fa-check-circle fs-5"></i> 放棄',
                            })
                            .then((result) => {
                              if (result.isConfirmed) {
                                swalButtons.fire("結束修改", "", "success");
                              }
                            });
                        }}
                      >
                        放棄修改
                      </button>
                      <button type="submit" className="btn btn-big">
                        修改文章
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .btn {
            color: #985637;
          }
          .bg-color {
            background-color: #fbf9ef;
            border-radius: 10px 10px 10px 10px;
          }
          .carousel-image {
            width: 100%;
            height: 500px;
            object-fit: cover;
          }
        `}
      </style>
      <Head>
        <title>食食嗑嗑-編輯文章</title>
      </Head>
    </>
  );
}
