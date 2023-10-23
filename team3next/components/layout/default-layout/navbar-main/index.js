/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/薯哥去背.png";
import PhoneNavbar from "./phone-navbar";
import NavCart from "@/components/cart/nav-cart";
import AuthContext from "@/hooks/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function MyNavbar() {
  const { auth, logout } = useContext(AuthContext);
  const router = useRouter();
  const pn = router.pathname;
  const menuItems = [
    { id: 1, name: "食好料", href: "/post" },
    { id: 2, name: "食在推", href: "/book" },
    { id: 3, name: "嗑零食", href: "/product" },
  ];

  const [userinfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${auth.user_id}/user`)
      .then((r) => r.json())
      .then((r) => {
        setUserInfo(r);
        // console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [auth.user_id]);

  return (
    <>
      <header>
        <div className="fixed-top test pb-4">
          <nav className=" navbar navbar-expand-lg forCheese">
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
                aria-label="Toggle navigation"
              >
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
                        <li className="nav-item pe-3" key={v.id}>
                          <Link
                            className={`nav-link fs-5 text-dark ${
                              pn === v.href ? "active" : ""
                            }`}
                            href={v.href}
                          >
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
                      {auth.user_id ? (
                        <div className="dropdown-center">
                          <div
                            type="button"
                            className="dropdown nav-link text-dark"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span
                              className="icon-member-black"
                              style={{ fontSize: 30 }}
                            ></span>
                          </div>
                          <ul className="dropdown-menu text-center dropdown-menu-lg-end">
                            <li>
                              <span>
                                {userinfo &&
                                userinfo.length > 0 &&
                                userinfo[0].user_img ? (
                                  <img
                                    src={
                                      process.env.API_SERVER +
                                      `/img/${userinfo[0].user_img}`
                                    }
                                    className="rounded-circle img-thumbnail headshot-middle"
                                    alt="大頭照"
                                  />
                                ) : (
                                  <img
                                    src="/images/logo.png"
                                    className="rounded-circle img-thumbnail headshot-middle"
                                    alt="大頭照"
                                  />
                                )}
                              </span>
                              <p className="mt-2 fs-5 fw-bolder">
                                {auth && auth.nickname}
                              </p>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item fs18b"
                                href="/user/:user_id"
                              >
                                會員資訊
                              </Link>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <button
                                className="dropdown-item fs18b"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  logout();
                                }}
                              >
                                登出
                              </button>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <div className="dropdown-center">
                          <div
                            type="button"
                            className="dropdown nav-link text-dark"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span className="icon-member"></span>
                          </div>
                          <ul className="dropdown-menu text-center dropdown-menu-lg-end">
                            <li>
                              <Link
                                className="dropdown-item fs18b"
                                href="/user/login"
                              >
                                註冊/登入
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
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
                        style={{ fontSize: 30 }}
                      ></Link>
                    </li>
                    <li></li>
                    <li></li>
                  </div>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{ backgroundColor: "#FBF9EF" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title ms-4" id="offcanvasRightLabel">
            購物車
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body" style={{ backgroundColor: "#FBF9EF" }}>
          <NavCart />
        </div>
      </div>
      <style global jsx>
        {`
          .pt-10 {
            padding-top: 100px;
          }

          .forCheese {
            background-image: url("/images/cheese-2.png");

            height: 185px;
          }
          .test {
            background: linear-gradient(
              180deg,
              #fff 90.62%,
              rgba(255, 255, 255, 0.17) 95.83%,
              rgba(255, 255, 255, 0) 100%
            );
          }
          .h150 {
            height: 150px;
          }
          .logo-i {
            height: 150px;
            width: 200px;
            position: absolute;
            left: 45.5%;
            top: 23%;
          }
          .right-menu {
            position: absolute;
            right: 15%;
          }
          .hidden-max {
            display: none;
          }

          @media screen and (max-width: 500px) {
            .forCheese {
              background-image: url("/images/cheese-2.png");

              background-size: cover;
              background-repeat-y: no-repeat;
              background-position-x: 520px;
              background-position-y: 0px;
              height: 120px;
            }
            .logo-i {
              height: 128px;
              width: 170px;
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
