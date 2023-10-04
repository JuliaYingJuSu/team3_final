/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

export default function CardR2() {
  return (
    <>
      <div className="col mt-2" style={{ height: "790px" }}>
        <div className="card h-100 overflow-hidden">
          <img src="./images/post/3188.jpg" className="card-img" alt="..." />
          <div className="card-body d-flex flex-column w-100">
            <div className="w-100 mt-1" style={{ height: "31px" }}></div>
            <div className="d-flex fs14 gap-2 mt-2">
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
            <div className="truncation max-height card-title w-100 grey fs16 mb-0 mt-3">
              義大利籍顧問傳授的「經典傳統」為基底，融合日籍主廚傳授的「細膩和心」來提味，每一步均遵循義大利正統料理方式，製作道地的義式美味。每一步均遵循義大利正統料理方式，製作道地的義式美味。
              義大利窯烤披薩除了經典的義大利款，還融入倫敦的英式口味，非常道地的歐洲風味，也讓Solo
              Pizza Napoletana一舉入榜榮獲全亞洲 50 大披薩的殊榮。
            </div>
            <div
              className="card-title w-100 fs16b mb-0 mt-2"
              style={{ height: "80px" }}
            >
              更多內容...
            </div>
            <div className="d-flex w-100">
              <div className="fs16b">
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
              <Link
                href="/book/restaurant"
                className="btn btn-little fs16 ms-auto align-self-end"
              >
                訂位
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .max-height {
          max-height: 120px;
          overflow: hidden;
        }
        .truncation {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          max-width: 100%;
        }
      `}</style>
    </>
  );
}
