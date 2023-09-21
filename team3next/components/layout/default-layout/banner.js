import Link from "next/link";
import React from "react";

export default function Banner() {
  return (
    <>
      <div className="w-100 h400 d-flex align-items-end justify-content-center banner pb-5">
        <div className="w1440 d-flex">
          <div className="dropdown me-5">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown button
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#/">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#/">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#/">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 searchbar"
              type="search"
              placeholder="Search"
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
          .searchbar{
            width:655px;
            height:42px;
          }
          .banner{
            background-color: #ebd8a9;
          }
        `}
      </style>
    </>
  );
}
