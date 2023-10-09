/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import PostModal from "../post/post-modal";
import Link from "next/link";
import FollowButton from "../post/followbutton";
import Like from "../post/like";
import Saved from "../post/saved";

export default function Card({
  post_id,
  post_title,
  post_content,
  createTime,
  post_image_name,
  restaurant_city,
  restaurant_name,
  food_tag_names, // 注意這裡是一個數組
}) {
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
      />
      <div className="col mt-2">
        <div className="card h-100 overflow-hidden">
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <img
              src={`/images/post/${post_image_name}`}
              className="card-img"
              alt="..."
            />
          </a>
          <div className="card-body d-flex flex-column w-100">
            <div className="d-flex w-100 justify-content-end align-items-center fs14 grey mt-1">
              <span className="middle">
                <Like/>
                <span>1</span>
              </span>
              <span className="middle">
                <button className="btn btn-sm btn-i">
                  <i className="fa-regular fa-comment"></i>
                </button>
                <span>1</span>
              </span>
              <span className="middle">
                <Saved />
                <span>1</span>
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
                  <img
                    className="rounded-circle headshot-small img-thumbnail"
                    src="/images/logo.png"
                  ></img>
                </Link>
              </div>
              <p className="middle">
                <Link
                  className="fs16b pt-3 text-dark"
                  href="/user/user-my-article-i"
                >
                  會員暱稱
                </Link>
              </p>
              <FollowButton />
            </div>
            <span className="fs12 mt-2 mb-3">{formattedDate}</span>
          </div>
        </div>
      </div>
      {/* 將PostModal放在這個卡片內 */}
    </>
  );
}
