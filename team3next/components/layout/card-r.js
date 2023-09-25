/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function CardR() {
  return (
    <>
      <div className="col mt-2">
        <div className="card-r h-100 overflow-hidden">
          <img src="./images/post/3188.jpg" className="card-img" alt="..." />
          <div className="card-body d-flex flex-column w-100 my-3">
            <div className="d-flex fs14 gap-2 mt-2">
              <a href="#" className="tag-i">
                台北市
              </a>
              <a href="#" className="tag-f">
                早午餐
              </a>
              <a href="#" className="tag-f">
                咖啡廳
              </a>
              <a href="#" className="tag-f">
                美式
              </a>
            </div>
            <h5 className="card-title w-100 mt-3">牧羊人義式料理工坊</h5>
            <div className="fs16g mt-3">
              <div>
                義大利籍顧問傳授的「經典傳統」為基底，融合日籍主廚傳授的「細膩和心」來提味，每一步均遵循義大利正統料理方式，製作道地的義式美味。
              </div>
              <p className="mt-2">
                <Link href={"/"} className="text-black fw-bold">
                  更多內容....
                </Link>
              </p>
            </div>
            <div className="d-flex mt-1 w-100 mb-4 justify-content-between">
              <div className="d-flex flex-column">
                <div>
                  <span className="pe-2">
                    <span className="icon-map fw-bold"></span>
                  </span>
                  <span>
                    <span className="fs16b">700台南市中西區尊王路140號</span>
                  </span>
                </div>
                <div>
                  <span className="pe-2">
                    <span className="icon-Call fw-bold"></span>
                  </span>
                  <span>
                    <span className="fs16b">06 221 0699</span>
                  </span>
                </div>
                <div>
                  <span className="pe-2">
                    <span className="icon-bell fw-bold"></span>
                  </span>
                  <span>
                    <span className="fs-6 fw-semibold text-black-75">每週一、週二休息</span>
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-end">
                <button className="btn btn-big ms-auto middle">
                  我要訂位<i class="fa-solid fa-arrow-right ps-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
