/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "@/components/user/user-information.module.scss";
import Link from "next/link";

export default function UserSCard() {
  return (
    <>
      <div className={Styles.authorCard}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex ps-4">
            <div className="pe-3">
              <Link href="#">
                <img
                  className="rounded-circle img-thumbnail"
                  src="/images/logo.png"
                  style={{ height: 60, width: 60, objectFit: "cover" }}></img>
              </Link>
            </div>
            <div className="middle">
              <Link className="fs16b text-dark" href="#">
                會員暱稱
              </Link>
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
