import { useState, useEffect } from "react";
import Wave01 from "@/components/icons/wave01";
import Wave02 from "@/components/icons/wave02";
import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

export default function Register2() {
  const [user, setUser] = useState({
    user_name: "",
    nickname: "",
    user_email: "",
    user_password: "",
    user_phone: "",
  });

  //隱藏or呈現密碼
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    unregister,
    formState: { errors },
  } = useForm();
  console.log(errors);

  // sweetalert設定
  const swalTest1 = Swal.mixin({
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (swalTest1) => {
      swalTest1.addEventListener("mouseenter", Swal.stopTimer);
      swalTest1.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  //欄位共用的事件函式
  const handleFieldChange = (e) => {
    const newUser = { ...user, [e.target.name]: e.target.value };
    setUser(newUser);
  };

  const onSubmit = async (data) => {
    // 從 "data" 中移除 "password2"
    const { password2, ...formData } = data;
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3002/api/user",
        formData
      );

      console.log("Server Response:", response.data);
      swalTest1.fire({
        title: "註冊成功",
        icon: "success",
      });
      // location.href = "/user/login";
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        title: "註冊失敗",
        icon: "error",
      });
    }
  };

  ///圖片上傳
  // 選擇的檔案
  const [selectedFile, setSelectedFile] = useState(null);
  // 是否有檔案被挑選
  const [isFilePicked, setIsFilePicked] = useState(false);
  // 預覽圖片
  const [preview, setPreview] = useState("");
  // server上的圖片網址
  const [imgServerUrl, setImgServerUrl] = useState("");

  // 當選擇檔案更動時建立預覽圖
  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    console.log(objectUrl);
    setPreview(objectUrl);

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const changeHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      setIsFilePicked(true);
      setSelectedFile(file);
      setImgServerUrl("");
    } else {
      setIsFilePicked(false);
      setSelectedFile(null);
      setImgServerUrl("");
    }
  };

  const handleSubmission = () => {
    const formData = new FormData();

    // 對照server上的檔案名稱 req.files.avatar
    formData.append("user_img", selectedFile);

    fetch(
      "http://localhost:3002/api/userupload2", //server url
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setImgServerUrl("http://localhost:3002/api/user/upload2");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="backgs">
        <span className="z-1">
          <Wave01></Wave01>
        </span>
        <span
          className="z-2 position-absolute start-50 translate-middle"
          style={{ top: 65 }}>
          <Wave02></Wave02>
        </span>
        <div className="container middle flex-column mb-4">
          <div className="z-3 position-absolute" style={{ top: 130 }}>
            <h1 className="fw-bold ps-5">會員註冊</h1>
          </div>
          <span className="bgi position-absolute opacity-25"></span>
          <div
            className="fw-semibold fs-6 d-flex justify-content-end align-self-stretch"
            style={{ paddingRight: 350 }}>
            有{" "}
            <span className="px-1" style={{ color: "red" }}>
              *
            </span>{" "}
            的欄位為必填
          </div>
          {/* 輸入區 */}
          <form
            className="mt-4"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data">
            {/* 大頭照 */}
            <div className="middle ms-5">
              <div className="position-relative">
                {selectedFile ? (
                  <img
                    src={preview}
                    alt="大頭照"
                    className="rounded-circle img-thumbnail headshot-register"
                  />
                ) : (
                  <img
                    src="/images/logo.png"
                    alt="大頭照"
                    className="rounded-circle img-thumbnail headshot-register"
                  />
                )}
                <label className="img-thumbnail rounded-circle position-absolute bottom-0 end-0">
                  <input
                    className="upload_input"
                    type="file"
                    onChange={changeHandler}
                  />
                  <span className="fs-5">➕</span>
                </label>
              </div>
            </div>

            {/* 輸入區 */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fs18b">
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
                id="name"
                placeholder="請輸入姓名"
                {...register("user_name", { required: "請輸入姓名" })}
                value={user.user_name}
                onChange={handleFieldChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nikename" className="form-label fs18b">
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
                id="nikename"
                placeholder="請輸入暱稱"
                {...register("nickname", { required: "請輸入暱稱" })}
                value={user.nickname}
                onChange={handleFieldChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fs18b">
                電子信箱
                <span style={{ color: "red" }} className="ps-1">
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.user_email?.message}
                </span>
              </label>
              <input
                type="email"
                id="email"
                className={`form-control input-f ${
                  errors.user_email ? "is-invalid" : ""
                }`}
                placeholder="請輸入E-mail"
                {...register("user_email", {
                  required: "請輸入E-mail",
                })}
                value={user.user_email}
                onChange={handleFieldChange}
              />
            </div>
            {/* 密碼區 */}
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
                type={show1 ? "text" : "password"}
                className={`form-control input-f ${
                  errors.user_password ? "is-invalid" : ""
                }`}
                id="InputPassword"
                placeholder="請輸入英文+數字至少8碼最多不超過12碼"
                {...register("user_password", {
                  required: "請輸入英文+數字至少8碼最多不超過12碼",
                  minLength: {
                    value: 8,
                    message: "請輸入英文+數字至少8碼",
                  },
                  maxLength: {
                    value: 12,
                    message: "請不要超過12碼",
                  },
                })}
                value={user.user_password}
                onChange={handleFieldChange}
              />
              <i
                type="button"
                className={`far ${
                  show1 ? "fa-eye" : "fa-eye-slash"
                } no-see-eye`}
                style={{ color: "#787878" }}
                onClick={() => {
                  setShow1(!show1);
                }}></i>
            </div>
            {/* 密碼確認 */}
            <div>
              <label htmlFor="password2" className="form-label fs18b">
                密碼確認
                <span style={{ color: "red" }} className="ps-1">
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.password2?.message}
                </span>
              </label>
              <input
                type={show2 ? "text" : "password"}
                className={`form-control input-f ${
                  errors.password2 ? "is-invalid" : ""
                }`}
                id="password2"
                placeholder="請再次輸入密碼"
                {...register("password2", {
                  required: "請再次輸入密碼",
                  minLength: {
                    value: 8,
                    message: "請輸入英文+數字至少8碼",
                  },
                  maxLength: {
                    value: 12,
                    message: "請不要超過12碼",
                  },
                  validate: (value) =>
                    value === user.user_password || "與上欄輸入密碼不相同",
                })}
              />
              <i
                type="button"
                className={`far ${
                  show2 ? "fa-eye" : "fa-eye-slash"
                } no-see-eye`}
                style={{ color: "#787878" }}
                onClick={() => {
                  setShow2(!show2);
                }}></i>
            </div>
            {/* 手機 */}
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
                placeholder="請輸入09開頭共10碼的數字"
                {...register("user_phone", {
                  required: "請輸入09開頭共10碼的手機號碼",
                  pattern: {
                    value: /^(09)[0-9]{8}$/,
                    message: "請輸入09開頭共10碼的手機號碼",
                  },
                })}
                value={user.user_phone}
                onChange={handleFieldChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="self_info" className="form-label fs18b">
                個人簡介 :
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.self_info?.message}
                </span>
              </label>
              <textarea
                className="form-control input-area"
                id="self_info"
                rows="3"
                name="self_info"
                placeholder="寫下自我的話，100字內"
                onChange={(e) => {
                  setTextareaText(e.target.value);
                }}
                {...register("self_info", {
                  maxLength: {
                    value: 100,
                    message: "請不要超過100個字，謝謝",
                  },
                })}></textarea>
            </div>
            <div className="d-flex justify-content-end mt-5">
              {/* <Link href=""> */}
              <button
                type="submit"
                className="btn btn-big fs18b"
                onClick={handleSubmission(onSubmit)}>
                註冊
              </button>
              {/* </Link> */}
            </div>
          </form>
        </div>
      </div>
      <Head>
        <title>會員註冊</title>
      </Head>
      <style jsx>
        {`
          .backgs {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }
          svg {
            position: absolute;
            top: 0px;
          }
          .wave01 {
            width: 800px;
            height: 300px;
            position: absolute;
            top: 0px;
            fill: linear-gradient(
              180deg,
              #efd6c5 76.48%,
              rgba(217, 217, 217, 0) 90.06%
            );
          }
          .wave02 {
            width: 800px;
            height: 200px;
            position: absolute;
            top: 0px;
            fill: linear-gradient(
              266deg,
              rgba(182, 112, 101, 0.93) 1.39%,
              #f9e7a6 1.39%,
              rgba(249, 231, 166, 0.3) 42.15%
            );
            box-shadow: 0px -13px 29px 0px rgba(249, 231, 166, 0.29) inset,
              0px -53px 53px 0px rgba(249, 231, 166, 0.26) inset,
              0px -120px 72px 0px rgba(249, 231, 166, 0.15) inset,
              0px -213px 85px 0px rgba(249, 231, 166, 0.04) inset,
              0px -333px 93px 0px rgba(249, 231, 166, 0.01) inset;
          }
          .bgi {
            width: 390px;
            height: 440px;
            right: 400px;
            top: 146px;
            background: no-repeat;
            background-image: url("/images/onlybro.png");
          }
          .no-see-eye {
            position: relative;
          }
          .no-see-eye:before {
            position: absolute;
            left: 450px;
            bottom: 32px;
          }
          .upload_input {
            display: none;
          }
          .headshot-register {
            width: 180px;
            height: 180px;
            object-fit: cover;
          }
        `}
      </style>
    </>
  );
}
