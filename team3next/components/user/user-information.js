import React from "react";
import Styles from "./user-information.module.scss";
import AuthContext from "@/hooks/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserInformation() {
  const { auth } = useContext(AuthContext);
  const [foodtag, setFoodTag] = useState([]);
  const [myFoodTag, setMyFoodTag] = useState({});

  //隱藏or呈現密碼
  const [show, setShow] = useState(false);

    // sweetalert設定
    const swalTest1 = Swal.mixin({
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (swalTest1) => {
        swalTest1.addEventListener("mouseenter", Swal.stopTimer);
        swalTest1.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

  //要食物ID
  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${auth.user_id}/food_tag`)
      .then((r) => r.json())
      .then((r) => {
        const tags = { ...myFoodTag };
        r.forEach((i) => {
          tags[i.food_tag_id] = true;
        });
        setMyFoodTag(tags);
        //setFoodTag(r);
        // console.log({ tags });
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [auth.user_id]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(watch());
  console.log(errors);

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const response = await axios.put(
        process.env.API_SERVER + `/api/user/update`,
        data
      );
      console.log("Server Response:", response.data);
      swalTest1.fire({
        title: "修改成功",
        icon: "success",
      });
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        title: "修改失敗",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className={"container" + " " + `${Styles.bgc}`}>
        <div className={Styles.inputarea}>
          <div className="middle flex-column w-75">
            <div>
              <h3 className="mt-4">會員資訊</h3>
            </div>
            <form
              className="mt-4"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data">
              <input
                name="user_id"
                type="hidden"
                value={auth.user_id}
                {...register("user_id")}
              />
              <fieldset disabled>
                <div className="mb-3">
                  <label
                    htmlFor="disabledTextInput"
                    className="form-label fs18b">
                    電子信箱( 此欄位不能變更){" "}
                  </label>
                  <input
                    type="text"
                    id="disabledTextInput"
                    className="form-control input-f"
                    value={auth.user_email}
                  />
                </div>
              </fieldset>
              <div className="mb-3">
                <label htmlFor="InputName" className="form-label fs18b">
                  姓名
                  <span style={{ color: "red" }} className="ps-1">
                    *
                  </span>
                  <span className="ps-1" style={{ color: "red" }}>
                    {errors.user_name?.message}
                  </span>
                </label>
                <input
                  type="text"
                  className={`form-control input-f ${
                    errors.user_name ? "is-invalid" : ""
                  }`}
                  id="InputName"
                  name="user_name"
                  defaultValue={auth.user_name}
                  {...register("user_name", { required: "請輸入姓名" })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="InputNickName" className="form-label fs18b">
                  暱稱
                  <span style={{ color: "red" }} className="ps-1">
                    *
                  </span>
                  <span className="ps-1" style={{ color: "red" }}>
                    {errors.nickname?.message}
                  </span>
                </label>
                <input
                  type="text"
                  className={`form-control input-f ${
                    errors.nickname ? "is-invalid" : ""
                  }`}
                  id="InputNickName"
                  name="nickname"
                  defaultValue={auth.nickname}
                  {...register("nickname", { required: "請輸入暱稱" })}
                />
              </div>
              <div>
                <label htmlFor="InputPassword" className="form-label fs18b">
                  密碼
                  <span style={{ color: "red" }} className="ps-1">
                    *
                  </span>
                  <span className="ps-1" style={{ color: "red" }}>
                    {errors.user_password?.message}
                  </span>
                </label>
                <input
                  type={show ? "text" : "password"}
                  className={`form-control input-f ${
                    errors.user_password ? "is-invalid" : ""
                  }`}
                  id="InputPassword"
                  name="user_password"
                  defaultValue={auth.user_password}
                  {...register("user_password", {
                    required: "請輸入英文+數字至少8碼最多不超過12碼",
                    minLength: {
                      value: 4,
                      message: "請輸入英文+數字至少8碼",
                    },
                    maxLength: {
                      value: 12,
                      message: "請不要超過12碼",
                    },
                  })}
                />
                <i
                  type="button"
                  className={`far ${
                    show ? "fa-eye" : "fa-eye-slash"
                  } no-see-eye`}
                  style={{ color: "#787878" }}
                  onClick={() => {
                    setShow(!show);
                  }}></i>
              </div>
              <div className="mb-3">
                <label htmlFor="InputPhone" className="form-label fs18b">
                  手機號碼
                  <span style={{ color: "red" }} className="ps-1">
                    *
                  </span>
                  <span className="ps-1" style={{ color: "red" }}>
                    {errors.user_phone?.message}
                  </span>
                </label>
                <input
                  type="text"
                  className={`form-control input-f ${
                    errors.user_phone ? "is-invalid" : ""
                  }`}
                  id="InputPhone"
                  name="user_phone"
                  defaultValue={auth.user_phone}
                  {...register("user_phone", {
                    required: "請輸入09開頭共10碼的手機號碼",
                    pattern: {
                      value: /^(09)[0-9]{8}$/,
                      message: "請輸入09開頭共10碼的手機號碼",
                    },
                  })}
                />
              </div>
              <div className="mb-4">
                <span className="fs18b">喜愛的食物種類</span>
                <div className="mt-2">
                  <div className="row row-cols-sm-3 row-cols-md-6 g-1 gy-2">
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-1"
                        value="1"
                        defaultChecked={myFoodTag[1] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            console.log({ prev });
                            const p = { ...prev }; //複製prev
                            p[1] = !p[1]; //取相反值
                            console.log({ p });
                            return p; //新狀態
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-1">
                        台式
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-2"
                        value="2"
                        checked={myFoodTag[2] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[2] = !p[2];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-2">
                        中式
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-3"
                        value="3"
                        checked={myFoodTag[3] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[3] = !p[3];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-3">
                        日式
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-4"
                        value="4"
                        checked={myFoodTag[4] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[4] = !p[4];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-4">
                        韓式
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-5"
                        value="5"
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[5] = !p[5];
                            return p;
                          })
                        }
                        checked={myFoodTag[5] ? true : false}
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-5">
                        港式
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-6"
                        value="6"
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[6] = !p[6];
                            return p;
                          })
                        }
                        checked={myFoodTag[6] ? true : false}
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-6">
                        美式
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-7"
                        value="7"
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[7] = !p[7];
                            return p;
                          })
                        }
                        checked={myFoodTag[7] ? true : false}
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-7">
                        義式
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-8"
                        value="8"
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[8] = !p[8];
                            return p;
                          })
                        }
                        checked={myFoodTag[8] ? true : false}
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-8">
                        法式
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-9"
                        value="9"
                        checked={myFoodTag[9] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[9] = !p[9];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-9">
                        西式
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-10"
                        value="10"
                        checked={myFoodTag[10] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[10] = !p[10];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-10">
                        泰式
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-11"
                        value="11"
                        checked={myFoodTag[11] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[11] = !p[11];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-11">
                        越式
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-12"
                        value="12"
                        checked={myFoodTag[12] ? true : false}
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-12">
                        火鍋
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-13"
                        value="13"
                        checked={myFoodTag[13] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[13] = !p[13];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-13">
                        燒烤
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-14"
                        value="14"
                        checked={myFoodTag[14] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[14] = !p[14];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-14">
                        牛排
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-15"
                        value="15"
                        checked={myFoodTag[15] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[15] = !p[15];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-15">
                        熱炒
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-16"
                        value="16"
                        checked={myFoodTag[16] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[16] = !p[16];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-16">
                        素食
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-17"
                        value="17"
                        name="food_tag_id"
                        checked={myFoodTag[17] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[17] = !p[17];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-17">
                        飲品
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-18"
                        value="18"
                        checked={myFoodTag[18] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[18] = !p[18];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-18">
                        酒吧
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-19"
                        value="19"
                        checked={myFoodTag[19] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[19] = !p[19];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-19">
                        咖啡廳
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-20"
                        value="20"
                        checked={myFoodTag[20] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[20] = !p[20];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-20">
                        炸物
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-21"
                        value="21"
                        checked={myFoodTag[21] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[21] = !p[21];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-21">
                        吃到飽
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-22"
                        value="22"
                        checked={myFoodTag[22] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[22] = !p[22];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-22">
                        小吃
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-23"
                        value="23"
                        checked={myFoodTag[23] ? true : false}
                        onClick={() =>
                          setMyFoodTag((prev) => {
                            const p = { ...prev };
                            p[23] = !p[23];
                            return p;
                          })
                        }
                        {...register("food_tag_id")}
                      />
                      <label
                        className="btn btn-outline-warning rounded rounded-4 fw-bold"
                        htmlFor="btn-check-23">
                        甜點
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-middle fs18b">
                  確認修改
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .no-see-eye {
            position: relative;
          }
          .no-see-eye:before {
            position: absolute;
            left: 450px;
            bottom: 32px;
          }
        `}
      </style>
    </>
  );
}
