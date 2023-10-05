/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "@/components/user/user-information.module.scss";
import Link from "next/link";
import FollowButton from "../post/followbutton";

export default function WhoSCard() {
  const [follow, setFollow] = useState(false);
  return (
    <>
      <div className={Styles.authorCard}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex ps-4">
            <div className="pe-3">
              <Link href="/user/user-my-article-i">
                <img
                  className="rounded-circle img-thumbnail"
                  src="/images/logo.png"
                  style={{ height: 60, width: 60, objectFit: "cover" }}></img>
              </Link>
            </div>
            <div className="middle">
              <Link className="fs16b text-dark" href="/user/user-my-article-i">
                會員暱稱
              </Link>
            </div>
          </div>
          <div className="d-flex pe-4">
            <button
              className="btn btn-little ms-auto"
              onClick={() => {
                setFollow(!follow);
              }}>
              {follow ? "追蹤" : "追蹤中"}
            </button>
            {/* <button className="btn btn-little">追蹤中</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
