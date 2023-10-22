/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Toggle from "@/components/user/toggle";
import GoogleLogo from "@/components/icons/google-icon";
import AuthContext from "@/hooks/AuthContext";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
// import Register1 from "@/components/user/register01";
// import Register2 from "@/components/user/register02";
// import Register from "./register";

// use the ssr option to disable server-rendering.
const RegisterModal = dynamic(
  () => import("@/components/user/register-modal"),
  {
    ssr: false,
  }
);

// import RegisterModal from "@/components/user/register-modal";

export default function Login() {
  const { auth, setAuth } = useContext(AuthContext);

  const router = useRouter();
  console.log({ router });

  const [formVals, setFormVals] = useState({
    user_email: "",
    user_password: "",
  });
  const [errors, setErrors] = useState({});

  const inputChange = (e) => {
    const { id, value } = e.target;
    const newVals = { ...formVals, [id]: value };

    setFormVals(newVals);
  };

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

  //進來後判斷是否有登入
  useEffect(() => {
    if (auth.user_id && auth.user_email) {
      if (router.query.url) {
        router.push(router.query.url);
      } else {
        router.push("/");
      }
    }
  }, [router, auth.user_email, auth.user_id]);

  const sendForm = (e) => {
    const email_re = /.{8,}/;
    const password_re = /.{4,}/;
    e.preventDefault();

    const newErrors = {};

    if (!email_re.test(formVals.user_email)) {
      newErrors.user_email = "請填寫正確的 email";
    }
    if (!password_re.test(formVals.user_password)) {
      newErrors.user_password = "請填寫8個字元以上密碼";
    }
    setErrors(newErrors);

    //表示沒有錯誤
    if (Object.keys(newErrors).length === 0) {
      console.log("沒有錯誤");

      fetch("http://localhost:3002/login-jwt", {
        method: "POST",
        body: JSON.stringify(formVals),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((obj) => {
          console.log(obj);
          if (obj.success && obj.data?.user_email) {
            localStorage.setItem("auth", JSON.stringify(obj.data));

            //登入後跳轉
            setAuth(obj.data);
            console.log("登入成功");
            swalTest1.fire({
              title: "登入成功",
              icon: "success",
            });
          }
        });
    } else {
      console.log("有錯喔");
      Swal.fire({
        title: "登入失敗",
        text: "電子郵件或密碼有錯喔!",
        icon: "error",
      });
    }
  };
  return (
    <>
      <div
        className="d-flex "
        style={{ backgroundColor: "#EBD8A9", height: 923 }}>
        <div className="d-block w-100">
          <span className="position-relativ">
            <img
              src="/images/薯哥去背.png"
              height={520}
              width={660}
              className="position-absolute"
              style={{ left: 200, top: 150 }}></img>
          </span>
        </div>
        <div
          className="d-block w-100"
          style={{
            backgroundColor: "white",
            height: 923,
            borderTopLeftRadius: 241,
          }}>
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
              <form noValidate onSubmit={sendForm} className="mt-4">
                <div className="mb-5">
                  <span className="form-text text-danger fs-5">
                    {errors.user_email}
                  </span>
                  <input
                    type="email"
                    className="form-control border-0 border-bottom rounded-0 fs-5"
                    id="user_email"
                    placeholder="請輸入電子郵件"
                    style={{ width: 600 }}
                    onChange={inputChange}
                    value={formVals.user_email}
                  />
                </div>
                <div>
                  <span className="form-text text-danger fs-5">
                    {errors.user_password}
                  </span>
                  <input
                    type="password"
                    className="form-control border-0 border-bottom rounded-0 fs-5"
                    id="user_password"
                    placeholder="請輸入密碼"
                    style={{ width: 600 }}
                    onChange={inputChange}
                    value={formVals.user_password}
                  />
                  <i
                    type="button"
                    className="far fa-eye-slash no-see-eye"
                    style={{ color: "#787878" }}></i>
                </div>
                <div style={{ marginTop: 100 }} className="middle">
                  <button
                    className="btn btn-big middle"
                    type="submit"
                    style={{ height: 60, width: 500, fontSize: 25 }}>
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
                    <span className="bottom-line-g fs-5 grey-ae middle">
                      沒有帳號？
                      <button
                        type="button"
                        className="red-i btn fs-5"
                        data-bs-toggle="modal"
                        data-bs-target="#modal1">
                        註冊
                      </button>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal 1 --> */}
      <RegisterModal />
      {/* <div
        className="modal fade rounded"
        id="modal1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content position-relative">
            <span
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3 fs-5"
              aria-label="Close"
              data-bs-dismiss="modal"
            ></span>
            <Register></Register>
          </div>
        </div>
      </div> */}

      {/* <!-- Modal 2 --> */}
      {/* <div
          className="modal fade rounded"
          id="modal2"
          tabIndex="-2"
          data-bs-backdrop="static"
          data-bs-keyboard="false">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <span
                type="button"
                className="btn-close position-absolute top-0 end-0 m-3 fs-5 z-3"
                aria-label="Close"
                data-bs-dismiss="modal"></span>
              <Register2></Register2>
            </div>
          </div>
        </div> */}
      <Head>
        <title>食食嗑嗑-登入</title>
      </Head>
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
