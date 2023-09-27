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
                className="nav-link fs-5 text-dark" 
                aria-current="page"
                href="/user">
                會員資訊
              </Link>
            </li>
            <li className="nav-item pe-3">
              <Link className="nav-link text-dark fs-5" href="/user/my-article">
                我的文章
              </Link>
            </li>
            <li className="nav-item pe-3">
              <Link className="nav-link text-dark fs-5" href="/user/author">
                追蹤作者
              </Link>
            </li>
            <li className="nav-item pe-3">
              <Link className="nav-link text-dark fs-5" href="/user/article">
                收藏文章
              </Link>
            </li>
            <li className="nav-item pe-3">
              <Link className="nav-link text-dark fs-5" href="/user/wishlist">
                收藏商品
              </Link>
            </li>
            <li className="nav-item pe-3">
              <Link className="nav-link text-dark fs-5" href="/user/my-order">
                消費紀錄
              </Link>
            </li>
            <li className="nav-item pe-3">
              <Link className="nav-link text-dark fs-5" href="/user/my-book">
                訂位記錄
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
