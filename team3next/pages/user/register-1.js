import React from "react";
import SelectFoodStyle from "@/components/user/select-food-style";

export default function Register() {
  return (
    <>
      <div className="sfsbc middle">
        <div className="mt-5">
          <h4>請先選擇您喜愛的食物樣式(可多選)</h4>
          <div className="ficb">
            <div className="middle"></div>
            <SelectFoodStyle></SelectFoodStyle>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .sfsbc {
            display: flex;
            padding: 10px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            background: linear-gradient(
              146deg,
              rgba(249, 231, 166, 0.8) 16.14%,
              #fff 92.53%
            );
          }
          .ficb {
            display: flex;
            padding: 0px 10px;
            justify-content: center;
            align-items: center;
            align-content: center;
            flex-wrap: wrap;
          }
        `}
      </style>
    </>
  );
}
