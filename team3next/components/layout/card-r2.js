/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

export default function CardR2({
  restaurant_id,
  restaurant_name,
  restaurant_city,
  restaurant_address,
  restaurant_phone,
  restaurant_info,
}) {
  return (
    <>
      <div className="col mt-2" style={{ height: "790px" }}>
        <div className="card h-100 overflow-hidden">
          <img src="/images/post/3188.jpg" className="card-img" alt="..." />
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
              {restaurant_name}
            </h5>
            <div className="truncation max-height card-title w-100 grey fs16 mb-0 mt-3">
              {restaurant_info}
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
                  <div>{restaurant_address}</div>
                </div>
                <div className="d-flex">
                  <span className="pe-2">
                    <span className="icon-Call"></span>
                  </span>
                  <div>{restaurant_phone}</div>
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
