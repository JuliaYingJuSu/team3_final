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

export default function Card({
  post_id,
  post_title,
  post_content,
  createTime,
  post_image_name,
  restaurant_city,
  restaurant_name,
  food_tag_names, // 注意這裡是一個數組
  user_id,
  nickname,
  user_img,
  food_tag_name,
  favs,
  setFavs,
  followed,
  setFollowed,
  likes,
  setLikes,
}) {
  const { auth } = useContext(AuthContext);

  // 使用 Set 來去重除重複的 food_tag_names 數組
  const uniqueFoodTags = [...new Set(food_tag_names)];
  // 創建日期對象
  const createDate = new Date(createTime);

  // 獲取日期部分（年、月、日）
  const year = createDate.getFullYear();
  const month = (createDate.getMonth() + 1).toString().padStart(2, "0"); // +1 因為月份從 0 開始，padStart 用於補零
  const day = createDate.getDate().toString().padStart(2, "0");

  // 格式化為 "YYYY.MM.DD" 格式
  const formattedDate = `${year}.${month}.${day}`;
// if(post_id==40){console.log({likes:likes});console.log({fromCard:favs})}
  return (
    <>
      <PostModal
        key={post_id}
        post_id={post_id}
        post_title={post_title}
        post_content={post_content}
        createTime={createTime}
        post_image_name={post_image_name}
        restaurant_city={restaurant_city}
        restaurant_name={restaurant_name}
        food_tag_names={uniqueFoodTags} // 傳遞去重複後的數組
        user_id={user_id}
        nickname={nickname}
        user_img={user_img}
        food_tag_name={food_tag_name}
        favs={favs}
        setFavs={setFavs}
        followed={followed}
        setFollowed={setFollowed}
        likes={likes}
        setLikes={setLikes}
      />
      <div className="col mt-2 my-3">
        <div className="card h-100 overflow-hidden">
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target={"#exampleModal" + post_id}
          >
            <img
              src={`http://localhost:3002/img/${post_image_name}`}
              className="card-img"
              alt="..."
            />
          </a>
          <div className="card-body d-flex flex-column w-100">
            <div className="d-flex w-100 justify-content-end align-items-center fs14 grey mt-1">
              <span className="middle">
                <Like 
                  ifLike={likes && likes?.includes(post_id) ? true : false}
                  post_id={post_id}
                />
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
                  ifSave={favs && (favs?.includes(post_id)) ? true : false}
                  post_id={post_id}
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
                {restaurant_city}
              </a>
              {/* 遍歷去重複後的 uniqueFoodTags 數組並呈現每個 food_tag_name */}
              {uniqueFoodTags.map((foodTag, index) => (
                <a href="#" className="tag-f" key={index}>
                  {foodTag}
                </a>
              ))}
            </div>
            <h6 className="card-title w-100 mt-3 fw-bolder">{post_title}</h6>
            <div className="d-flex align-items-center w-100">
              <div className="pe-2">
                <Link href="/user/user-my-article-i">
                  {/* 三元運算還是不成功，要如何才能使突變薯哥，如果大頭照沒有上傳的時候 */}
                  {user_img ? (
                    <img
                      className="rounded-circle headshot-small img-thumbnail"
                      src={`http://localhost:3002/img/${user_img}`} // 顯示用戶頭像
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
                  href="/user/user-my-article-i"
                >
                  {nickname}
                </Link>
              </p>
              <FollowButton ifFollow={followed && (followed?.includes(user_id)) ? true : false}
                  user_id={user_id}/>
            </div>
            <span className="fs12 mt-2 mb-3">{formattedDate}</span>
          </div>
        </div>
      </div>
    </>
  );
}
