import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

export default function UserNavbar() {
  const router = useRouter();
  const pn = router.pathname;
  const menuItems = [
    { id: 1, name: "會員資訊", href: "/user/:user_id" },
    { id: 2, name: "我的文章", href: "/user/:user_id/my-article" },
    { id: 3, name: "追蹤作者", href: "/user/:user_id/author" },
    { id: 4, name: "收藏文章", href: "/user/:user_id/article" },
    { id: 5, name: "收藏商品", href: "/user/:user_id/wishlist" },
    { id: 6, name: "消費紀錄", href: "/user/:user_id/my-order" },
    { id: 7, name: "訂位記錄", href: "/user/:user_id/my-book" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="d-flex justify-content-between align-items-center container bottom-line pb-1">
          <ul className="nav nav-underline align-items-center d-flex justify-content-between flex-nowrap container">
            {menuItems.map((v) => {
              return (
                <li className="nav-item pe-3" key={v.id}>
                  <Link
                    className={`nav-link fs-5 text-dark ${
                      pn === v.href ? "active" : ""
                    }`}
                    aria-current="page"
                    href={v.href}>
                    {v.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
