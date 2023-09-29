import React from "react";
import Wave01 from "@/components/icons/wave01";
import Wave02 from "@/components/icons/wave02";
import Link from "next/link";
import Head from "next/head";

export default function Register2() {
  return (
    <>
      <div className="backgs">
        <span className="z-1">
          <Wave01></Wave01>
        </span>
        <span
          className="z-2 position-absolute start-50 translate-middle"
          style={{ top: 65 }}>
          <Wave02></Wave02>
        </span>
        <div className="container middle flex-column mb-4">
          <div className="z-3 position-absolute" style={{ top: 130 }}>
            <h1 className="fw-bold ps-5">會員註冊</h1>
          </div>
          <span className="bgi position-absolute opacity-25"></span>
          <div
            className="fw-semibold fs-6 d-flex justify-content-end align-self-stretch"
            style={{ paddingRight: 350 }}>
            有{" "}
            <span className="px-1" style={{ color: "red" }}>
              *
            </span>{" "}
            的欄位為必填
          </div>
          {/* 輸入區 */}
          <form className="mt-4">
            {/* 大頭照 */}
            <div className="middle ms-5">
              <div className="rounded-circle img-thumbnail headshot-big position-relative">
                <span
                  className="d-block position-absolute z-3"
                  style={{ paddingInlineStart: 130, paddingTop: 140 }}>
                  <button className="icon-plus fs-4 img-thumbnail rounded-circle"></button>
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="InputName" className="form-label fs18b">
                姓名
                <span style={{ color: "red" }} className="ps-1">
                  *
                </span>
              </label>
              <input
                type="text"
                className="form-control input-f"
                id="InputName"
                placeholder="請輸入姓名"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputNickName" className="form-label fs18b">
                暱稱
                <span style={{ color: "red" }} className="ps-1">
                  *
                </span>
              </label>
              <input
                type="text"
                className="form-control input-f"
                id="InputNickName"
                placeholder="請輸入暱稱"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputEmail" className="form-label fs18b">
                電子信箱
                <span style={{ color: "red" }} className="ps-1">
                  *
                </span>
              </label>
              <input
                type="email"
                id="InputEmail"
                className="form-control input-f"
                placeholder="請輸入E-mail"
              />
            </div>
            {/* 密碼區 */}
            <div className="mb-3">
              <label htmlFor="InputPassword" className="form-label fs18b">
                密碼
                <span style={{ color: "red" }} className="ps-1">
                  *
                </span>
              </label>
              <input
                type="password"
                className="form-control input-f"
                id="InputPassword"
                placeholder="請輸入英文+數字至少8碼"
              />
               <i
                    type="button"
                    className="far fa-eye-slash no-see-eye"
                    style={{ color: "#787878" }}></i>
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword2" className="form-label fs18b">
                密碼確認
                <span style={{ color: "red" }} className="ps-1">
                  *
                </span>
              </label>
              <input
                type="password"
                className="form-control input-f"
                id="InputPassword2"
                placeholder="請再次輸入密碼"
              />
               <i
                    type="button"
                    className="far fa-eye-slash no-see-eye"
                    style={{ color: "#787878" }}></i>
            </div>
            {/* 手機 */}
            <div className="mb-3">
              <label htmlFor="InputPhone" className="form-label fs18b">
                手機號碼
                <span style={{ color: "red" }} className="ps-1">
                  *
                </span>
              </label>
              <input
                type="text"
                className="form-control input-f"
                id="InputPhone"
                placeholder="請輸入09開頭共10碼的數字"
              />
            </div>
            <div className="mb-3">
              <label htmlForor="FormTextarea" className="form-label fs18b">
                個人簡介 :
              </label>
              <textarea
                className="form-control input-area"
                id="FormTextarea1"
                rows="3"
                placeholder="寫下自我的話，100字內"></textarea>
            </div>
            <div className="d-flex justify-content-end mt-5">
              <Link href="/user/login">
                <button type="submit" className="btn btn-big fs18b">
                  註冊
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Head>
        <title>會員註冊</title>
      </Head>
      <style jsx>
        {`
          .backgs {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }
          svg {
            position: absolute;
            top: 0px;
          }
          .wave01 {
            width: 800px;
            height: 300px;
            position: absolute;
            top: 0px;
            fill: linear-gradient(
              180deg,
              #efd6c5 76.48%,
              rgba(217, 217, 217, 0) 90.06%
            );
          }
          .wave02 {
            width: 800px;
            height: 200px;
            position: absolute;
            top: 0px;
            fill: linear-gradient(
              266deg,
              rgba(182, 112, 101, 0.93) 1.39%,
              #f9e7a6 1.39%,
              rgba(249, 231, 166, 0.3) 42.15%
            );
            box-shadow: 0px -13px 29px 0px rgba(249, 231, 166, 0.29) inset,
              0px -53px 53px 0px rgba(249, 231, 166, 0.26) inset,
              0px -120px 72px 0px rgba(249, 231, 166, 0.15) inset,
              0px -213px 85px 0px rgba(249, 231, 166, 0.04) inset,
              0px -333px 93px 0px rgba(249, 231, 166, 0.01) inset;
          }
          .bgi {
            width: 390px;
            height: 440px;
            right: 400px;
            top: 146px;
            background: no-repeat;
            background-image: url("/images/onlybro.png");
          }
          .no-see-eye {
            position: relative;
          }
          .no-see-eye:before{
            position: absolute;
            left:465px;
            bottom: 32px;
          }
        `}
      </style>
    </>
  );
}
