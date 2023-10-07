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
  food_tag_name,
}) {
  

  return (
    <>
    
      <PostModal
        key={post_id}
        post_title={post_title}
        post_content={post_content}
        createTime={createTime}
        post_image_name={post_image_name}
        restaurant_city={restaurant_city}
        restaurant_name={restaurant_name}
        food_tag_name={food_tag_name}
      />
      <div className="col mt-2">
        <div className="card h-100 overflow-hidden">
          <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src="/images/post/3188.jpg" className="card-img" alt="..." />
          </a>
          <div className="card-body d-flex flex-column w-100">
            <div className="d-flex w-100 justify-content-end align-items-center fs14 grey mt-1">
              <span className="middle">
                <Like />
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
              <a href="#" className="tag-f">
                {food_tag_name}
              </a>
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
            <span className="fs12 mt-2 mb-3">{createTime}</span>
          </div>
        </div>
      </div>
    </>
  );
}
