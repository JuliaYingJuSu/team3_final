/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function CardR3() {
  return (
    <>
      <div className="mt-5 mb-4 container d-flex justify-content-center">
        <div className="card3 d-flex">
          <div>
            <img src="../images/book/card3-2.png" className="r-img" alt="..." />
          </div>
          <div className="card-body">
            <div className="d-flex fs14 gap-2">
              <a href="#" className="tag-i">
                {" "}
                台南市{" "}
              </a>
              <a href="#" className="tag-f">
                {" "}
                午餐{" "}
              </a>
              <a href="#" className="tag-f">
                {" "}
                晚餐{" "}
              </a>
              <a href="#" className="tag-f">
                {" "}
                義式{" "}
              </a>
            </div>
            <h5 className="card-title w-100 mt-3 mb-0 fw-bolder">
              牧羊人義式料理工坊
            </h5>
            <div className="card-title w-100 grey fs16 mb-0 mt-3">
              義大利籍顧問傳授的「經典傳統」為基底，融合日籍主廚傳授的「細膩和心」來提味，每一步均遵循義大利正統料理方式，製作道地的義式美味。每一步均遵循義大利正統料理方式，製作道地的義式美味。
            </div>
            <div className="d-flex w-100">
              <div className="fs16b">
                <div className="card-title w-100 fs16b mb-0 mt-2 mb-3">
                  更多內容...
                </div>
                <div className="d-flex">
                  <span className="pe-2">
                    <span className="icon-map"></span>
                  </span>
                  <div>台南市中西區尊王路140號</div>
                </div>
                <div className="d-flex">
                  <span className="pe-2">
                    <span className="icon-Call"></span>
                  </span>
                  <div>06 221 0699</div>
                </div>
                <div className="d-flex">
                  <span className="pe-2">
                    <span className="icon-calender"></span>
                  </span>
                  <div>每週一、週二休息</div>
                </div>
              </div>
              <button className="btn btn-little fs16 ms-auto align-self-end">
                我要訂位 →
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .card3 {
            height: 330px;
            width: 80%;
            border-radius: 10px;
            background: #fff;
            box-shadow: 8px 10px 20px 0px rgba(142, 142, 142, 0.25);
          }
          .card-body {
            padding: 30px;
            width: 60%;
          }
          .r-img {
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </>
  );
}
