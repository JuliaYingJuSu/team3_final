/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "@/components/user/user-index.module.scss";
import Head from "next/head";

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
          <div className="position-relativ">
            <div className="position-absolute" style={{ right: 600, top: 130 }}>
              <div className="d-flex">
               
              </div>
            </div>
          </div>
        </div>
      </div>
      <Head>
        <title>登入</title>
      </Head>
    </>
  );
}
