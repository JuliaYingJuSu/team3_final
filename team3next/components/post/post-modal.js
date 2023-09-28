import React from "react";

export default function PostModal() {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                <div className="d-flex align-items-center p-1">
                  <div className="me-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="51"
                      height="50"
                      viewBox="0 0 51 50"
                      fill="none"
                    >
                      <circle cx="25.5" cy="25" r="25" fill="#DC8B76" />
                    </svg>
                  </div>
                  <p className="middle me-2">
                    <a className="fs16b pt-3 text-dark" href="#">
                      會員暱稱
                    </a>
                  </p>
                  <button className="btn btn-little ms-auto">追蹤</button>
                </div>
                <div className="d-flex align-items-center p-1">
                  <p className="icon-map me-1">
                    <a className=" me-1">
                      Cin Cin Osteria請請義大利餐廳 (慶城店)
                    </a>
                  </p>
                  <p className="me-1">
                    <a href="#">台北市</a>
                  </p>
                  <p className="me-1">
                    <a href="#">松山區</a>
                  </p>
                </div>
              </h5>
              <button
                type="button"
                className="btn-close "
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div id="carouselExample" className="carousel slide mb-3">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="./images/post/3188.jpg"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="./images/post/3188.jpg"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="./images/post/ifood01.JPG"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
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
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div style={{ width: 600 }}>
                <div className="mb-3">
                  公司附近的義大利餐廳
                  <br />
                  餐廳的海鮮是從基隆港直接進貨非常新鮮
                  <br />
                  今天點了四道
                  <br />
                  酪梨醬辣味番茄莎莎海鮮披薩
                  <br />
                  義式烤本島現流海魚
                  <br />
                  烏魚子香蒜辣椒鯷魚炒白花椰
                  <br />
                  松露奶醬烤菇燉飯
                  <br />
                  每一道都好吃
                  <br />
                  在南京復興附近不知道要吃什麼的話可以來試試看唷
                  <br />
                </div>
              </div>
              <p className="icon-tag">
                <a className="ms-2" href="#">
                  義式
                </a>
                <span className="ms-2">|</span>
                <a className="ms-2" href="#">
                  午餐
                </a>
              </p>
              <div className="d-flex w-100 justify-content-start align-items-center fs14 grey mt-1">
                <span className="middle">
                  <button className="btn btn-sm btn-i">
                    <i className="fa-regular fa-heart"></i>
                  </button>
                  <span>1</span>
                </span>
                <span className="middle">
                  <button className="btn btn-sm btn-i">
                    <i className="fa-regular fa-comment"></i>
                  </button>
                  <span>1</span>
                </span>
                <span className="middle">
                  <button className="btn btn-sm btn-i">
                    <i className="far fa-bookmark"></i>
                  </button>
                  <span>1</span>
                </span>
              </div>
              <p className="fs12 mt-2 mb-2">2023.9.6</p>
              <hr />
              <div className="d-flex align-items-start">
                <div className="me-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="51"
                    height="50"
                    viewBox="0 0 51 50"
                    fill="none"
                  >
                    <circle cx="25.5" cy="25" r="25" fill="#DC8B76" />
                  </svg>
                </div>
                <div className="me-auto">
                  <a className="fs16b text-dark" href="#">
                    會員暱稱
                  </a>
                  <p>讚，感謝分享。</p>
                </div>
                <div>
                  <p className="fs12 mt-3">2023.9.6</p>
                </div>
              </div>
              <hr />
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="新增留言"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  發送
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
