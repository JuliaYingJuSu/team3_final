import React from "react";
import Link from "next/link";
import CardR2 from "../card-r2";

export default function Section03() {
  return (
    <>
      <div className="mt-5 container">
        <h4 className="h4-title mb-4">熱門餐廳</h4>
        <div className="row row-cols-1 row-cols-lg-3 container mx-auto">
          <CardR2></CardR2>
          <CardR2></CardR2>
          <CardR2></CardR2>
        </div>
        <Link href={"/"} className="middle grey fs18b mt-5">
          看更多
        </Link>
      </div>
    </>
  );
}
