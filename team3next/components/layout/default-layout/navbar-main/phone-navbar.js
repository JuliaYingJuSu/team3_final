import React from "react";

export default function PhoneNavbar() {
  return (
    <>
      <div className="container" style={{ width: 375 }}>
        <div className="user-info-area">
          <div>
            <img
              src="/images/logo.png"
              className="rounded-circle img-thumbnail headshot-middle"></img>
          </div>
          <div className="user-info-text">
            <h4 className="fw-bolder">會員暱稱</h4>
            <button className="btn ">編輯會員資訊</button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .user-info-area {
            display: flex;
            width: 355px;
            padding: 0px 20px 15px 20px;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            align-self: stretch;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          }
          .user-info-text {
            display: flex;
            padding-top: 5px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            flex: 1 0 0;
            align-self: stretch;
          }
        `}
      </style>
    </>
  );
}
