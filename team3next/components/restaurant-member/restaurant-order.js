import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMemberAuthContext } from "./hooks/use-memberauth-context";
import dayjs from "dayjs";

export default function MemberOrders() {
  const [orders, setOrders] = useState([]);
  const { memberAuth } = useMemberAuthContext();
  // states，context
  const [currentPage, setCurrentPage] = useState(1); // 當前頁碼
  const [pageSize, setPageSize] = useState(5); // 每頁顯示的數量
  const [totalPages, setTotalPages] = useState(1); // 總頁數
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // 分頁邏輯
  const { watch, register } = useForm();
  const filteredOrders = orders.filter((order) => {
    return order.book_name.includes(watch("search"));
  });
  const currentPageData = filteredOrders.slice(startIndex, endIndex);
  const fetchData = async () => {
    try {
      if (memberAuth && memberAuth.result.token) {
        const response = await axios.get(
          process.env.API_SERVER + "/api/restaurant/member-orders",
          {
            headers: {
              Authorization: "Bearer " + memberAuth.result.token,
            },
          }
        );
        console.log("fetch result:", response.data);
        const formattedData = response.data.map((obj) => {
          const newObj = { ...obj };
          // 對book_date屬性進行修改並賦值
          newObj.book_date = dayjs(obj.book_date).format("YYYY-MM-DD");
          return newObj;
        });
        setOrders(formattedData);
        const totalItems = filteredOrders.length; // 數據總數
        setTotalPages(Math.ceil(totalItems / pageSize)); // 更新總頁數
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
    <>
      <Head>
        <title>食食嗑嗑-餐廳訂單管理</title>
      </Head>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h2 style={{ color: "#985637" }}>餐廳訂單管理</h2>
          <input
            className="mb-4"
            type="text"
            {...register("search")}
            placeholder="搜索訂位人"
          />
          <div className="accordion  " id="orders">
            {currentPageData.map((v, i) => {
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
            <div className="pagination mt-4">
              <button
                className="btn btn-big"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                上一頁
              </button>
              <span className="fs-5 mx-2">{currentPage}</span>
              <button
                className="btn btn-big"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                下一頁
              </button>
            </div>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
}
