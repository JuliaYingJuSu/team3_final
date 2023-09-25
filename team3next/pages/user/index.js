import React from "react";
import MyNavbar from "@/components/layout/default-layout/navbar-main";

export default function UserIndex() {
  return (
    <>
      <MyNavbar></MyNavbar>
      <body>
        <main className="container">
          <div className="d-flex justify-content-between align-items-center mt-3" style={{paddingInline:250}}>
            <div className="middle flex-column">
                <h4>會員暱稱</h4>
                <div className="mt-2">
                    <span>110人</span>
                    <span>追蹤中</span>
                </div>
                <div className="btn-middle mt-5">發表文章</div>
            </div>
            <div className="middle">1</div>
            <div className="middle">2</div>
          </div>
        </main>
      </body>
    </>
  );
}
