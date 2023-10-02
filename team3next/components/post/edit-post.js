import React from "react";

export default function EditPost() {
  return (
    <>
      <div className="container">
        <div
          className="d-flex justify-content-center mb-3"
          style={{ heigh: 300 }}
        >
          <div id="carouselExample" className="carousel slide mb-3">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="/images/post/3188.jpg"
                      className="d-block w-100 "
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="/images/post/3188.jpg"
                      className="d-block w-100 "
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="/images/post/ifood01.JPG"
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
        </div>
        <form action="">
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile02"
              multiple
            />
            <label className="input-group-text" for="inputGroupFile02">
              上傳圖片
            </label>
          </div>
          <div className="input-group mb-3">
            <span
              className="input-group-text icon-edit"
              id="basic-addon1"
            ></span>
            <input
              type="text"
              className="form-control"
              placeholder="選擇多元的義大利餐廳"
              aria-label="Posttitle"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text icon-map"></span>
            <input
              type="text"
              className="form-control"
              placeholder="Cin Cin Osteria請請義大利餐廳 (慶城店)"
              aria-label="Postlocation"
              aria-describedby="button-addon2"
            />
            {/* <button
              className="icon-arrow-s-right btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            ></button> */}
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text icon-tag"></span>
            <input
              type="text"
              className="form-control"
              placeholder="義式、午餐、晚餐"
              aria-label="Posttag"
              aria-describedby="button-addon3"
            />
            <button
              className="btn btn-outline-secondary icon-arrow-s-right"
              type="button"
              id="button-addon3"
            ></button>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text icon-edit"></span>
            <textarea
              className="form-control"
              aria-label="With textarea"
              placeholder="公司附近的義大利餐廳/n
                          餐廳的海鮮是從基隆港直接進貨非常新鮮
                          今天點了四道
                          酪梨醬辣味番茄莎莎海鮮披薩
                          義式烤本島現流海魚
                          烏魚子香蒜辣椒鯷魚炒白花椰
                          松露奶醬烤菇燉飯
                          每一道都好吃
                          在南京復興附近不知道要吃什麼的話可以來試試看唷"
              rows="10"
            ></textarea>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn btn-big">
              修改文章
            </button>
          </div>
        </form>
      </div>
      <style jsx>
        {`
          .btn {
            color: #ae4818;
          }
        `}
      </style>
    </>
  );
}
