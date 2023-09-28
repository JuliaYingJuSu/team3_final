/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Toggle from "@/components/user/toggle";
import GoogleLogo from "@/components/icons/google-icon";

export default function Login() {
  return (
    <>
      <div
        className="d-flex "
        style={{ backgroundColor: "#EBD8A9", height: 923 }}>
        <div className="d-block w-100">
          <span className="position-relativ">
            <img
              src="/images/薯哥去背.png"
              height={520}
              width={660}
              className="position-absolute"
              style={{ left: 400, top: 200 }}></img>
          </span>
        </div>
        <div
          className="d-block w-100"
          style={{
            backgroundColor: "white",
            height: 923,
            borderTopLeftRadius: 241,
          }}>
          <div className="container" style={{ marginTop: 100 }}>
            <div className="mt-5 w-100" style={{ paddingLeft: 100 }}>
              <Link href={"/"}>
                <span className="icon-home me-1"></span>
              </Link>
              <span className="icon-arrow-s-right"></span>
              <span>
                <Link href="#" className="text-dark fw-bold ms-1">
                  登入
                </Link>
              </span>
            </div>
            <div className="container mt-5">
              <Toggle></Toggle>
            </div>
            <div className="middle mt-5">
              <form>
                <div className="form-floating mb-4">
                  <input
                    type="email"
                    className="form-control border-0 border-bottom rounded-0"
                    id="floatingInput"
                    placeholder="name@example.com"
                    style={{ height: 42, width: 600, color: "#AEAEAE" }}
                  />
                  <label for="floatingInput" className="fs-5 grey">
                    請輸入電子郵件
                  </label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control border-0 border-bottom rounded-0"
                    id="floatingPassword"
                    placeholder="Password"
                    style={{ height: 42, width: 600, color: "#AEAEAE" }}
                  />
                  <label for="floatingPassword" className="fs-5 grey">
                    請輸入密碼
                  </label>
                </div>
                <div style={{ marginTop: 100 }} className="middle">
                  <Link
                    className="btn btn-big middle"
                    href="#"
                    style={{ height: 60, width: 500, fontSize: 25 }}>
                    登入
                  </Link>
                </div>
                <div className="mb-3 hr-sect">或是 第三方 登入</div>
                <div className="row mb-2 mt-3">
                  <div className="col-sm-12 text-start">
                    <div className="d-flex justify-content-center">
                      <GoogleLogo className="rounded-circle img-thumbnail"></GoogleLogo>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <p className="middle mt-3">
                    <span className="bottom-line-g fs-5 grey-ae">
                      沒有帳號？
                      <Link href="/user/register" className="red-i">
                        註冊
                      </Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Head>
        <title>登入</title>
      </Head>
      <style jsx>
        {`
          .hr-sect {
            display: flex;
            flex-basis: 100%;
            align-items: center;
            color: #aeaeae;
            margin: 80px 0px;
            font-size: 18px;
          }
          .hr-sect:before,
          .hr-sect:after {
            content: "";
            flex-grow: 1;
            background: #cdcdcd;
            height: 1px;
            font-size: 0px;
            line-height: 0px;
            margin: 0px 30px;
          }
        `}
      </style>
    </>
  );
}
