/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";

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
            <h6 className="card-title w-100 mt-3 mb-0">牧羊人義式料理工坊</h6>
            <div className="card-title w-100 grey fs16 mb-0 mt-3">
              義大利籍顧問傳授的「經典傳統」為基底，融合日籍主廚傳授的「細膩和心」來提味，每一步均遵循義大利正統料理方式，製作道地的義式美味。每一步均遵循義大利正統料理方式，製作道地的義式美味。
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
              <button className="btn btn-little fs16 ms-auto align-self-end">
                追蹤
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
