/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import PostModal from "../post/post-modal";
import Link from "next/link";
import FollowButton from "../post/followbutton";
import Like from "../post/like";
import Saved from "../post/saved";
import { useState, useContext, useEffect } from "react";
import AuthContext from "@/hooks/AuthContext";

export default function UserCard({
  usercard,
  // post_id,
  // post_title,
  // post_content,
  // createTime,
  // post_image_name,
  // restaurant_city,
  // restaurant_name,
  // food_tag_names, // 注意這裡是一個數組
  // user_id,
  // nickname,
  // user_img,
  // food_tag_name,
  favs,
  setFavs,
}) {
  const { auth, fav } = useContext(AuthContext);
  // const [favs, setFavs] = useState([]);
  const [saved, setSaved] = useState(false);

  // const [fav, setFav] = useState(false);

  useEffect(() => {
    if (auth && auth.token)
      fetch(process.env.API_SERVER + "/api/post/fav", {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
        .then((r) => r.json())
        .then((f) => {
          setFavs(f);
        })
        .catch((ex) => console.log(ex));
  }, [auth]);

  // useEffect(() => {
  //   if (user_id) {
  //     fetch("http://localhost:3002/api/post/fav", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         user_id: user_id,
  //         post_id: post_id,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((r) => r.json())
  //     .then((r) => {
  //       setSaved(r);
  //     });
  //   }
  // }, []);

  //使用 Set 來去重除重複的 food_tag_names 數組
  const uniqueFoodTags = [...new Set(usercard.food_tag_names)];

  return (
    <>
      <div className="col mt-2 my-3">
        <div className="card h-100 overflow-hidden">
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target={"#exampleModal" + usercard.post_id}>
            <img
              src={`/images/post/${usercard.post_image_name}`}
              className="card-img"
              alt="..."
            />
          </a>
          <div className="card-body d-flex flex-column w-100">
            <div className="d-flex w-100 justify-content-end align-items-center fs14 grey mt-1">
              <span className="middle">
                <Like />
                {/* <span>1</span> */}
              </span>
              <span className="middle">
                <button className="btn btn-sm btn-i">
                  <i className="fa-regular fa-comment"></i>
                </button>
                {/* <span>1</span> */}
              </span>
              <span className="middle">
                <Saved
                  ifSave={
                    favs && favs?.includes(usercard.post_id) ? true : false
                  }
                  favs={favs}
                  setFavs={setFavs}
                  post_id={usercard.post_id}
                />
                {/* <button
                  className="btn btn-sm btn-i"
                  onClick={() => {
                    setSaved(!saved);
                  }}
                >
                  <i className={saved ? "icon-mark-fill" : "icon-mark"}></i>
                </button> */}
              </span>
            </div>
            <div className="d-flex fs14 gap-2 mt-2">
              <a href="#" className="tag-i">
                {usercard.restaurant_city}
              </a>
              {/* 遍歷去重複後的 uniqueFoodTags 數組並呈現每個 food_tag_name */}
              {uniqueFoodTags.map((food_tag_id, index) => (
                <a href="#" className="tag-f" key={index}>
                  {food_tag_name}
                </a>
              ))}
            </div>
            <h6 className="card-title w-100 mt-3 fw-bolder text-start">
              {usercard.post_title}
            </h6>
            <div className="d-flex align-items-center w-100">
              <div className="pe-2">
                <Link href="/user/user-my-article-i">
                  {/* 三元運算還是不成功，要如何才能使突變薯哥，如果大頭照沒有上傳的時候 */}
                  {usercard.user_img ? (
                    <img
                      className="rounded-circle headshot-small img-thumbnail"
                      src={process.env.API_SERVER + `/img/${usercard.user_img}`} // 顯示用戶頭像
                      alt="大頭照"
                    />
                  ) : (
                    <img
                      className="rounded-circle headshot-small img-thumbnail"
                      src="/images/logo/png"
                      alt="大頭照"
                    />
                  )}
                </Link>
              </div>
              <p className="middle">
                <Link
                  className="fs16b pt-3 text-dark"
                  href="/user/user-my-article-i">
                  {usercard.nickname}
                </Link>
              </p>
              <FollowButton ifFollow={false} />
            </div>
            <span className="fs12 mt-2 mb-3 text-start">{usercard.createTime.substr(0, 10)}</span>
          </div>
        </div>
      </div>
    </>
  );
}
