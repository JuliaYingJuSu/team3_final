import React, { useState } from "react";
import Link from "next/link";
import FollowButton from "../post/followbutton";
import Like from "./like";
import Saved from "./saved";

export default function PostModal(
  {
  post_id,
  post_title,
  post_content,
  createTime,
  post_image_name,
  restaurant_city,
  restaurant_name,
  food_tag_names,
  }
) {
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
    const message_re = /.{1,}/;
    e.preventDefault();

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

  return (
    <>
    
      <div 
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                <div className="d-flex align-items-center p-1">
                  <div className="me-2">
                    <Link href="/user/user-my-article-i">
                      <img
                        className="rounded-circle headshot-sm img-thumbnail"
                        src="/images/logo.png"
                      ></img>
                    </Link>
                  </div>
                  <p className="middle me-2">
                    <a className="fs16b pt-3 text-dark" href="#">
                      會員暱稱
                    </a>
                  </p>
                  <FollowButton />
                  {/* <button
                    className="btn btn-little ms-auto"
                    onClick={() => {
                      setFollow(!follow);
                    }}
                  >
                    {follow ? '追蹤' : '追蹤中'}
                  </button> */}
                </div>
                <div className="d-flex align-items-center p-1">
                  <p className="icon-map me-1">
                    <a className="me-1 restaurant" href="#">
                    {restaurant_name}
                    </a>
                  </p>
                  {/* <p className="me-1">
                    <a href="#" className="text-dark">
                      台北市
                    </a>
                  </p>
                  <p className="me-1">
                    <a href="#" className="text-dark">
                      松山區
                    </a>
                  </p> */}
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
              <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                  ></button>
                </div>
                <div className="carousel-inner image-radius">
                  <div className="carousel-item active">
                    <img
                      src="./images/post/cincin1.jpg"
                      className="d-block w-100 object-fit-cover"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="./images/post/cincin2.jpg"
                      className="d-block  object-fit-cover"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="./images/post/cincin3.jpg"
                      className="d-block  object-fit-cover"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="./images/post/cincin4.jpg"
                      className="d-block  object-fit-cover"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center fs14 grey me-3">
              <span className="middle">
                <Like />
                {/* <button className="btn btn-sm btn-i"
                onClick={() => {
                      setLike(!like);
                    }}
                >
                  <i className={like ? "icon-heart-fill" : "icon-heart"}></i>
                  
                </button> */}
                <span>1</span>
              </span>
              <span className="middle">
                <a className="btn btn-sm btn-i" href="#message">
                  <i className="fa-regular fa-comment"></i>
                </a>
                <span>1</span>
              </span>
              <span className="middle">
                <Saved />
                {/* <button className="btn btn-sm btn-i" onClick={() => {
                      setSaved(!saved);
                    }}>
                  <i className={saved ? "icon-mark-fill" : "icon-mark"}></i>
                </button> */}
                <span>1</span>
              </span>
            </div>
            <div className="ms-3" style={{ width: 470 }}>
              <div className="mb-3">
              {post_content}
              
                {/* 公司附近的義大利餐廳
                <br />
                餐廳的海鮮是從基隆港直接進貨非常新鮮
                <br />
                今天點了四道
                <br />
                酪梨醬辣味番茄莎莎海鮮披薩
                <br />
                烏魚子香蒜辣椒鯷魚炒白花椰
                <br />
                松露奶醬烤菇燉飯
                <br />
                義式烤本島現流海魚
                <br />
                每一道都好吃
                <br /> */}
              </div>
              <p className="icon-tag">
                {/* <a className="ms-2 " href="#" style={{ color: "#666666" }}>
                  義式
                </a>
                <span className="ms-2">|</span>
                <a className="ms-2" href="#" style={{ color: "#666666" }}>
                  午餐
                </a> */}
                {uniqueFoodTags.map((foodTag, index) => (
                <a href="#" className="ms-2" style={{ color: "#666666" }} key={index} >
                  {foodTag}
                </a>
              ))}
              </p>
              <p className="fs12 mb-2">{formattedDate}</p>
            </div>
            <hr />
            <div className="d-flex align-items-start ms-2">
              <div className="me-2">
                <Link href="/user/user-my-article-i">
                  <img
                    className="rounded-circle headshot-sm img-thumbnail"
                    src="/images/logo.png"
                  ></img>
                </Link>
              </div>
              <div className="me-auto">
                <a className="fs16b text-dark" href="#">
                  會員暱稱
                </a>
                <p>讚，感謝分享。</p>
              </div>
              <div>
                <p className="fs12 mt-3 me-3">2023.9.6</p>
              </div>
            </div>
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
