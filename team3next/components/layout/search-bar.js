import React from "react";

export default function SearchBar() {
  return (
    <>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2 searchbar ps-4"
          type="search"
          placeholder="輸入「早午餐」或「甜點」找尋美食!"
          aria-label="Search"></input>
        <span className="icon-search search-banner"></span>
      </form>

      <style jsx>
        {`
          .searchbar {
            width: 655px;
            height: 60px;
            border-radius: 40px;
          }
          .search-banner {
            position: relative;
            font-size: 24px;
          }
          .search-banner:before {
            position: absolute;
            right: 25px;
            top: 18px;
          }
        `}
      </style>
    </>
  );
}
