import React from "react";
import FollowButton from "../post/followbutton";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/hooks/AuthContext";

export default function WhoInfo() {
  const router = useRouter();
  const [whofollow, setWhoFollow] = useState([]);
  const [whoinfo, setWhoInfo] = useState([]);
  const { auth } = useContext(AuthContext);
  //由動態變數獲得user_id
  let { user_id } = router.query;

  //抓追蹤數
  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${user_id}/userfollow`)
      .then((r) => r.json())
      .then((r) => {
        setWhoFollow(r);
        // console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [user_id]);

  //抓別的使用者資料
  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${user_id}/userinfo`)
      .then((r) => r.json())
      .then((r) => {
        setWhoInfo(r);
        // console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [user_id]);

  //接收加入追蹤資料庫資料
  const [followed, setFollowed] = useState([]);
  useEffect(() => {
    if (auth && auth.token)
      fetch(process.env.API_SERVER + "/api/post/follow", {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
        .then((r) => r.json())
        .then((f) => {
          setFollowed(f);
        })
        .catch((ex) => console.log(ex));
  }, [auth]);

  return (
    <>
      {whoinfo.map((whoinfo, i) => {
        return (
          <main
            className="container bottom-line"
            style={{ paddingBottom: 40, marginTop: 250 }}
            key={i}>
            <div
              className="d-flex justify-content-around align-items-center mt-3 mb-1"
              style={{ paddingInline: 200 }}>
              <div className="d-flex flex-column ms-5 align-self-start mt-4">
                <div className="d-inline-flex align-items-center">
                  <h2 className="fw-bold pe-3">{whoinfo.nickname}</h2>
                  <FollowButton
                    ifFollow={
                      followed && followed?.includes(user_id) ? true : false
                    }
                    user_id={user_id}
                  />
                </div>
                <div className="mt-2 fw-semibold ps-4">
                  <span>{whofollow.length} 人</span>
                  <span>追蹤中</span>
                </div>
              </div>
              <div className="middle ms-5">
                <img
                  src={process.env.API_SERVER + `/img/${whoinfo.user_img}`}
                  alt="大頭照"
                  className="rounded-circle img-thumbnail headshot-big"
                />
              </div>
              <div className="d-flex ps-4" style={{ width: 300 }}>
                {whoinfo.self_intr}
              </div>
            </div>
          </main>
        );
      })}
    </>
  );
}
