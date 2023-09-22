/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import UserIcon from "@/components/icons/user-icon";
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
            <div className="d-flex px-3">
              <Image height={150} width={200} src={Logo} alt="Logo"></Image>
            </div>

            <div className="d-flex ms-auto">
              <li className="nav-item pe-3">
                <Link className="nav-link" aria-current="page" href="#">
                  <UserIcon />
                </Link>
              </li>
              <li className="nav-item pe-3">
                <Link className="nav-link" aria-current="page" href="#">
                  食好料
                </Link>
              </li>
              <li className="nav-item pe-3">
                <Link className="nav-link" aria-current="page" href="#">
                  食好料
                </Link>
              </li>
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
          content: '';
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
