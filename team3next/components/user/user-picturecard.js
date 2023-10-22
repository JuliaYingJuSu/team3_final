/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Styles from "@/components/user/user-information.module.scss";
import MyArticle from "../post/my-article";
import Swal from "sweetalert2";

export default function UserPictureCard({article}) {

  //sweetalert 設定
  const swalButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-big",
      cancelButton: "btn btn-big",
    },
    buttonsStyling: false,
  });

  return (
    <>
      <div className="position-relative">
        <a
          type="button"
          className="position-relative"
          data-bs-toggle="modal"
          data-bs-target={"#exampleModal"+article.post_id}>
          <img
            src={`http://localhost:3002/img/${article.post_image_name}`}
            className={Styles.imgStyle}
            alt="User Image"></img>
          <span
            className="icon-multi position-absolute z-1 fs-4 top-50"
            style={{ right: 20, marginTop: 140 }}></span>
        </a>
        <div
          className="dropstart position-absolute btn-group"
          style={{ right: 15, marginTop: 15 }}>
          <button
            type="button"
            className="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            <i className="fas fa-ellipsis-v fs-4 grey"></i>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item fs16b" href="/post/edit-post">
                修改文章
              </a>
            </li>
            <li>
              <button
                className="dropdown-item fs16b"
                onClick={() => {
                  swalButtons
                    .fire({
                      title: "是否要刪除這篇文章?",
                      icon: "warning",
                      showCancelButton: true,
                      cancelButtonText:
                        '<i class="fa-regular fa-circle-xmark fs-5"></i> 先不要',
                      confirmButtonText:
                        '<i class="far fa-check-circle fs-5"></i> 刪除',
                    })
                    .then((result) => {
                      if (result.isConfirmed) {
                        swalButtons.fire("刪除成功", "", "success");
                      }
                    });
                }}>
                刪除文章
              </button>
            </li>
          </ul>
        </div>
        <span>
          <MyArticle article={article}></MyArticle>
        </span>
      </div>
      <style jsx>{`
        .dropdown-toggle::before {
          display: none;
        }
      `}</style>
    </>
  );
}
