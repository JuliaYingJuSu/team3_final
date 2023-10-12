/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

export default function CardR2({
  restaurant_id,
  restaurant_name,
  restaurant_city,
  restaurant_district,
  restaurant_address,
  restaurant_phone,
  restaurant_info,
  r_img_route,
  food_tag_names,
}) {
  const uniqueFoodTags = [...new Set(food_tag_names)];
  return (
    <>
      <div className="col mt-2" style={{ height: "780px" }}>
        <div className="card h-100 overflow-hidden">
          <img
            src={`/images/book/${r_img_route}`}
            className="card-img"
            alt="..."
          />
          <div className="card-body d-flex flex-column w-100">
            <div className="w-100" style={{ height: "25px" }}></div>
            <div className="d-flex fs14 gap-2">
              <a href="#" className="tag-i">
                {restaurant_city}
              </a>
              {uniqueFoodTags.map((foodTag, index) => (
                <a href="#" className="tag-f" key={index}>
                  {foodTag}
                </a>
              ))}
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
            <div className="fs16b">
              <div className="d-flex">
                <span className="pe-2">
                  <span className="icon-map"></span>
                </span>
                <div>
                  {restaurant_city}
                  {restaurant_district}
                  {restaurant_address}
                </div>
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
                <Link
                  href={`/book/${restaurant_id}`}
                  className="btn btn-little fs16 ms-auto align-self-end"
                >
                  訂位
                </Link>
              </div>
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
