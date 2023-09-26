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
        <div className="d-flex">
          {/* <div className="d-flex" style={{ flex: 4 }}></div> */}
          <ul
            className="nav nav-underline align-items-center d-flex justify-content-between flex-nowrap"
            // style={{ flex: 5 }}
          >
            {/* Logo區塊 */}
            <div className="d-flex px-3 justify-content-between">
              <Link href="/">
                <Image height={150} width={200} src={Logo} alt="Logo"></Image>
              </Link>
            </div>
            {/* 右側ICON區 */}
            <div className="d-flex align-item">
              <div className="dropdown">
                <button
                  type="button"
                  className="btn position-relative me-3 "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span
                    className="icon-bell"
                    style={{ fontSize: "32px" }}
                  ></span>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    <span style={{ fontSize: "6px", color: "white" }}>2</span>
                    <span className="visually-hidden">New alerts</span>
                  </span>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Action two
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Action three
                    </a>
                  </li>
                </ul>
              </div>
              <img
                className="rounded-circle"
                src="https://placehold.co/50x50"
                alt=""
              />
              <div className=" mx-3 align-self-center" style={{}}>
                歡迎回來，XXX
              </div>
            </div>
          </ul>
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
