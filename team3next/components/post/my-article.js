import Link from "next/link";
import React from "react";
import Like from "./like";
import Saved from "./saved";
import AuthContext from "@/hooks/AuthContext";
import { Carousel } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";

export default function MyArticle({ article }) {
  const { auth } = useContext(AuthContext);
  const [imgs, setImgs] = useState([]);
  const [comments, setComments] = useState([]);
  const contentParagraphs = article.post_content.split("\n");
  console.log({ article });

  // 初始化輪播的 activeIndex
  const [activeIndex, setActiveIndex] = useState(0);

  // 處理輪播的下一張圖片
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  useEffect(() => {
    if (article.post_id) {
      fetch(process.env.API_SERVER + `/api/post/post-pid`, {
        method: "POST",
        body: JSON.stringify({
          post_id: article.post_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((r) => {
          setImgs(r);
          console.log(r);
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
  }, []);

  useEffect(() => {
    if (article.post_id) {
      fetch(process.env.API_SERVER + `/api/post/post-comment`, {
        method: "POST",
        body: JSON.stringify({
          post_id: article.post_id,
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

  return (
    <>
      <div
        className="modal fade"
        id={"exampleModal" + article.post_id}
        tabindex="-1"
        aria-labelledby={"exampleModalLabel" + article.post_id}
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                <div className="d-flex align-items-center p-1">
                  <div className="me-2">
                    <Link href="/user/user-my-article-i">
                      {auth.user_img ? (
                        <img
                          className="rounded-circle headshot-sm img-thumbnail"
                          src={auth.user_img}></img>
                      ) : (
                        <img
                          className="rounded-circle headshot-sm img-thumbnail"
                          src="/images/logo.png"></img>
                      )}
                    </Link>
                  </div>
                  <p className="middle me-2">
                    <a className="fs16b pt-3 text-dark" href="#">
                      {auth.nickname}
                    </a>
                  </p>
                  {/* <button className="btn btn-little ms-auto">追蹤</button> */}
                </div>

                <div className="d-flex align-items-center p-1">
                  <p className="icon-map me-1">
                    <a className="me-1 restaurant" href="#">
                      {article.restaurant_name}
                    </a>
                  </p>
                  <p className="me-1">
                    <a href="#" className="text-dark">
                      {article.restaurant_city}
                    </a>
                  </p>
                </div>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body overflow-x-hidden">
              {/* 使用 Carousel 顯示多個圖片 */}
              <Carousel
                activeIndex={activeIndex}
                onSelect={handleSelect}
                interval={null} // 停用自動播放
                className="image-radius">
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
              </span>
              <span className="middle">
                <a className="btn btn-sm btn-i" href="#a1">
                  <i className="fa-regular fa-comment"></i>
                </a>
              </span>
              <span className="middle">
                <Saved />
              </span>
            </div>
            <div className="ms-3 text-start">
              <div className="mb-3 ">
                {contentParagraphs.map((paragraph, index) => (
                  <div className="mb-3" key={index}>
                    {paragraph}
                  </div>
                ))}
              </div>
              <p className="icon-tag">
                <a className="ms-2 " href="#" style={{ color: "#666666" }}>
                  {article.food_tag_name}
                </a>
              </p>
              <p className="fs12 mb-2">{article.create_date.substr(0, 10)}</p>
            </div>
            <hr />
            {comments &&
              comments.map((v, i) => {
                console.log(v);
                return (
                  <div className="d-flex align-items-start ms-2" key={i}>
                    <div className="me-2">
                      <Link href="/user/user-my-article-i">
                        <img
                          className="rounded-circle headshot-sm img-thumbnail"
                          src={v.user_img}></img>
                      </Link>
                    </div>
                    <div className="me-auto mb-3">
                      <a className="fs16b text-dark" href="#">
                        {v.nickname}
                      </a>
                      <p>{v.content}</p>
                    </div>
                    <div>
                      <p className="fs12 mt-3 me-3">
                        {v.create_time.substr(0, 10)}
                      </p>
                    </div>
                  </div>
                );
              })}
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
        `}
      </style>
    </>
  );
}
