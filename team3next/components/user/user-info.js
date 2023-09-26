import React from "react";

export default function UserInfo() {
  return (
    <>
      <main className="container bottom-line" style={{ paddingBottom: 40 }}>
        <div
          className="d-flex justify-content-around align-items-center mt-3"
          style={{ paddingInline: 200 }}>
          <div className="middle flex-column">
            <h4>會員暱稱</h4>
            <div className="mt-2">
              <span>110人</span>
              <span>追蹤中</span>
            </div>
            <div className="btn-middle mt-5 fw-bold">發表文章</div>
          </div>
          <div className="middle">
            <div className="rounded-circle img-thumbnail headshot-big position-relativ">
              <span
                className="d-block position-absolute z-3"
                style={{ paddingInlineStart: 130, paddingTop: 140 }}>
                <button className="icon-pan fs-4 img-thumbnail rounded-circle"></button>
              </span>
            </div>
          </div>
          <div className="d-flex" style={{ width: 250 }}>
            用美食記錄生活點滴… 堆疊起美好的記憶…🚶‍♀️
            所有的不期而遇💕都是美好的開始 喜歡黑咖啡☕的純粹美好💕
            用美食記錄生活點滴… 堆疊起美好的記憶…🚶‍♀️
            所有的不期而遇💕都是美好的開始 喜歡黑咖啡☕的純粹美好💕
          </div>
        </div>
      </main>
    </>
  );
}
