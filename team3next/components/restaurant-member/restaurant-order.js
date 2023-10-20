import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMemberAuthContext } from "./hooks/use-memberauth-context";
import dayjs from "dayjs";

export default function MemberOrders() {
  const [orders, setOrders] = useState([]);
  const { memberAuth, setMemberAuth, googleAuth, setGoogleAuth } =
    useMemberAuthContext();
  const fetchData = async () => {
    try {
      if (memberAuth && memberAuth.result.token) {
        const response = await axios.get(
          "http://localhost:3002/api/restaurant/member-orders",
          {
            headers: {
              Authorization: "Bearer " + memberAuth.result.token,
            },
          }
        );
        console.log("fetch result:", response.data);
        const formattedData = response.data.map((obj) => {
          const newObj = { ...obj };
          // 对book_date属性进行修改并赋值
          newObj.book_date = dayjs(obj.book_date).format("YYYY-MM-DD");
          return newObj;
        });
        setOrders(formattedData);
        // 格式化日期
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [memberAuth]);

  // const dateFommater = (date) => dayjs(date,"YYYY-MM-DD")

  return (
    // orders.map
    <>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h2 style={{ color: "#985637" }}>餐廳訂單管理</h2>
          <div className="accordion  " id="orders">
            {orders.map((v, i) => {
              const date = dayjs(v.book_date, "YYYY-MM-DD");
              return (
                <div className="accordion-item mb-1" key={i}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button fs-5"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#item${i}`}
                      aria-expanded="false"
                      style={{
                        backgroundColor: "#ebd8a9 ",
                        borderRadius: "10px",
                      }}
                    >
                      <span className="me-4">日期：{v.book_date}</span>
                      <span className="me-4">時間：{v.book_time}</span>
                      <span className="me-4">訂位人：{v.book_name}</span>
                    </button>
                  </h2>
                  <div
                    id={`item${i}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#orders"
                  >
                    <div className="">
                      <ul className="mt-3 ms-4">
                        <li className="mb-2 fs-5">
                          大人：{v.book_num_adult}位
                        </li>
                        <li className="mb-2 fs-5">小孩：{v.book_num_kid}位</li>
                        <li className="mb-2 fs-5">電話：{v.book_phone}</li>
                      </ul>
                      <p className="fs-5 ms-4 ">備註:{v.book_note}</p>
                    </div>
                    <div className="accordion-body"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
}
