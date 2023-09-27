/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "@/components/user/user-information.module.scss";

export default function UserSCard() {
  return (
    <>
      <div className={Styles.authorCard}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex ps-4">
            <div className="pe-2">
              <img
                className="rounded-circle headshot-small img-thumbnail object-fit-cover"
                src="/images/logo.png"></img>
            </div>
            <div className="middle">
              <a className="fs16b text-dark" href="#">
                會員暱稱
              </a>
            </div>
          </div>
          <div className="d-flex pe-4">
            <button className="btn btn-little">追蹤</button>
          </div>
        </div>
      </div>
    </>
  );
}
