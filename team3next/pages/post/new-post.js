import AddPost from "@/components/post/add-post";
import React from "react";
import Navbar from "@/components/layout/default-layout/navbar-main";
import Footer from "@/components/layout/default-layout/footer";
import UserInfo from "@/components/user/user-info";
import UserNavbar from "@/components/user/user-navbar";
import Link from "next/link";

export default function NewPost() {
  return (
    <>
      <Navbar />
      <UserInfo />
      <UserNavbar />
      <div className="container d-flex justify-content-center bg-color mb-2">
        <div className="my-3">
          <img
            src="/images/post/image-gallery.png"
            alt=""
            className="object-fit-cover"
          />
        </div>
        <form action="">
          <div className="input-group my-3">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile02"
              multiple
            />
            {/* <label className="input-group-text" for="inputGroupFile02">
              上傳圖片
            </label> */}
          </div>
          <div className="input-group mb-3">
            <span
              className="input-group-text icon-edit"
              id="basic-addon1"
            ></span>
            <input
              type="text"
              className="form-control"
              placeholder="新增標題"
              aria-label="Posttitle"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text icon-map"></span>
            <input
              type="text"
              className="form-control"
              placeholder="新增地點"
              aria-label="Postlocation"
              aria-describedby="button-addon2"
            />
            {/* <button
              className="icon-arrow-s-right btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            ></button> */}
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text icon-tag"></span>
            <input
              type="text"
              className="form-control"
              placeholder="新增標籤"
              aria-label="Posttag"
              aria-describedby="button-addon3"
            />
            {/* <button
              className="btn btn-outline-secondary icon-arrow-s-right"
              type="button"
              id="button-addon3"
            ></button> */}
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text icon-edit"></span>
            <textarea
              className="form-control"
              aria-label="With textarea"
              placeholder="撰寫內文..."
              rows="10"
            ></textarea>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <Link className="btn btn-big me-2" href="#">
              放棄發表
            </Link>
            <button type="submit" className="btn btn-big ">
              發表文章
            </button>
          </div>
        </form>
      </div>
      <style jsx>
        {`
          .btn {
            color: #ae4818;
          }
          .object-fit-cover {
            width: 500px;
            height: 520px;
          }
          .bg-color {
            background-color: #fbf9ef;
            border-radius: 10px;
            width: 850px;
            height: 550px;
          }
        `}
      </style>
      <Footer />
    </>
  );
}
