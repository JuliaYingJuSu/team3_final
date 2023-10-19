/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "@/components/user/user-information.module.scss";
import Link from "next/link";
import FollowButton from "../post/followbutton";


export default function UserSCard({author}) {
  return (
    <>
      <div className={Styles.authorCard}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex ps-4">
            <div className="pe-3">
              <Link href={`/user/${author.user_id}/user-my-article-i/`}>
                <img
                  className="rounded-circle img-thumbnail"
                  src={process.env.API_SERVER + `/img/${author.user_img}`}
                  style={{ height: 70, width: 70, objectFit: "cover" }}></img>
              </Link>
            </div>
            <div className="middle">
              <Link className="fs16b text-dark" href={`/user/${author.user_id}/user-my-article-i/`}>
                {author.nickname}
              </Link>
            </div>
          </div>
          <div className="d-flex pe-4">
          <FollowButton/>
            {/* <button className="btn btn-little">追蹤中</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
