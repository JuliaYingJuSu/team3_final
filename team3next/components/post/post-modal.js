import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import FollowButton from "./followbutton";
import Like from "./like";
import Saved from "./saved";
import { Carousel } from "react-bootstrap";
import AuthContext from "@/hooks/AuthContext";
import Router from "next/router";




export default function PostModal({
  post_id,
  post_title,
  post_content,
  createTime,
  post_image_name,
  restaurant_city,
  restaurant_name,
  food_tag_names,
  user_id,
  nickname,
  user_img,
}) {
  const [imgs, setImgs] = useState([]);
  const [comments, setComments] = useState([]);
  const contentParagraphs = post_content.split('\n');

  // 使用 Set 來去重除重複的 food_tag_names 數組
  const uniqueFoodTags = [...new Set(food_tag_names)];
  // 創建日期對象
  const createDate = new Date(createTime);

  // 獲取日期部分（年、月、日）
  const year = createDate.getFullYear();
  const month = (createDate.getMonth() + 1).toString().padStart(2, "0"); // +1 因為月份從 0 開始，padStart 用於補零
  const day = createDate.getDate().toString().padStart(2, "0");

  // 格式化為 "YYYY.MM.DD" 格式
  const formattedDate = `${year}.${month}.${day}`;

  const [messageVal, setMessageVal] = useState({ message: "" });
  const [errors, setErrors] = useState({});

  const messageChanged = (e) => {
    const { id, value } = e.target;
    console.log({ id, value });
    const newVal = { ...messageVal, [id]: value };
    setMessageVal(newVal);
  };
  const sendMessage = (e) => {
    // console.log(JSON.parse(localStorage.getItem("auth").user_id))
    const message_re = /.{1,}/;
    e.preventDefault();
    fetch('http://localhost:3002/api/post/add-comment', {
      method: "POST",
      body: JSON.stringify({
        uid:auth.user_id,
        content: messageVal.message,
        pid: post_id,
      
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        Router.push("/post")
      });
    

    const newErrors = {};

    if (!message_re.test(messageVal.message)) {
      newErrors.message = "請輸入留言";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("沒有錯誤");
    } else {
      console.log("---------有錯誤");
    }
  };

  // 初始化輪播的 activeIndex
  const [activeIndex, setActiveIndex] = useState(0);

  // 處理輪播的下一張圖片
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  useEffect(() => {
    if (post_id) {
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
        });
    }
  }, []);

  useEffect(() => {
    if (post_id) {
      fetch(`http://localhost:3002/api/post/post-comment`, {
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
          setComments(r);
        });
    }
  }, [imgs]);

  const {auth} = useContext(AuthContext);

  return (
    <>
      <div
        className="modal fade"
        id={"exampleModal" + post_id}
        tabindex="-1"
        aria-labelledby={"exampleModalLabel" + post_id}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                <div className="d-flex align-items-center p-1">
                  <div className="me-2">
                    <Link href="/user/user-my-article-i">
                      <img
                        className="rounded-circle headshot-sm img-thumbnail"
                        src={user_img}
                      ></img>
                    </Link>
                  </div>
                  <p className="middle me-2">
                    <a className="fs16b pt-3 text-dark" href="#">
                      {nickname}
                    </a>
                  </p>
                  <FollowButton />
                </div>
                <div className="d-flex align-items-center p-1">
                  <p className="icon-map me-1">
                    <a className="me-1 restaurant" href="#">
                      {restaurant_name}
                    </a>
                  </p>
                  <p className="me-1">
                    <a href="#" className="text-dark">
                      {restaurant_city}
                    </a>
                  </p>
                </div>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body overflow-x-hidden">
              {/* 使用 Carousel 顯示多個圖片 */}
              <Carousel
                activeIndex={activeIndex}
                onSelect={handleSelect}
                interval={null} // 停用自動播放
                className="image-radius"
              >
                {imgs.map((v, i) => (
                  <Carousel.Item key={i}>
                    <img
                      src={`/images/post/${v.post_image_name}`}
                      className="d-block w-100 object-fit-cover"
                      alt="..."
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="d-flex justify-content-end align-items-center fs14 grey me-3">
              <span className="middle">
                <Like />
                {/* <span>1</span> */}
              </span>
              <span className="middle">
                <a className="btn btn-sm btn-i" href="#message">
                  <i className="fa-regular fa-comment"></i>
                </a>
                {/* <span>1</span> */}
              </span>
              <span className="middle">
                <Saved />
                {/* <span>1</span> */}
              </span>
            </div>
            <div className="ms-3" >
              <div className="mb-3">{contentParagraphs.map((paragraph, index) => (
                <div className="mb-3" key={index}>
                  {paragraph}
                </div>
              ))} </div>
              <p className="icon-tag">
                {uniqueFoodTags.map((foodTag, index) => (
                  <a
                    href="#"
                    className="ms-2"
                    style={{ color: "#666666" }}
                    key={index}
                  >
                    {foodTag}
                  </a>
                ))}
              </p>
              <p className="fs12 mb-2">{formattedDate}</p>
            </div>
            <hr />
            {comments &&
              comments.map((v, i) => {
                {/* console.log(v);  */}
                return (
                  <div className="info d-flex align-items-start ms-2" key={i}>
                    <div className="me-2">
                      <Link href="/user/user-my-article-i">
                        <img
                          className="rounded-circle headshot-sm img-thumbnail"
                          src={v.user_img}
                        ></img>
                      </Link>
                    </div>
                    <div className="me-auto">
                      <a className="fs16b text-dark" href="#">
                      {v.nickname}
                      </a>
                      <p >{v.content}</p>
                    </div>
                    <div>
                      <p className="fs12 mt-3 me-3">{v.create_time.substr(0,10)}</p>
                    </div>
                  </div>
                );
              })}
            <hr />
            <form className="container input-group mb-3" onSubmit={sendMessage}>
              <input
                type="text"
                className="form-control"
                placeholder="新增留言"
                aria-label="message"
                aria-describedby="button-addon2"
                id="message"
                onChange={messageChanged}
                value={messageVal.message}
              />
              <button
                className="btn btn-outline-secondary"
                type="submit"
                id="button-addon2"
              >
                發送
              </button>
              <p className="form-text container warning">{errors.message}</p>
            </form>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .icon-map:before {
            color: #ae4818;
          }
          .restaurant {
            color: #ae4818;
          }
          .object-fit-cover {
            width: 500px;
            height: 500px;
          }
          .image-radius {
            border-radius: 10px;
          }
          .carousel-indicators button {
            width: 10px;
            height: 10px;
            border-radius: 100%;
          }
          .warning {
            color: red;
            margin-top: 0;
          }
        `}
      </style>
    </>
  );
}
