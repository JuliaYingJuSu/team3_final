/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/薯哥去背.png";
import PhoneNavbar from "./phone-navbar";
import NavCart from "@/components/cart/nav-cart";
import { useState } from "react";

export default function MyNavbar() {
  
  const menuItems = [
    { id: 1, name: "食好料", href: "/post" },
    { id: 2, name: "食在推", href: "/book" },
    { id: 3, name: "嗑零食", href: "/product" },
  ];
  const [activeMenu, setActiveMenu] = useState("");

  return (
    <>
      <header>
        <nav
          className="sticky-top bg-white navbar navbar-expand-lg"
          style={{ height: 150 }}>
          <div className="container">
            {/* Logo區塊 */}
            <Link href="/" className="navbar-brand">
              <Image className="logo-i" src={Logo} alt="Logo"></Image>
            </Link>
            {/* 500px的menu button */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="hidden-max">
                <PhoneNavbar></PhoneNavbar>
              </div>
              {/* 左側連結區 */}
              <ul className="nav nav-underline hidden-nav">
                <div className="d-flex me-auto">
                  {menuItems.map((v) => {
                    return (
                      <li
                        className="nav-item pe-3"
                        key={v.id}
                        onClick={()=>{
                          setActiveMenu(v)
                        }}>
                        <Link
                          className={`nav-link fs-5 text-dark ${
                            activeMenu === v.href ? "active" : ""
                          }`}
                          href={v.href}>
                          {v.name}
                        </Link>
                      </li>
                    );
                  })}
                </div>
                {/* 右側ICON區 */}
                <div className="middle gap-4 right-menu">
                  {/* 會員下拉選單 */}
                  <li className="nav-item pe-3">
                    <div className="dropdown-center">
                      <div
                        type="button"
                        className="dropdown nav-link text-dark"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <span className="icon-member"></span>
                      </div>
                      <ul className="dropdown-menu text-center dropdown-menu-lg-end">
                        <li>
                          <span>
                            <img
                              src="/images/logo.png"
                              className="rounded-circle img-thumbnail headshot-middle"
                              alt="大頭照"
                            />
                          </span>
                          <p className="mt-2 fs-5 fw-bolder">薯哥</p>
                        </li>
                        <li>
                          <Link className="dropdown-item fs18b" href="/user">
                            會員資訊
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item fs18b"
                            href="/user/login">
                            註冊/登入
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item fs18b" href="#">
                            登出
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  {/* 購物車 */}
                  <li className="nav-item pe-3">
                    <Link
                      className="nav-link icon-cart text-dark"
                      role="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                      href="#offcanvasRight"
                      style={{ fontSize: 30 }}></Link>
                  </li>
                  <li></li>
                  <li></li>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{ backgroundColor: "#FBF9EF" }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title ms-4" id="offcanvasRightLabel">
            購物車
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"></button>
        </div>
        <div className="offcanvas-body" style={{ backgroundColor: "#FBF9EF" }}>
          <NavCart />
        </div>
      </div>
      <style global jsx>
        {`
          .h150 {
            height: 150px;
          }
          .logo-i {
            height: 150px;
            width: 200px;
            position: absolute;
            left: 45%;
            top: 5%;
          }
          .right-menu {
            position: absolute;
            right: 15%;
          }
          .hidden-max {
            display: none;
          }

          @media screen and (max-width: 500px) {
            .logo-i {
              height: 100px;
              width: 150px;
              position: relative;
              left: 5%;
            }
            .hidden-nav {
              display: none;
            }
            .hidden-max {
              display: table;
            }
          }
        `}
      </style>
    </>
  );
}
