import React from "react";

export default function AddArticle() {
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
              <div class="input-group mb-3">
                <input type="file" class="form-control" id="inputGroupFile02" />
                <label class="input-group-text" for="inputGroupFile02">
                  Upload
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
