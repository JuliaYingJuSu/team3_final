import React from "react";
import styles from "@/pages/product/index.module.css";

export default function BreadcrumbIndex() {
  return (
    <>
      <div className={styles.bread}>
        <span className="icon-home"></span>
        <span className="icon-arrow-s-right"></span>
        <span>
          <a href="#">食在推</a>
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
