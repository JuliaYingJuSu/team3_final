import React from "react";
import styles from "@/pages/product/index.module.css";

export default function BreadcrumbDetail() {
  return (
    <>
      <div className={styles.bread} style={{ paddingLeft: "0px" }}>
        <span className="icon-home"></span>
        <span className="icon-arrow-s-right"></span>
        <span>
          <a href="#">會員中心</a>
        </span>
        <span className="icon-arrow-s-right"></span>
        <span>
          <a href="#">訂位紀錄</a>
        </span>
        <span className="icon-arrow-s-right"></span>
        <span>
          <a href="#">詳細</a>
        </span>
        {/* <nav
          // style={{--bs-breadcrumb-divider= '>'}}
          aria-label="breadcrumb"
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#" className="icon-home"></a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              台北市
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              義式
            </li>
          </ol>
        </nav> */}
      </div>
    </>
  );
}
