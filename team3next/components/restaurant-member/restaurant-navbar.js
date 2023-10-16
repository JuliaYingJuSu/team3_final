/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "@/public/images/薯哥去背.png";
import { useMemberAuthContext } from "./hooks/use-memberauth-context";

export default function RestaurantNavbar() {
  const { memberAuth, setMemberAuth } = useMemberAuthContext();
  return (
    <>
      <ul className="nav nav-underline d-flex align-items-center justify-content-between flex-nowrap">
        <div className="row w-100 d-flex align-items-center">
          <div className="col-5"></div>
          {/* Logo區塊 */}
          <div className="col-1 px-3">
            <Link href="/">
              <Image height={150} width={200} src={Logo} alt="Logo"></Image>
            </Link>
          </div>
          <div className="col-3"></div>
          {/* 右側ICON區 */}
          <div className="col-3 d-flex align-item" style={{ height: "50px" }}>
            <div className="dropdown">
              <button
                type="button"
                className="btn position-relative me-3 "
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="icon-bell" style={{ fontSize: "32px" }}></span>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  <span style={{ fontSize: "6px", color: "white" }}>2</span>
                  <span className="visually-hidden">New alerts</span>
                </span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Action two
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
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
            <div className=" ms-3 align-self-center" style={{}}>
              歡迎回來，{memberAuth.result?.restaurant_name || "加載中..."}
            </div>
          </div>
        </div>
      </ul>
      <style global jsx>
        {`
          .h150 {
            height: 150px;
          }
        `}
      </style>
    </>
  );
}
