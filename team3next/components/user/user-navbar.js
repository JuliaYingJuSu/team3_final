import Link from "next/link";
import React from "react";

export default function UserNavbar() {
  return (
    <>
      <nav className="navbar">
        <div className="d-flex justify-content-between align-items-center container bottom-line pb-1">
          <ul className="nav nav-underline align-items-center d-flex justify-content-between flex-nowrap container">
            <li className="nav-item pe-3">
              <Link
                className="nav-link active fs-5"
                aria-current="page"
                href="./user">
                會員資訊
              </Link>
            </li>
            <li className="nav-item pe-3">
              <Link className="nav-link text-dark fs-5" href="#">
                我的文章
              </Link>
            </li>
            <li className="nav-item pe-3">
              <Link className="nav-link text-dark fs-5" href="#">
                追蹤作者
              </Link>
            </li>
            <li className="nav-item pe-3">
              <Link className="nav-link text-dark fs-5" href="#">
                收藏文章
              </Link>
            </li>
            <li className="nav-item pe-3">
              <Link className="nav-link text-dark fs-5" href="#">
                收藏商品
              </Link>
            </li>
            <li className="nav-item pe-3">
              <Link className="nav-link text-dark fs-5" href="#">
                消費紀錄
              </Link>
            </li>
            <li className="nav-item pe-3">
              <Link className="nav-link text-dark fs-5" href="#">
                訂位記錄
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
