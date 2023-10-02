/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Styles from "@/components/user/user-information.module.scss";
import MyArticle from "../post/my-article";

export default function UserPictureCard() {
  return (
    <>
      <p>
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
        <span>
        <MyArticle></MyArticle>
      </span>
      </p>
    </>
  );
}
