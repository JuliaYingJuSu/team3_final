import React from "react";
import FollowButton from "../post/followbutton";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function WhoInfo() {
  const router = useRouter();
  const [whoinfo, setWhoInfo] = useState([]);
  //由動態變數獲得user_id
  const { user_id } = router.query;

  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${user_id}/userInfoImg`)
      .then((r) => r.json())
      .then((r) => {
        setWhoInfo(r);
        // console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [user_id]);

  return (
    <>
      <main
        className="container bottom-line"
        style={{ paddingBottom: 40, marginTop: 250 }}>
        <div
          className="d-flex justify-content-around align-items-center mt-3 mb-1"
          style={{ paddingInline: 200 }}>
          <div className="d-flex flex-column ms-5 align-self-start mt-4">
            <div className="d-inline-flex align-items-center">
              <h2 className="fw-bold pe-3">暱稱</h2>
              <FollowButton />
              {/* <button className="btn btn-follow">
                  追蹤中
                </button> */}
            </div>
            <div className="mt-2 fw-semibold ps-4">
              <span>110人</span>
              <span>追蹤中</span>
            </div>
          </div>
          <div className="middle ms-5">
            <div className="rounded-circle img-thumbnail headshot-big position-relative"></div>
          </div>
          <div className="d-flex ps-4" style={{ width: 300 }}>
            用美食記錄生活點滴… 堆疊起美好的記憶…🚶‍♀️
            所有的不期而遇💕都是美好的開始 喜歡黑咖啡☕的純粹美好💕
            用美食記錄生活點滴… 堆疊起美好的記憶…🚶‍♀️
            所有的不期而遇💕都是美好的開始 喜歡黑咖啡☕的純粹美好💕
          </div>
        </div>
      </main>
    </>
  );
}
