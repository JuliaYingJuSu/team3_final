/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Styles from "@/components/user/user-information.module.scss";
import MyArticle from "../post/my-article";

export default function UserPictureCard() {
  return (
    <>
      <div className="position-relative">
        <a
          type="button"
          className="position-relative"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal">
          <img src="/images/post/ifood01.jpg" className={Styles.imgStyle}></img>
          <span
            className="icon-multi position-absolute z-1 fs-4 top-50"
            style={{ right: 20, marginTop: 155 }}></span>
        </a>
        <div
          className="dropstart position-absolute btn-group"
          style={{ right: 15,marginTop: 15 }}>
          <button
            type="button"
            className="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            <i className="fas fa-ellipsis-v fs-4 grey"></i>
          </button>
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item fs16b" href="#">
                修改文章
              </a>
            </li>
            <li>
              <a className="dropdown-item fs16b" href="#">
                刪除文章
              </a>
            </li>
          </ul>
        </div>
        <span>
          <MyArticle></MyArticle>
        </span>
      </div>
      <style jsx>{`
        .dropdown-toggle::before {
          display: none;
        }
      `}</style>
    </>
  );
}
