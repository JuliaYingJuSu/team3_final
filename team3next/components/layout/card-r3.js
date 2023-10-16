/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

export default function CardR3({
  restaurant_id,
  restaurant_name,
  restaurant_city,
  restaurant_district,
  restaurant_address,
  restaurant_phone,
  restaurant_info,
  r_img_route,
  food_tag_names,
  restaurant_opening,
}) {
  const uniqueFoodTags = [...new Set(food_tag_names)];
  const avoidSplit = restaurant_info.split("\\n").map((v) => {
    return <span>{v}</span>;
  });
  const openingShort = restaurant_opening.split("\\n")[0];
  return (
    <>
      <div className="mt-5 mb-4 container d-flex justify-content-center">
        <div className="card3 overflow-hidden row">
          <div className="col-12 col-xl-5" style={{ padding: "0px" }}>
            <img
              src={`/images/book/${r_img_route}`}
              className="card3-img"
              alt="..."
            />
          </div>
          <div className="card3-body d-flex flex-column col-xl-7">
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
              {avoidSplit}
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
                  <div>{openingShort}</div>
                </div>
              </div>
              <Link
                href={`/book/${restaurant_id}`}
                className="btn btn-little fs16 ms-auto align-self-end"
              >
                我要訂位 →
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .max-height {
            max-height: 72px;
            overflow: hidden;
          }
          .truncation {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            max-width: 100%;
          }
          .card3 {
            width: 80%;
            border-radius: 10px;
            background: #fff;
            box-shadow: 8px 10px 20px 0px rgba(142, 142, 142, 0.25);
          }
          .card3-img {
            max-height: 330px;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .card3-body {
            padding: 30px;
          }
        `}
      </style>
    </>
  );
}
