import Link from "next/link";
import React from "react";
import LocationSelect from "../location-select";
import SearchBar from "../search-bar";

export default function Banner() {
  return (
    <>
      <div className="w-100 h400 d-flex align-items-end banner pb-5">
        <div className="container d-flex justify-content-center">
          <div className="dropdown ms-5 pe-4">
            {/* 下拉選單 */}
            <LocationSelect />
          </div>
          {/* 搜尋條 */}
          <SearchBar/>
        </div>
      </div>

      <style global jsx>
        {`
          .h400 {
            height: 400px;
          }
          .banner {
            background-image: url("./images/index-image.jpg");
            background-size: cover;
          }
        `}
      </style>
    </>
  );
}
