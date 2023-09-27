/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "@/public/images/薯哥去背.png";

export default function MyNavbar() {
  // currentRoute是用來套用active樣式(目前區域對應選單項目)，需傳入MainMenu中
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <>
      <div className="sticky-top bg-white">
        <div className="container">
          <ul className="nav nav-underline align-items-center d-flex justify-content-between flex-nowrap">
            <div className="d-flex me-auto">
              {/* 左側連結區 */}
              <li className="nav-item pe-3">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  href="#">
                  食好料
                </Link>
              </li>
              <li className="nav-item pe-3">
                <Link className="nav-link text-dark fs-5" href="#">
                  食在推
                </Link>
              </li>
              <li className="nav-item pe-3">
                <Link className="nav-link text-dark fs-5" href="#">
                  嗑零食
                </Link>
              </li>
            </div>
            {/* Logo區塊 */}
            <div className="d-flex px-3">
              <Link href="/">
                <Image height={150} width={200} src={Logo} alt="Logo"></Image>
              </Link>
            </div>
            {/* 右側ICON區 */}
            <div className="middle ms-auto gap-4">
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
                  <ul className="dropdown-menu text-center">
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
                      <a className="dropdown-item fs18b" href="./user">
                        會員資訊
                      </a>
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
                <div
                  className="offcanvas-body"
                  style={{ backgroundColor: "#FBF9EF" }}></div>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <style global jsx>
        {`
          .h150 {
            height: 150px;
          }
        `}
      </style>
      {/* hover動畫(下底線)，需要覆蓋原本global.scss樣式 */}
      {/* <style global jsx>{`
        @media screen and (min-width: 992px) {
          .navbar {
            padding: 0;
          }
          .navbar .navbar-nav .nav-link {
            padding: 1em 0;
          }
          .navbar .navbar-nav .nav-item {
            margin: 0 1em;
          }
        }

        .navbar .navbar-nav .nav-item {
          position: relative;
        }

        .navbar .navbar-nav .nav-item::after {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          content: "";
          background-color: black;
          width: 0%;
          height: 2px;
          transition: all 0.5s;
        }
        .navbar .navbar-nav .nav-item:hover::after {
          width: 100%;
        }
      `}</style> */}
    </>
  );
}
