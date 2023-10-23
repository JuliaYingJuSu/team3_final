import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";
import { useMemberAuthContext } from "./hooks/use-memberauth-context";

export default function openingHours() {
  const { memberAuth } = useMemberAuthContext();
  const [openingHours, setopeningHours] = useState([]);
  const [checkedArray, setCheckedArray] = useState(Array(7).fill(false));
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
        "http://localhost:3002/api/restaurant/member-opening-hours",
        {
          headers: {
            Authorization: "Bearer " + memberAuth.result.token,
          },
        }
      );
      console.log("openinghours fetch result", response.data);

      setopeningHours(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [memberAuth]);

  const onSubmit = async (data) => {
    console.log("upload", entries);
    const submitStr = "";
    const updateStr = "-update";

    try {
      const response = await axios.post(
        "http://localhost:3002/api/restaurant/member-opening-hours" +
          (openingHours[0] ? updateStr : submitStr),
        { limit: data.limit, entries: entries }, // 修改为传递entries数组和其他数据
        {
          headers: {
            Authorization: "Bearer " + memberAuth.result.token,
          },
        }
      );
      console.log("Server Response:", response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // useEffect(() => {
  //   if (openingHours && openingHours.day_of_week) {
  //     let tempCheckedArray = Array(7).fill(false);
  //     for (let i = 0; i < 7; i++) {
  //       if (openingHours.day_of_week[i]) {
  //         tempCheckedArray[i] = true;
  //       }
  //     }
  //     setCheckedArray(tempCheckedArray);
  //   }
  // }, [openingHours]);

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
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h2 style={{ color: "#985637" }}>營業時間管理</h2>
          <form
            className="d-flex flex-column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <lable
              htmlFor="limit"
              style={{ color: "#666666", fontSize: "22px" }}
            >
              人數上限：
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
                      checked={
                        openingHours?.day_of_week?.[i]
                          ? !checkedArray[i]
                          : checkedArray[i]
                      }
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
                    <div className="col-2"></div>
                    <div className="col-7 d-flex align-items-center justify-content-evenly flex-row">
                      <div className="d-flex flex-column">
                        <span className="fs16g">開始營業時間：</span>
                        <select
                          className="selector"
                          {...register(`startTime${i}`)}
                        >
                          <option value="">{"請選擇時間"}</option>
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
                          <option value="">{"請選擇時間"}</option>
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
            <button className="btn btn-big mt-4 ms-auto" type="submit">
              {openingHours.length > 0 ? "確認修改" : "新增營業時間"}
            </button>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
}
