import React from "react";
import Card from "../card";
import Link from "next/link";
import CardR from "../card-r";

export default function Section03() {
  return (
    <>
      <div className="mt-5 container">
        <h4 className="h4-title mb-4">熱門餐廳</h4>
        <div className="row row-cols-1 row-cols-md-2 ms-5">
          <CardR></CardR>
          <CardR></CardR>
        </div>
        <Link href={"/"} className="middle grey fs18b mt-5">
          看更多
        </Link>
      </div>
    </>
  );
}
