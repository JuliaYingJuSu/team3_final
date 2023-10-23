import Link from "next/link";
import React from "react";
import AuthContext from "@/hooks/AuthContext";
import { useState, useContext, useEffect } from "react";

export default function PhoneNavbar() {
  const { auth, logout } = useContext(AuthContext);
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
      <div className="container card card-body my-1" style={{ width: 375 }}>
        <div className="user-info-area mt-4">
          <div>
            {userinfo && userinfo.length > 0 && userinfo[0].user_img ? (
              <img
                src={process.env.API_SERVER + `/img/${userinfo[0].user_img}`}
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
          </div>
          <div className="user-info-text">
            <h4 className="fw-bolder">{auth.nickname}</h4>
            <Link className="btn btn-big" href="/user">
              編輯會員資訊
            </Link>
          </div>
        </div>
        <div className="link-area">
          <span className="fs18b">
            <Link href="#" className="text-dark">
              食好料
            </Link>
          </span>
          <span className="icon-arrow-big-right">
            <Link href="#" className="text-dark"></Link>
          </span>
        </div>
        <div className="link-area">
          <span className="fs18b">
            <Link href="#" className="text-dark">
              食在推
            </Link>
          </span>
          <span className="icon-arrow-big-right">
            <Link href="#" className="text-dark"></Link>
          </span>
        </div>
        <div className="link-area">
          <span className="fs18b">
            {" "}
            <Link href="#" className="text-dark">
              嗑零食
            </Link>
          </span>
          <span className="icon-arrow-big-right">
            <Link href="#" className="text-dark"></Link>
          </span>
        </div>
        <div className="link-area">
          <span className="fs18b">
            <Link href="#" className="text-dark">
              會員中心
            </Link>
          </span>
          <span className="icon-arrow-big-right">
            <Link href="#" className="text-dark"></Link>
          </span>
        </div>
        <div className="link-area">
          <span className="fs18b">
            <Link href="#" className="text-dark">
              購物車
            </Link>
          </span>
          <span className="icon-arrow-big-right">
            <Link href="#" className="text-dark"></Link>
          </span>
        </div>
        <div className="text-end my-2 mb-3">
          <Link className="fs16b text-dark" href="#">
            登出
          </Link>
        </div>
      </div>
      <style jsx>
        {`
          .user-info-area {
            display: flex;
            width: 355px;
            padding: 0px 20px 15px 20px;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            align-self: stretch;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          }
          .user-info-text {
            display: flex;
            padding-top: 5px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            flex: 1 0 0;
            align-self: stretch;
          }
          .link-area {
            display: flex;
            width: 355px;
            padding: 10px 20px;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </>
  );
}
