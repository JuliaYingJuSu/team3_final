import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";

export default function OpeningHours() {
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

  // useEffect(() => {
  //     const subscription = watch(data =>
  //       console.log(data)
  //     )
  //     return () => subscription.unsubscribe()
  //   }, [watch])
  //   監視成功，和submit時候相同，沒有問題

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("http://localhost:3002/try-post", data);
      console.log("Server Response:", response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const daysOfWeek = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日",
  ];
  const hoursOption = [];
  for (let i = 0; i < 24; i++) {
    const hm = dayjs().hour(i).minute(0);
    hoursOption.push(hm.format("HH:mm"));
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
            {daysOfWeek.map((v, i) => {
              return (
                <motion.div
                  className="row d-flex align-items-center flex-row bottom-line-g"
                  style={{ height: "100px" }}
                  key={i}
                  initial={{ backgroundColor: "#FFFFFF", height: "100px" }}
                  animate={
                    checkedArray[i]
                      ? { backgroundColor: "#FBF9EF", height: "125px" }
                      : { backgroundColor: "#FFFFFF", height: "100px" }
                  }
                  transition={{ type: "spring", stiffness: 30 }}
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
                      {...register(`weekday${i == 6 ? i - 6 : i + 1}`)}
                      value={i == 6 ? i - 6 : i + 1}
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
                          {...register(`startTime${i == 6 ? i - 6 : i + 1}`)}
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
                          {...register(`endTime${i == 6 ? i - 6 : i + 1}`)}
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
                </motion.div>
              );
            })}
            <button className="btn btn-big mt-4 ms-auto" type="submit">
              確認修改
            </button>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
}
