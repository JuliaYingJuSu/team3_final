import React from "react";
import UserButtonGroup from "./user-button-group";
import Styles from "./user-information.module.scss";
import AuthContext from "@/hooks/AuthContext";
import { useContext, useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function UserInformation() {
  const { auth } = useContext(AuthContext);
  const [foodtag, setFoodTag] = useState([]);

  //隱藏or呈現密碼
  const [show, setShow] = useState(false);

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
    formState: { errors },
  } = useForm();
  console.log(errors);
  
  const onSubmit =async (data) => {
    console.log(data);
    try {
      const response = await axios.put(process.env.API_SERVER + `/api/user/update`, data);
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
            <dvi>
              <h3 className="mt-4">會員資訊</h3>
            </dvi>
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <input name="user_id" type="hidden" value={auth.user_id}
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
              <UserButtonGroup />
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
