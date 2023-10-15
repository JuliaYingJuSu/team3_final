import Link from "next/link";
import React from "react";
import Like from "./like";
import Saved from "./saved";
import AuthContext from "@/hooks/AuthContext";
import { useContext,useState,useEffect } from "react";

export default function MyArticle({article}) {
  const { auth } = useContext(AuthContext);
  const [myarticle, setMyArticle] = useState([]);
  console.log({article});

  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${auth.user_id}/my-article2`)
      .then((r) => r.json())
      .then((r) => {
        setMyArticle(r);
        console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [auth.user_id]);
  
  return (
    <>
        <div
          className="modal fade modal-lg"
          id={"exampleModal" + article.post_id}
          tabindex="-1"
          aria-labelledby={"exampleModalLabel" + article.post_id}
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
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
              <div className="modal-body">
                <div id="carouselExampleIndicators" className="carousel slide">
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="3"
                      aria-label="Slide 4"></button>
                  </div>
                  <div className="carousel-inner image-radius">
                    <div className="carousel-item active">
                      <img
                        src="/images/post/cincin1.jpg"
                        className="d-block w-100 object-fit-cover"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="/images/post/cincin2.jpg"
                        className="d-block  object-fit-cover"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="/images/post/cincin3.jpg"
                        className="d-block  object-fit-cover"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="/images/post/cincin4.jpg"
                        className="d-block  object-fit-cover"
                        alt="..."
                      />
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
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
              <div className="ms-3">
                <div className="mb-3">
                  {article.post_content}
                </div>
                <p className="icon-tag">
                  <a className="ms-2 " href="#" style={{ color: "#666666" }}>
                    {article.food_tag_name}
                  </a>
                </p>
                <p className="fs12 mb-2">2023.9.6</p>
              </div>
              <hr />
              <div className="d-flex align-items-start ms-2">
                <div className="me-2">
                  <Link href="/user/user-my-article-i">
                    <img
                      className="rounded-circle headshot-sm img-thumbnail"
                      src="/images/logo.png"></img>
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
              <div className="container input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="新增留言"
                  aria-label="message"
                  aria-describedby="button-addon2"
                  id="a1"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2">
                  發送
                </button>
              </div>
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
