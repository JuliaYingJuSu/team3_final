import React, { use } from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import profileSchema from "@/validation/profile-validation";
import { useRouter } from "next/router";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useMemberAuthContext } from "./hooks/use-memberauth-context";

export default function Profile() {
  const router = useRouter();
  const [fetchedData, setFetchedData] = useState("default");
  const [dataLoaded, setDataLoaded] = useState(false);
  const { memberAuth, setMemberAuth } = useMemberAuthContext();
  const [inputType, setInputType] = useState("password");
  const [reInputType, reSetInputType] = useState("password");
  const fetchData = async () => {
    try {
      const authObj = JSON.parse(localStorage.getItem("token"));
      if (memberAuth && memberAuth.result.token) {
        const response = await axios.get(
          "http://localhost:3002/api/restaurant/member-info",
          {
            headers: {
              Authorization: "Bearer " + memberAuth.result.token,
            },
          }
        );
        console.log("fetch result:", response.data);
        setFetchedData(response.data);
        setDataLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [memberAuth]);

  // 要加上auth作為依賴，否則多刷新幾次就不request了，不知道為什麼
  useEffect(() => {
    if (!memberAuth.auth && dataLoaded) {
      alert("請先登入");
      router.push(`/restaurant-member/member-login`);
    }
  }, [memberAuth, dataLoaded]);

  // eyeopened
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });
  // rhf
  const onSubmit = async (data) => {
    console.log(data);
    try {
      // const isValid = await profileSchema.isValid(data)
      // console.log(isValid)
      const response = await axios.put(
        "http://localhost:3002/api/restaurant/member-info-update",
        data,
        {
          headers: {
            Authorization: "Bearer " + memberAuth.result.token,
          },
        }
      );
      console.log("Updated Response:", response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  // upload

  return (
    <>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <h2 style={{ color: "#985637" }}>餐廳資料維護</h2>
          <form
            className="d-flex flex-column justify-content-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="d-flex flex-column my-3">
              <label className="fs18b" htmlFor="email">
                電子信箱
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.email?.message}
                </span>
              </label>
              <input
                className="input-res"
                type="text"
                {...register("email")}
                id="email"
                placeholder="請輸入正確的email格式"
                defaultValue={fetchedData[0].restaurant_email}
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="password">
                密碼
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.password?.message}
                </span>
              </label>
              <div className="withIcon position-relative">
                <input
                  className="input-res w-100"
                  type={inputType}
                  {...register("password")}
                  id="password"
                />
                <span
                  className="eye position-absolute mt-1 me-2 end-0"
                  style={{ fontSize: "20px", color: "#B4C5D2" }}
                  onClick={() => {
                    setInputType(
                      inputType === "password" ? "text" : "password"
                    );
                  }}
                >
                  {inputType === "password" ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </div>
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="rePassword">
                密碼確認
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.rePassword?.message}
                </span>
              </label>
              <div className="withIcon position-relative">
                <input
                  className="input-res w-100"
                  type={reInputType}
                  {...register("rePassword")}
                  id="rePassword"
                />
                <span
                  className="eye position-absolute mt-1 me-2 end-0"
                  style={{ fontSize: "20px", color: "#B4C5D2" }}
                  onClick={() => {
                    reSetInputType(
                      reInputType === "password" ? "text" : "password"
                    );
                  }}
                >
                  {reInputType === "password" ? (
                    <FaRegEyeSlash />
                  ) : (
                    <FaRegEye />
                  )}
                </span>
              </div>
            </div>

            <button className="btn btn-big mt-4 ms-auto" type="submit">
              確認修改
            </button>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  );
}
