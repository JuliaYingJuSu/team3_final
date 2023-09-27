import React from "react";

export default function UserInfo() {
  return (
    <>
      <main className="container bottom-line" style={{ paddingBottom: 40 }}>
        <div
          className="d-flex justify-content-around align-items-center mt-3 mb-1"
          style={{ paddingInline: 200 }}>
          <div className="middle flex-column ms-5 ps-5">
            <h4>會員暱稱</h4>
            <div className="mt-2">
              <span>110人</span>
              <span>追蹤中</span>
            </div>
            <button className="btn btn-middle mt-4 fw-bold">發表文章</button>
          </div>
          <div className="middle ms-5">
            <div className="rounded-circle img-thumbnail headshot-big position-relative">
              <span
                className="d-block position-absolute z-3"
                style={{ paddingInlineStart: 130, paddingTop: 140 }}>
                <button className="icon-pan fs-4 img-thumbnail rounded-circle"></button>
              </span>
            </div>
          </div>
          <div className="d-flex ps-4" style={{ width: 300 }}>
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
