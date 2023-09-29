import React from "react";
import SelectFoodStyle from "@/components/user/select-food-style";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <div className="sfsbc middle">
        <div className="mt-4 mx-5">
          <h3 className="text-center">請先選擇您喜愛的食物樣式(可多選)</h3>
          <div className="ficb mt-4">
            <div className="container">
              <div className="row gy-3">
                <div className="col ps-4">
                  <SelectFoodStyle></SelectFoodStyle>
                </div>
                <div className="col ps-4">
                  <SelectFoodStyle></SelectFoodStyle>
                </div>
                <div className="col ps-4">
                  <SelectFoodStyle></SelectFoodStyle>
                </div>
                <div className="col ps-4">
                  <SelectFoodStyle></SelectFoodStyle>
                </div>
                <div className="col ps-4">
                  <SelectFoodStyle></SelectFoodStyle>
                </div>
                <div className="col ps-4">
                  <SelectFoodStyle></SelectFoodStyle>
                </div>
                <div className="col ps-4">
                  <SelectFoodStyle></SelectFoodStyle>
                </div>
                <div className="col ps-4">
                  <SelectFoodStyle></SelectFoodStyle>
                </div>
                <div className="col ps-4">
                  <SelectFoodStyle></SelectFoodStyle>
                </div>
              </div>
              <div className="d-flex justify-content-end fs-5 align-items-center mt-5 mb-3 me-4">
              <div className="me-4">
                  <Link href="#" className="grey">下次一定選</Link>
                </div>
                <div className="me-2">
                  <button type="submit" className="btn btn-middle fs-5">
                    確定選擇
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .sfsbc {
            width: 800px;
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
