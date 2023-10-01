/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import PostModal from "../post/post-modal";
import AddPost from "../post/add-post";


export default function Card() {
  return (
    <>
    {/* <PostModal/> */}
    <AddPost/>
      <div className="col mt-2">
        <div className="card h-100 overflow-hidden">
          <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src="/images/post/3188.jpg" className="card-img" alt="..." />
          </a>
          <div className="card-body d-flex flex-column w-100">
            <div className="d-flex w-100 justify-content-end align-items-center fs14 grey mt-1">
              <span className="middle">
                <button className="btn btn-sm btn-i">
                  <i className="fa-regular fa-heart"></i>
                </button>
                <span>1</span>
              </span>
              <span className="middle">
                <button className="btn btn-sm btn-i">
                  <i className="fa-regular fa-comment"></i>
                </button>
                <span>1</span>
              </span>
              <span className="middle">
                <button className="btn btn-sm btn-i">
                  <i className="far fa-bookmark"></i>
                </button>
                <span>1</span>
              </span>
            </div>
            <div className="d-flex fs14 gap-2 mt-2">
              <a href="#" className="tag-i">
                台北市
              </a>
              <a href="#" className="tag-f">
                早午餐
              </a>
              <a href="#" className="tag-f">
                咖啡廳
              </a>
              <a href="#" className="tag-f">
                美式
              </a>
            </div>
            <h6 className="card-title w-100 mt-3 fw-bolder">
              朋友說這是台北最好吃的滷肉飯
            </h6>
            <div className="d-flex align-items-center w-100">
              <div className="pe-2">
                <img
                  className="rounded-circle headshot-small img-thumbnail"
                  src="/images/logo.png"></img>
              </div>
              <p className="middle">
                <a className="fs16b pt-3 text-dark" href="#">
                  會員暱稱
                </a>
              </p>
              <button className="btn btn-little ms-auto">追蹤</button>
            </div>
            <span className="fs12 mt-2 mb-3">2023.9.6</span>
          </div>
        </div>
      </div>
    </>
  );
}
