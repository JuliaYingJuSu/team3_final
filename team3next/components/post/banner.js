import React from "react";
import { useState } from "react";

export default function Banner({
  selectedCity,
  setSelectedCity,
  selectedStyle,
  setSelectedStyle,
  searchKeyword,
  setSearchKeyword,
}) {
  const handleCityChange = (e) => {
    setSelectedCity(e.target.innerText);
  };

  const handleTagSelect = (e) => {
    setSelectedStyle(e.target.innerText);
  };

  const handleSearch = (e) => {
    setDisplayData(e.target.innerText);
  };

  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="dropdown ms-5 pe-4">
          {/* 下拉選單 */}
          <button
            className="btn dropdown-toggle btn-middle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            <span className="icon-map fs-5 pe-2 fw-bold"></span>
            {selectedCity || "不分地區"}
          </button>
          <ul className="dropdown-menu">
            <li className="dropdown-item" onClick={handleCityChange}>
              台北市
            </li>
            <li className="dropdown-item" onClick={handleCityChange}>
              新北市
            </li>
            <li className="dropdown-item" onClick={handleCityChange}>
              基隆市
            </li>
            <li className="dropdown-item" onClick={handleCityChange}>
              高雄市
            </li>
          </ul>
        </div>
      </div>
      <div className="container d-flex justify-content-center">
        {/* 搜尋條 */}
        <div className="row">
          <div className="col">
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2 searchbar ps-4"
                type="search"
                placeholder=""
                aria-label="Search"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}></input>
              <span className="icon-search search-banner"></span>
            </form>
          </div>
        </div>
      </div>
      <div className=" container d-flex justify-content-center mb-3">
        {/* 搜尋條 */}
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}>
          台式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}>
          中式
        </button>
        <button
          type="button"
          className="btn  btn-sm tags"
          onClick={handleTagSelect}>
          日式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}>
          韓式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}>
          港式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}>
          美式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}>
          義式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}>
          越式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}>
          西式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}>
          泰式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}>
          早餐
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}>
          午餐
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}>
          晚餐
        </button>
      </div>

      <style jsx>
        {`
          .searchbar {
            width: 655px;
            height: 60px;
            border-radius: 40px;
            margin: 20px 0px;
          }
          .search-banner {
            position: absolute;
            font-size: 24px;
            margin: 20px 0px;
            right:640px;
          }
          .search-banner:before {
            position: absolute;
            right: 25px;
            top: 18px;
          }
          .tags {
            border-radius: 40px;
            border: 0.5px solid #666666;
            margin-right: 5px;
            color: #666666;
            font-size: 16px;
          }
          @media screen and (max-width: 500px) {
            .tags {
              display: none;
            }
          }
          @media screen and (max-width: 500px) {
            .searchbar {
              display: flex;
              width: 360px;
              height: 40px;
              padding: 0px 5px;
              flex-direction: column;
              align-items: center;
              gap: 8px;
            }
            .search-banner:before {
              position: absolute;
              right: 25px;
              top: 9px;
            }
          }
        `}
      </style>
    </>
  );
}
