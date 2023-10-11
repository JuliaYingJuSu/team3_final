import React from "react";
import styles from "@/pages/product/index.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Bread() {
  const router = useRouter();
  console.log(router.pathname);

  const path = router.pathname.slice(1);
  console.log(path);
  const pathname =
    path == "product"
      ? "嗑零食"
      : path == "user"
      ? "使用者"
      : path == "post"
      ? "食記"
      : "餐廳";
  console.log(pathname);

  return (
    <>
      <div className={styles.bread}>
        <a href="/">
          <span className="icon-home"></span>
        </a>
        <span className="icon-arrow-s-right"></span>
        <a href={router.pathname}>{pathname}</a>
      </div>
    </>
  );
}
