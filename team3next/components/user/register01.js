import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";

export default function Register1() {
  const [selectedFoodTagIds, setSelectedFoodTagIds] = useState([]);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [isChecked6, setIsChecked6] = useState(false);
  const [isChecked7, setIsChecked7] = useState(false);
  const [isChecked8, setIsChecked8] = useState(false);
  const [isChecked9, setIsChecked9] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(watch());
  console.log(errors);

  useEffect(() => {
    const selectedIds = [
      isChecked1 ? "1" : "",
      isChecked2 ? "2" : "",
      isChecked3 ? "3" : "",
      isChecked4 ? "4" : "",
      isChecked5 ? "5" : "",
      isChecked6 ? "6" : "",
      isChecked7 ? "7" : "",
      isChecked8 ? "8" : "",
      isChecked9 ? "9" : "",
    ].filter(Boolean); // Remove empty strings

    setSelectedFoodTagIds(selectedIds);

    // const query = {
    //   foodTagIds: selectedIds.join(","), // Join selected IDs into a comma-separated string
    // };

    // router.replace({
    //   pathname: router.pathname,
    //   query: query,
    // });
  }, [
    isChecked1,
    isChecked2,
    isChecked3,
    isChecked4,
    isChecked5,
    isChecked6,
    isChecked7,
    isChecked8,
    isChecked9,
  ]);

  return (
    <>
      <div className="sfsbc middle">
        <div className="mt-4 mx-5">
          <h3 className="text-center">請先選擇您喜愛的食物樣式(可多選)</h3>
          <div className="ficb mt-4">
            <div className="container">
              <form className="row gy-3">
                {/* 從此開始 */}
                <div className="col ps-4">
                  <div className="c-card middle">
                    <div className="mt-2">
                      <div className="custom-control custom-checkbox image-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="food_tag_id_1"
                          value="1"
                          checked={isChecked1}
                          onClick={() => {
                            setIsChecked1((prev) => !prev);
                          }}
                          {...register("food_tag_id_1")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked1 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_1">
                          <img
                            src="/images/food-1106513_1920.jpg"
                            alt="台式"
                            className="w-100 c-card-img"></img>
                          {isChecked1 && (
                            <i className="icon-heart-fill rounded-circle img-thumbnail"></i>
                          )}
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
                          value="2"
                          checked={isChecked2}
                          {...register("food_tag_id_2")}
                          onClick={() => {
                            setIsChecked2((prev) => !prev);
                          }}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked2 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_2">
                          <img
                            src="/images/test/c1.jpg"
                            alt="中式"
                            className="w-100 c-card-img"></img>
                          {isChecked2 && (
                            <i className="icon-heart-fill rounded-circle img-thumbnail"></i>
                          )}
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
                          value="3"
                          checked={isChecked3}
                          onClick={() => {
                            setIsChecked3((prev) => !prev);
                          }}
                          {...register("food_tag_id_3")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked3 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_3">
                          <img
                            src="/images/test/j1.jpg"
                            alt="日式"
                            className="w-100 c-card-img"></img>
                          {isChecked3 && (
                            <i className="icon-heart-fill rounded-circle img-thumbnail"></i>
                          )}
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
                          value="4"
                          checked={isChecked4}
                          onClick={() => {
                            setIsChecked4((prev) => !prev);
                          }}
                          {...register("food_tag_id_4")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked4 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_4">
                          <img
                            src="/images/test/k1.jpg"
                            alt="韓式"
                            className="w-100 c-card-img"></img>
                          {isChecked4 && (
                            <i className="icon-heart-fill rounded-circle img-thumbnail"></i>
                          )}
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
                          value="5"
                          checked={isChecked5}
                          onClick={() => {
                            setIsChecked5((prev) => !prev);
                          }}
                          {...register("food_tag_id_5")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked5 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_5">
                          <img
                            src="/images/test/h1.jpg"
                            alt="港式"
                            className="w-100 c-card-img"></img>
                          {isChecked5 && (
                            <i className="icon-heart-fill rounded-circle img-thumbnail"></i>
                          )}
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
                          value="6"
                          checked={isChecked6}
                          onClick={() => {
                            setIsChecked6((prev) => !prev);
                          }}
                          {...register("food_tag_id_6")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked6 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_6">
                          <img
                            src="/images/test/a1.jpg"
                            alt="美式"
                            className="w-100 c-card-img"></img>
                          {isChecked6 && (
                            <i className="icon-heart-fill rounded-circle img-thumbnail"></i>
                          )}
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
                          value="7"
                          checked={isChecked7}
                          onClick={() => {
                            setIsChecked7((prev) => !prev);
                          }}
                          {...register("food_tag_id_7")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked7 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_7">
                          <img
                            src="/images/test/i1.jpg"
                            alt="義式"
                            className="w-100 c-card-img"></img>
                          {isChecked7 && (
                            <i className="icon-heart-fill rounded-circle img-thumbnail"></i>
                          )}
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
                          value="8"
                          checked={isChecked8}
                          onClick={() => {
                            setIsChecked8((prev) => !prev);
                          }}
                          {...register("food_tag_id_8")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked8 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_8">
                          <img
                            src="/images/test/f1.jpg"
                            alt="法式"
                            className="w-100 c-card-img"></img>
                          {isChecked8 && (
                            <i className="icon-heart-fill rounded-circle img-thumbnail"></i>
                          )}
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
                          value="9"
                          checked={isChecked9}
                          onClick={() => {
                            setIsChecked9((prev) => !prev);
                          }}
                          {...register("food_tag_id_9")}
                        />
                        <label
                          className={`custom-icon-checkbox ${
                            isChecked9 ? "checked" : ""
                          }`}
                          htmlFor="food_tag_id_9">
                          <img
                            src="/images/test/e1.jpg"
                            alt="西式"
                            className="w-100 c-card-img"></img>
                          {isChecked9 && (
                            <i className="icon-heart-fill rounded-circle img-thumbnail"></i>
                          )}
                        </label>
                      </div>
                      <div className="text-center pt-2">
                        <span className="fs-5 fw-bold">西式</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end fs-5 align-items-center mt-5 mb-3 me-4">
                  <div className="me-4">
                    <button
                      className="grey btn fs-5"
                      data-bs-dismiss="modal"
                      data-bs-toggle="modal"
                      data-bs-target="#modal2"
                      >下次一定選
                    </button>
                  </div>
                  <div className="me-2">
                    <button  className="btn btn-middle fs-5">
                      {/* <Link
                        href={{
                          pathname: "/user/register02",
                          query: { foodTagIds: selectedFoodTagIds.join(",") },
                        }}
                        style={{ color: "#3f4c5c" }}
                        passHref // 加這個才可以正常連結
                      >
                        確定選擇
                      </Link> */}
                    </button>
                  </div>
                </div>
              </form>
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
