import React from "react";

export default function AddPost() {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                <div className="d-flex align-items-center p-1">
                  <div className="me-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="51"
                      height="50"
                      viewBox="0 0 51 50"
                      fill="none"
                    >
                      <circle cx="25.5" cy="25" r="25" fill="#DC8B76" />
                    </svg>
                  </div>
                  <p className="middle me-2">
                    <a className="fs16b pt-3 text-dark" href="#">
                      會員暱稱
                    </a>
                  </p>
                </div>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div
                className="d-flex justify-content-center mb-3"
                style={{ heigh: 300 }}
              >
                <img src="./images/post/image-gallery.png" alt="" />
              </div>
              <form action="">
                <div class="input-group mb-3">
                  <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile02"
                    multiple
                  />
                  <label class="input-group-text" for="inputGroupFile02">
                    上傳圖片
                  </label>
                </div>
                <div class="input-group mb-3">
                  <span
                    class="input-group-text icon-edit"
                    id="basic-addon1"
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="新增標題"
                    aria-label="Posttitle"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text icon-map"></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="新增地點"
                    aria-label="Postlocation"
                    aria-describedby="button-addon2"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    className="icon-arrow-s-right"
                  ></button>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text icon-tag"></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="新增標籤"
                    aria-label="Postlocation"
                    aria-describedby="button-addon3"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon3"
                    className="icon-arrow-s-right"
                  ></button>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text icon-edit"></span>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="撰寫內文..."
                  ></textarea>
                </div>
                <div class="row align-items-end">
                  <button type="submit" class="btn btn-primary">
                    發表文章
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
