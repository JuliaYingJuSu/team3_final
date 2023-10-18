/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Styles from "@/components/user/user-information.module.scss";
import UserArticle from "../post/user-article";

export default function WhoPictureCard({ userinfo }) {
  return (
    <>
      <p>
        <a
          type="button"
          className="position-relative"
          data-bs-toggle="modal"
          data-bs-target={"#exampleModal" + userinfo.post_id}>
          <img
            src={`/images/post/${userinfo.post_image_name}`}
            className={Styles.imgStyle}></img>
          <span
            className="icon-multi position-absolute z-1 fs-4 top-50"
            style={{ right: 20, marginTop: 155 }}></span>
        </a>
      </p>
      <div>
      <UserArticle userinfo={userinfo}></UserArticle>
      </div>
    </>
  );
}
