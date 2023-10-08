import React from "react";
import styles from "@/pages/product/index.module.css";


export default function Breadcrumb() {
  return (
    <>
      <div className={styles.bread}>
        <a className="icon-home" href="http://localhost:3080/">
          
        </a>
        <span className="icon-arrow-s-right"></span>
        <span>
          <a href="http://localhost:3080/post">食好料</a>
        </span>
        {/* <span className="icon-arrow-s-right"></span>
        <span>
          <a href="#">台北市</a>
        </span>
        <span className="icon-arrow-s-right"></span>
        <span>
          <a href="#">義式</a>
        </span> */}
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
