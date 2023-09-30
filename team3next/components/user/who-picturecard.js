/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Styles from "@/components/user/user-information.module.scss";

export default function WhoPictureCard() {
  return (
    <>
      <p>
        <a href="#" className="position-relative">
          <img src="/images/post/ifood01.jpg" className={Styles.imgStyle}></img>
          <button
            type="button"
            class="btn-close position-absolute z-1 fs-4"
            aria-label="Close"
            style={{ right: 12, marginTop: 15 }}></button>
          <span
            className="icon-multi position-absolute z-1 fs-4 top-50"
            style={{ right: 20, marginTop: 155 }}></span>
        </a>
      </p>
    </>
  );
}
