import Styles from "./user-information.module.scss";
import AuthContext from "@/hooks/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function UserInformation() {
  const { auth } = useContext(AuthContext);
  const [foodtag, setFoodTag] = useState([]);

  //隱藏or呈現密碼
  const [show, setShow] = useState(false);

  //要食物ID
  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${auth.user_id}/food_tag`)
      .then((r) => r.json())
      .then((r) => {
        setFoodTag(r);
        console.log(r);
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
    console.log(data);
    try {
      const response = await axios.put(
        process.env.API_SERVER + `/api/user/update`,
        data
      );
      console.log("Server Response:", response.data);
    } catch (err) {
      console.error("Error:", err);
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
                        name="likefoodtag[]"
                        value="1"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 1)}
                        {...register("food_tag_id_1")}
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
                        name="likefoodtag[]"
                        value="2"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 2)}
                        {...register("food_tag_id_2")}
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
                        name="likefoodtag[]"
                        value="3"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 3)}
                        {...register("food_tag_id_3")}
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
                        name="likefoodtag[]"
                        value="4"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 4)}
                        {...register("food_tag_id_4")}
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
                        name="likefoodtag[]"
                        value="5"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 5)}
                        {...register("food_tag_id_5")}
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
                        name="likefoodtag[]"
                        value="6"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 6)}
                        {...register("food_tag_id_6")}
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
                        name="likefoodtag[]"
                        value="7"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 7)}
                        {...register("food_tag_id_7")}
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
                        name="likefoodtag[]"
                        value="8"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 8)}
                        {...register("food_tag_id_8")}
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
                        name="likefoodtag[]"
                        value="9"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 9)}
                        {...register("food_tag_id_9")}
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
                        name="likefoodtag[]"
                        value="10"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 10)}
                        {...register("food_tag_id_10")}
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
                        name="likefoodtag[]"
                        value="11"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 11)}
                        {...register("food_tag_id_11")}
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
                        name="likefoodtag[]"
                        value="12"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 12)}
                        {...register("food_tag_id_12")}
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
                        name="likefoodtag[]"
                        value="13"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 13)}
                        {...register("food_tag_id_13")}
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
                        name="likefoodtag[]"
                        value="14"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 14)}
                        {...register("food_tag_id_14")}
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
                        name="likefoodtag[]"
                        value="15"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 15)}
                        {...register("food_tag_id_15")}
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
                        name="likefoodtag[]"
                        value="16"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 16)}
                        {...register("food_tag_id_16")}
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
                        name="likefoodtag[]"
                        value="17"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 17)}
                        {...register("food_tag_id_17")}
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
                        name="likefoodtag[]"
                        value="18"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 18)}
                        {...register("food_tag_id_18")}
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
                        name="likefoodtag[]"
                        value="19"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 19)}
                        {...register("food_tag_id_19")}
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
                        name="likefoodtag[]"
                        value="20"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 20)}
                        {...register("food_tag_id_20")}
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
                        name="likefoodtag[]"
                        value="21"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 21)}
                        {...register("food_tag_id_21")}
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
                        name="likefoodtag[]"
                        value="22"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 22)}
                        {...register("food_tag_id_22")}
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
                        name="likefoodtag[]"
                        value="23"
                        defaultChecked={foodtag.some(tag => tag.food_tag_id === 23)}
                        {...register("food_tag_id_23")}
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
