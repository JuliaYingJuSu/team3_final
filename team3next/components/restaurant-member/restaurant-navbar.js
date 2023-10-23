/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Logo from "@/public/images/薯哥去背.png";
import NotificationBell from "./restaurant-bell";
import { useMemberAuthContext } from "./hooks/use-memberauth-context";
import axios from "axios";

export default function RestaurantNavbar() {
  const { memberAuth, setMemberAuth } = useMemberAuthContext();
  const [fetchedData, setFetchedData] = useState([]);
  const fetchData = async () => {
    if (memberAuth && memberAuth.result && memberAuth.result.token) {
      try {
        if (memberAuth && memberAuth.result.token) {
          const response = await axios.get(
            process.env.API_SERVER + "/api/restaurant/member-info",
            {
              headers: {
                Authorization: "Bearer " + memberAuth.result.token,
              },
            }
          );
          console.log("fetch result:", response.data);
          setFetchedData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [memberAuth]);

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
          <div className="col-3 d-flex" style={{ height: "50px" }}>
            <NotificationBell />

            <img
              className="rounded-circle"
              src={`https://ui-avatars.com/api/?name=${memberAuth.result.restaurant_name}&background=random`}
              alt=""
            />
            <div className=" ms-3 align-self-center" style={{}}>
              歡迎回來，{fetchedData[0]?.restaurant_name || "加載中..."}
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
