import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useMemberAuthContext } from "./hooks/use-memberauth-context";

export default function openingHours() {
  const { memberAuth } = useMemberAuthContext();
  const [openingHours, setOpeningHours] = useState([]);
  const [checkedArray, setCheckedArray] = useState(Array(7).fill(false));
  const [refreshKey, setRefreshKey] = useState(0);
  const toggleCheckboxStates = (index) => {
    const newcheckedArray = [...checkedArray];
    newcheckedArray[index] = !checkedArray[index];
    setCheckedArray(newcheckedArray);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(watch());

  const fetchData = async () => {
    if (memberAuth && memberAuth.result.token) {
      const response = await axios.get(
        process.env.API_SERVER + "/api/restaurant/member-opening-hours",
        {
          headers: {
            Authorization: "Bearer " + memberAuth.result.token,
          },
        }
      );
      console.log("openinghours fetch result", response.data);

      setOpeningHours(response.data);
    }
  };

  const deleteData = async () => {
    if (memberAuth && memberAuth.result.token) {
      const response = await axios.delete(
        process.env.API_SERVER + "/api/restaurant/member-opening-hours-delete",
        {
          headers: {
            Authorization: "Bearer " + memberAuth.result.token,
          },
        }
      );
      console.log("delete result", response.data);

      setOpeningHours(response.data);
      Swal.fire({
        title: "刪除成功",
        text: "已成功刪除",
        icon: "success",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [memberAuth, refreshKey]);

  const onSubmit = async (data) => {
    const submitStr = "";
    const updateStr = "-update";

    try {
      const response = await axios.post(
        "http://localhost:3002/api/restaurant/member-opening-hours" +
          (openingHours[0] ? updateStr : submitStr),
        data,
        {
          headers: {
            Authorization: "Bearer " + memberAuth.result.token,
          },
        }
      );
      setRefreshKey((prevKey) => prevKey + 1);
      console.log("Server Response:", response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  const daysOfWeek = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const hoursOption = [];
  for (let i = 0; i < 24; i++) {
    const hm = dayjs().hour(i).minute(0).second(0);
    hoursOption.push(hm.format("HH:mm:ss"));
  }
  //  算出24小時陣列
  // console.log(hoursOption);
  return (
    <>
      <Head>
        <title>食食嗑嗑-營業時間管理</title>
      </Head>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h2 style={{ color: "#985637" }}>營業時間管理</h2>
          <form
            className="d-flex flex-column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="d-flex row gy-2">
              <div className="fs-5 mt-2">
                目前人數上限：{openingHours[0]?.max_capacity}
              </div>
              {Array.isArray(openingHours) && openingHours.length > 0 ? (
                openingHours.map((v, i) => {
                  return (
                    <ul className="col-3 list-group">
                      <li
                        className="me-5 list-group-item"
                        style={{ backgroundColor: "#FBF9EF" }}
                      >
                        {daysOfWeek[v.day_of_week]}
                      </li>
                      <li className="me-5 list-group-item">
                        開始營業時間：{v.start_time}
                      </li>
                      <li className="me-5 list-group-item">
                        結束營業時間：{v.end_time}
                      </li>
                    </ul>
                  );
                })
              ) : (
                <p className="fs-5 mt-2">尚未設定營業時間</p>
              )}
            </div>
            <lable
              htmlFor="limit"
              style={{ color: "#666666", fontSize: "22px" }}
              className="mt-3"
            >
              設置人數上限：
              <span>{watch("limit")}</span>
            </lable>
            <input
              type="range"
              {...register("limit")}
              className="w-50 form-range mb-3"
              min="0"
              max="50"
              id="limit"
            />

            {daysOfWeek.map((v, i) => {
              return (
                <div
                  className="row d-flex align-items-center flex-row bottom-line-g"
                  style={{ height: "100px" }}
                  key={i}
                >
                  <label
                    className="d-flex align-items-center flex-row d-block w-100 h-100"
                    htmlFor={`day${i}`}
                  >
                    <input
                      type="checkbox"
                      onClick={() => toggleCheckboxStates(i)}
                      checked={checkedArray[i]}
                      id={`day${i}`}
                      {...register(`weekday${i}`)}
                      value={i}
                    />
                    <span
                      className="ms-3 col-3"
                      style={{ color: "#666666", fontSize: "22px" }}
                    >
                      {v}
                    </span>
                    <div className="col-4"></div>
                    <div className="col-5 d-flex align-items-center justify-content-evenly flex-row">
                      <div className="d-flex flex-column">
                        <span className="fs16g">開始營業時間：</span>
                        <select
                          className="selector"
                          {...register(`startTime${i}`)}
                        >
                          <option value="">請選擇時間</option>
                          {/*修正bug： 因為 startime 名稱相同，所以只會傳送最後一筆名為 startTime 的資料。 */}
                          {hoursOption.map((v, i) => {
                            return (
                              <option key={i} value={v}>
                                {v}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fs16g">結束營業時間：</span>
                        <select
                          className="selector"
                          {...register(`endTime${i}`)}
                        >
                          <option value="">請選擇時間</option>
                          {hoursOption.map((v, i) => {
                            return (
                              <option key={i} value={v}>
                                {v}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </label>
                </div>
              );
            })}
            <div className="d-flex">
              <button
                onClick={deleteData}
                className="btn btn-big mt-4"
                type="button"
              >
                刪除營業時間
              </button>
              <button className="btn btn-big mt-4 ms-auto" type="submit">
                {openingHours.length > 0 ? "確認修改" : "新增營業時間"}
              </button>
            </div>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
}
