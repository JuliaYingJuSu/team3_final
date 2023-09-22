import Link from "next/link";
import React from "react";

export default function Banner() {
  return (
    <>
      <div className="w-100 h400 d-flex align-items-end justify-content-center banner pb-5">
        <div className="w1440 d-flex">
          <div className="dropdown me-5 mb-4">
            <button
              className="btn dropdown-toggle btn-big"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              不分地區
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
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 searchbar ps-4"
              type="search"
              placeholder="輸入「早午餐」或「甜點」找尋美食!"
              aria-label="Search"
            />
          </form>
        </div>
      </div>

      <style global jsx>
        {`
          .h400 {
            height: 400px;
          }
          .searchbar {
            width: 655px;
            height: 60px;
            border-radius: 40px;
          }
          .banner {
            background-color: #b6705e;
          }
        `}
      </style>
    </>
  );
}
