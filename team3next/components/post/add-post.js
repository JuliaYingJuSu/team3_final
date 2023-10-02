import React from "react";

export default function AddPost() {
  return (
    <>
      <div className="container">
        <div
          className="d-flex justify-content-center mb-3"
          style={{ heigh: 300 }}
        >
          <img src="/images/post/image-gallery.png" alt="" />
        </div>
        <form action="">
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile02"
              multiple
            />
            <label className="input-group-text" for="inputGroupFile02">
              上傳圖片
            </label>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text icon-edit" id="basic-addon1"></span>
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
            <button
              className="btn btn-outline-secondary icon-arrow-s-right"
              type="button"
              id="button-addon3"
            ></button>
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
            <button type="submit" className="btn btn-big">
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
        `}
      </style>
    </>
  );
}
