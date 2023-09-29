import React from "react";
import Wave01 from "@/components/icons/wave01";
import Link from "next/link";

export default function Register2() {
  return (
    <>
      <div className="backgs">
        <Wave01></Wave01>
      </div>
      <style jsx>
        {`
          .backgs {
            display: flex;
            padding: 10px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }
          .wave01 {
            width: 800px;
            height: 338.667px;
            position: absolute;
            top: -159px;
            fill: linear-gradient(
              180deg,
              #efd6c5 76.48%,
              rgba(217, 217, 217, 0) 90.06%
            );
          }
        `}
      </style>
    </>
  );
}
