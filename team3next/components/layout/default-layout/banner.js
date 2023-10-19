import Link from "next/link";
import React from "react";
import LocationSelect from "../location-select";
import SearchBar from "../search-bar";

export default function Banner(
  {
    selectedCity,
    setSelectedCity,
    searchKeyword, 
    setSearchKeyword
  }
) {
  return (
    <>
      <div className="w-100 h650 d-flex align-items-end banner pdb-50">
        <div className="container d-flex justify-content-center">
          <div className="dropdown ms-5 pe-4">
            {/* 下拉選單 */}
            <LocationSelect 
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          </div>
          {/* 搜尋條 */}
          <SearchBar 
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
        </div>
      </div>

      <style global jsx>
        {`
          .h650 {
            height: 650px;
          }
          .banner {
            background-image: url("./images/index-image.jpg");
            background-size: cover;
          }
          .pdb-50{
            padding-bottom:50px;
          }
          @media screen and (max-width: 500px) {
            .banner {
              height:50px;
              background-image:none;
            }
            .pdb-50{
              padding-bottom:5px;
            }
          }
        `}
      </style>
    </>
  );
}
