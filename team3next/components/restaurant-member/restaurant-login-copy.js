/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Toggle from "@/components/user/toggle";
import GoogleLogo from "@/components/icons/google-icon";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "@/validation/login-validation";
import axios from "axios";
import Swal from "sweetalert2";

export default function RestaurantLogin() {
  const [loginState, setLoginState] = useState(false);
  axios.defaults.withCredentials = true;
  // const login = async () => {
  //   const response = await axios.get(
  //     "http://localhost:3002/api/restaurant/member-login"
  //   );
  //   setLoginState(response.data.user.restaurant_name);
  //   console.log(response.data);
  // };
  // useEffect(() => {
  //   login();
  // }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3002/api/restaurant/member-login",
        data
      );
      console.log("Server Response:", response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <>
      <Head>
        <title>餐廳業者登入</title>
      </Head>
      <div
        className="d-flex "
        style={{ backgroundColor: "#EBD8A9", height: 923 }}
      >
        <div className="d-block w-100">
          <span className="position-relativ">
            <img
              src="/images/薯哥去背.png"
              height={520}
              width={660}
              className="position-absolute"
              style={{ left: 400, top: 200 }}
            ></img>
          </span>
        </div>
        <div
          className="d-block w-100"
          style={{
            backgroundColor: "white",
            height: 923,
            borderTopLeftRadius: 241,
          }}
        >
          <div className="container" style={{ marginTop: 100 }}>
            <div className="mt-5 w-100" style={{ paddingLeft: 100 }}>
              <Link href={"/"}>
                <span className="icon-home me-1"></span>
              </Link>
              <span className="icon-arrow-s-right"></span>
              <span>
                <Link href="#" className="text-dark fw-bold ms-1">
                  登入
                </Link>
              </span>
            </div>
            <div className="container mt-5">
              <Toggle></Toggle>
            </div>
            <div className="middle mt-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <span className="ps-1" style={{ color: "red" }}>
                    {errors.email?.message}
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 border-bottom rounded-0 fs-5"
                    id="user_email"
                    placeholder="請輸入電子郵件"
                    style={{ width: 600 }}
                    {...register("email")}
                  />
                </div>
                <div>
                  <span className="ps-1" style={{ color: "red" }}>
                    {errors.password?.message}
                  </span>
                  <input
                    type="password"
                    className="form-control border-0 border-bottom rounded-0 fs-5"
                    id="user_password"
                    placeholder="請輸入密碼"
                    style={{ width: 600 }}
                    {...register("password")}
                  />
                  <i
                    type="button"
                    className="far fa-eye-slash no-see-eye"
                    style={{ color: "#787878" }}
                  ></i>
                </div>
                <div style={{ marginTop: 100 }} className="middle">
                  <button
                    className="btn btn-big middle"
                    type="submit"
                    style={{ height: 60, width: 500, fontSize: 25 }}
                  >
                    登入
                  </button>
                </div>
                <div className="mb-3 hr-sect">或是 第三方 登入</div>
                <div className="row mb-2 mt-3">
                  <div className="col-sm-12 text-start">
                    <div className="d-flex justify-content-center">
                      <GoogleLogo className="rounded-circle img-thumbnail"></GoogleLogo>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <p className="middle mt-3">
                    <span className="bottom-line-g fs-5 grey-ae">
                      沒有帳號？
                      <Link
                        href="/restaurant-member/member-register"
                        className="red-i"
                      >
                        註冊
                      </Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .hr-sect {
            display: flex;
            flex-basis: 100%;
            align-items: center;
            color: #aeaeae;
            margin: 80px 0px;
            font-size: 18px;
          }
          .hr-sect:before,
          .hr-sect:after {
            content: "";
            flex-grow: 1;
            background: #cdcdcd;
            height: 1px;
            font-size: 0px;
            line-height: 0px;
            margin: 0px 30px;
          }
          .no-see-eye {
            position: relative;
          }
          .no-see-eye:before {
            position: absolute;
            left: 555px;
            bottom: 35px;
          }
        `}
      </style>
    </>
  );
}
