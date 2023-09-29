import React from "react";
import Wave01 from "@/components/icons/wave01";
import Wave02 from "@/components/icons/wave02";
import Link from "next/link";

export default function Register2() {
  return (
    <>
      <div className="backgs">
        <span className="z-1">
          <Wave01></Wave01>
        </span>
        <span className="z-2 position-absolute top-0 start-50 translate-middle">
          <Wave02></Wave02>
        </span>
        <div className="title"></div>
      </div>
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
            height: 338.667px;
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
          .title {
            display: flex;
            padding-top: 140px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            align-self: stretch;
          }
        `}
      </style>
    </>
  );
}
