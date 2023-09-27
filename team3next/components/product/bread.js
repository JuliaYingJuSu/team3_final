import React from "react";
import styles from "@/pages/product/index.module.css";

export default function Bread() {
  return (
    <>
      <div className={styles.bread}>
        <span className="icon-home"></span>
        <span className="icon-arrow-s-right"></span>
        <a href="#">嗑零食</a>
        <span className="icon-arrow-s-right"></span>
        <a href="#">嗑零食</a>
        <span className="icon-arrow-s-right"></span>
        <a href="#">嗑零食</a>
      </div>
    </>
  );
}
