import React from "react";

export default function Banner() {
  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="dropdown ms-5 pe-4">
          {/* 下拉選單 */}
          <button
            className="btn dropdown-toggle btn-middle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="icon-map fs-5 pe-2 fw-bold"></span>
            台北市
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#/">
                台北市
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#/">
                桃園市
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#/">
                高雄市
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container d-flex justify-content-center">
        {/* 搜尋條 */}
        <div className="row">
          <div className="col">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2 searchbar ps-4"
                type="search"
                placeholder="義式"
                aria-label="Search"
              ></input>
              <span className="icon-search search-banner"></span>
            </form>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-center mb-3">
          {/* 搜尋條 */}
          <button type="button" className="btn btn-sm tags">
            台式
          </button>
          <button type="button" className="btn btn-sm tags">
            中式
          </button>
          <button type="button" className="btn  btn-sm tags">
            日式
          </button>
          <button type="button" className="btn btn-sm tags">
            韓式
          </button>
          <button type="button" className="btn btn-sm tags">
            港式
          </button>
          <button type="button" className="btn btn-sm tags">
            美式
          </button>
          <button type="button" className="btn btn-sm tags">
            義式
          </button>
          <button type="button" className="btn btn-sm tags">
            法式
          </button>
          <button type="button" className="btn btn-sm tags">
            西式
          </button>
          <button type="button" className="btn btn-sm tags">
            泰式
          </button>
          <button type="button" className="btn btn-sm tags">
            越式
          </button>
          <button type="button" className="btn btn-sm tags">
            早餐
          </button>
          <button type="button" className="btn btn-sm tags">
            早午餐
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
            position: relative;
            font-size: 24px;
            margin: 20px 0px;
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
              display:none;
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
