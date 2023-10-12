import React from "react";
import SelectFoodStyle from "@/components/user/select-food-style";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register1() {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [isChecked6, setIsChecked6] = useState(false);
  const [isChecked7, setIsChecked7] = useState(false);
  const [isChecked8, setIsChecked8] = useState(false);
  const [isChecked9, setIsChecked9] = useState(false);

  const handleCheckboxClick = (id) => {
    if (id === 1) {
      setIsChecked1(!isChecked1);
    } else if (id === 2) {
      setIsChecked2(!isChecked2);
    } else if (id === 3) {
      setIsChecked3(!isChecked3);
    } else if (id === 4) {
      setIsChecked4(!isChecked4);
    } else if (id === 5) {
      setIsChecked5(!isChecked5);
    } else if (id === 6) {
      setIsChecked6(!isChecked6);
    } else if (id === 7) {
      setIsChecked7(!isChecked7);
    } else if (id === 8) {
      setIsChecked8(!isChecked8);
    } else if (id === 9) {
      setIsChecked9(!isChecked9);
    }
    // 根據食物選項的 id，更新對應的 isChecked 狀態
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <>
      <div className="sfsbc middle">
        <div className="mt-4 mx-5">
          <h3 className="text-center">請先選擇您喜愛的食物樣式(可多選)</h3>
          <div className="ficb mt-4">
            <div className="container">
              <form onSubmit={handleSubmit(onSubmit)} className="row gy-3">
                {/* 從此開始 */}
                <div className="col ps-4">
                  <div className="c-card middle">
                    <div className="mt-2">
                      <div className="custom-control custom-checkbox image-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="food_tag_id_1"
                          name="likefoodtag[]"
                          value="1"
                          checked={isChecked1}
                          onChange={() => {}}
                          {...register("food_tag_id_1")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked1 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_1"
                          onClick={() => {
                            handleCheckboxClick(1);
                          }}>
                          <img
                            src="/images/food-1106513_1920.jpg"
                            alt="台式"
                            className="w-100 c-card-img"></img>
                          <i
                            className={`${
                              isChecked1
                                ? "icon-heart-fill rounded-circle img-thumbnail"
                                : ""
                            }`}></i>
                        </label>
                      </div>
                      <div className="text-center pt-2">
                        <span className="fs-5 fw-bold">台式</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 中式 */}
                <div className="col ps-4">
                  <div className="c-card middle">
                    <div className="mt-2">
                      <div className="custom-control custom-checkbox image-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="food_tag_id_2"
                          name="likefoodtag[]"
                          value="2"
                          checked={isChecked2}
                          onChange={() => {}}
                          {...register("food_tag_id_2")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked2 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_2"
                          onClick={() => {
                            handleCheckboxClick(2);
                          }}>
                          <img
                            src="/images/test/c1.jpg"
                            alt="中式"
                            className="w-100 c-card-img"></img>
                          <i
                            className={`${
                              isChecked2
                                ? "icon-heart-fill rounded-circle img-thumbnail"
                                : ""
                            }`}></i>
                        </label>
                      </div>
                      <div className="text-center pt-2">
                        <span className="fs-5 fw-bold">中式</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 日式 */}
                <div className="col ps-4">
                  <div className="c-card middle">
                    <div className="mt-2">
                      <div className="custom-control custom-checkbox image-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="food_tag_id_3"
                          name="likefoodtag[]"
                          value="3"
                          checked={isChecked3}
                          onChange={() => {}}
                          {...register("food_tag_id_3")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked3 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_3"
                          onClick={() => {
                            handleCheckboxClick(3);
                          }}>
                          <img
                            src="/images/test/j1.jpg"
                            alt="日式"
                            className="w-100 c-card-img"></img>
                          <i
                            className={`${
                              isChecked3
                                ? "icon-heart-fill rounded-circle img-thumbnail"
                                : ""
                            }`}></i>
                        </label>
                      </div>
                      <div className="text-center pt-2">
                        <span className="fs-5 fw-bold">日式</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 韓式 */}
                <div className="col ps-4">
                  <div className="c-card middle">
                    <div className="mt-2">
                      <div className="custom-control custom-checkbox image-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="food_tag_id_4"
                          name="likefoodtag[]"
                          value="4"
                          checked={isChecked4}
                          onChange={() => {}}
                          {...register("food_tag_id_4")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked4 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_4"
                          onClick={() => {
                            handleCheckboxClick(4);
                          }}>
                          <img
                            src="/images/test/k1.jpg"
                            alt="韓式"
                            className="w-100 c-card-img"></img>
                          <i
                            className={`${
                              isChecked4
                                ? "icon-heart-fill rounded-circle img-thumbnail"
                                : ""
                            }`}></i>
                        </label>
                      </div>
                      <div className="text-center pt-2">
                        <span className="fs-5 fw-bold">韓式</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 港式 */}
                <div className="col ps-4">
                  <div className="c-card middle">
                    <div className="mt-2">
                      <div className="custom-control custom-checkbox image-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="food_tag_id_5"
                          name="likefoodtag[]"
                          value="5"
                          checked={isChecked5}
                          onChange={() => {}}
                          {...register("food_tag_id_5")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked5 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_5"
                          onClick={() => {
                            handleCheckboxClick(5);
                          }}>
                          <img
                            src="/images/test/h1.jpg"
                            alt="港式"
                            className="w-100 c-card-img"></img>
                          <i
                            className={`${
                              isChecked5
                                ? "icon-heart-fill rounded-circle img-thumbnail"
                                : ""
                            }`}></i>
                        </label>
                      </div>
                      <div className="text-center pt-2">
                        <span className="fs-5 fw-bold">港式</span>
                      </div>
                    </div>
                  </div>
                </div>
                 {/* 美式 */}
                 <div className="col ps-4">
                  <div className="c-card middle">
                    <div className="mt-2">
                      <div className="custom-control custom-checkbox image-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="food_tag_id_6"
                          name="likefoodtag[]"
                          value="6"
                          checked={isChecked6}
                          onChange={() => {}}
                          {...register("food_tag_id_6")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked6 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_6"
                          onClick={() => {
                            handleCheckboxClick(6);
                          }}>
                          <img
                            src="/images/test/a1.jpg"
                            alt="美式"
                            className="w-100 c-card-img"></img>
                          <i
                            className={`${
                              isChecked6
                                ? "icon-heart-fill rounded-circle img-thumbnail"
                                : ""
                            }`}></i>
                        </label>
                      </div>
                      <div className="text-center pt-2">
                        <span className="fs-5 fw-bold">美式</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 義式*/}
                <div className="col ps-4">
                  <div className="c-card middle">
                    <div className="mt-2">
                      <div className="custom-control custom-checkbox image-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="food_tag_id_7"
                          name="likefoodtag[]"
                          value="7"
                          checked={isChecked7}
                          onChange={() => {}}
                          {...register("food_tag_id_7")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked7 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_7"
                          onClick={() => {
                            handleCheckboxClick(7);
                          }}>
                          <img
                            src="/images/test/i1.jpg"
                            alt="義式"
                            className="w-100 c-card-img"></img>
                          <i
                            className={`${
                              isChecked7
                                ? "icon-heart-fill rounded-circle img-thumbnail"
                                : ""
                            }`}></i>
                        </label>
                      </div>
                      <div className="text-center pt-2">
                        <span className="fs-5 fw-bold">義式</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 法式*/}
                <div className="col ps-4">
                  <div className="c-card middle">
                    <div className="mt-2">
                      <div className="custom-control custom-checkbox image-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="food_tag_id_8"
                          name="likefoodtag[]"
                          value="8"
                          checked={isChecked8}
                          onChange={() => {}}
                          {...register("food_tag_id_8")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked8 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_8"
                          onClick={() => {
                            handleCheckboxClick(8);
                          }}>
                          <img
                            src="/images/test/f1.jpg"
                            alt="法式"
                            className="w-100 c-card-img"></img>
                          <i
                            className={`${
                              isChecked8
                                ? "icon-heart-fill rounded-circle img-thumbnail"
                                : ""
                            }`}></i>
                        </label>
                      </div>
                      <div className="text-center pt-2">
                        <span className="fs-5 fw-bold">法式</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 西式*/}
                <div className="col ps-4">
                  <div className="c-card middle">
                    <div className="mt-2">
                      <div className="custom-control custom-checkbox image-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="food_tag_id_9"
                          name="likefoodtag[]"
                          value="9"
                          checked={isChecked9}
                          onChange={() => {}}
                          {...register("food_tag_id_9")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked9 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_9"
                          onClick={() => {
                            handleCheckboxClick(9);
                          }}>
                          <img
                            src="/images/test/e1.jpg"
                            alt="西式"
                            className="w-100 c-card-img"></img>
                          <i
                            className={`${
                              isChecked9
                                ? "icon-heart-fill rounded-circle img-thumbnail"
                                : ""
                            }`}></i>
                        </label>
                      </div>
                      <div className="text-center pt-2">
                        <span className="fs-5 fw-bold">西式</span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="d-flex justify-content-end fs-5 align-items-center mt-5 mb-3 me-4">
                <div className="me-4">
                  <Link href="/user/register02" className="grey">
                    下次一定選
                  </Link>
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
            gap: 40px;
            flex-wrap: wrap;
          }
          .c-card-img {
            width: 164px;
            height: 164px;
            border-radius: 164px;
            object-fit: cover;
          }
          .c-card {
            height: 220px;
            width: 170px;
            flex-direction: column;
            gap: 10px;
          }

          /* 隱藏原始的多選框 */
          .custom-control-input {
            position: absolute;
            opacity: 0;
            pointer-events: none;
          }

          /* 變更label的樣式，邊框 */
          .custom-icon-checkbox {
            display: inline-block;
            cursor: pointer;
            position: relative; /* 定位圖示 */
            border: 3px solid transparent; /* 一開始邊框透明 */
          }

          /* 變更ICON樣式 */
          .custom-icon-checkbox i {
            font-size: 24px; /* ICON大小 */
            position: absolute; /* 定位ICON圖示 */
            bottom: 5px; /* 底部的間隔 */
            right: 10px; /* 右邊的間隔 */
          }

          /* 選取圖片時外框的樣式 */
          .custom-control-input:checked + .custom-icon-checkbox {
            border-radius: 164px;
            border: 5px solid #dc8b76; /* 選取時的外框顏色 */
          }
        `}
      </style>
      <Head>
        <title>會員註冊</title>
      </Head>
    </>
  );
}
