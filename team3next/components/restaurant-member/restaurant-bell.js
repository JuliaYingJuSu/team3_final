import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMemberAuthContext } from "./hooks/use-memberauth-context";
import dayjs from "dayjs";
import Link from "next/link";

export default function NotificationBell() {
  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState(0);
  const [read, setRead] = useState(0);
  const { memberAuth, setMemberAuth } = useMemberAuthContext();
  const fetchData = async () => {
    try {
      if (memberAuth && memberAuth.result.token) {
        const response = await axios.get(
          process.env.API_SERVER + "/api/restaurant/member-orders-less",
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
        // 格式化日期
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const orderCount = async () => {
    if (memberAuth && memberAuth.result.token) {
      const response = await axios.get(
        "http://localhost:3002/api/restaurant/member-orders-count",
        {
          headers: {
            Authorization: "Bearer " + memberAuth.result.token,
          },
        }
      );
      console.log("notification", response.data.total_records);
      setCount(response.data.total_records);
      // setNewCount(
      //   (prevNewCount) =>
      //     setNewCount(Math.max(prevNewCount - response.data.total_records, 0))
      //   // 返回最大值，所以不會有負數
      // );
    }
  };

  const NotificationRead = async () => {
    const response = await axios.put(
      "http://localhost:3002/api/restaurant/member-orders-read",
      { off: 0 },
      {
        headers: {
          Authorization: "Bearer " + memberAuth.result.token,
        },
      }
    );
    console.log("read change", response.data.changedRows);
    setRead(response.data.changedRows);
  };

  useEffect(() => {
    orderCount();
    fetchData();
  }, [memberAuth, read]);

  useEffect(() => {
    console.log(count);
  }, [count]);
  return (
    <>
      <div className="dropdown">
        <button
          type="button"
          className="btn position-relative me-3 "
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span
            className="icon-bell"
            onClick={NotificationRead}
            style={{ fontSize: "32px" }}
          ></span>
          <span
            className={
              count
                ? "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                : "visually-hidden"
            }
          >
            <span
              className={count ? "" : "visually-hidden"}
              style={{ fontSize: "12px", color: "white" }}
            >
              {count}
            </span>
          </span>
        </button>
        <ul className="dropdown-menu">
          {/* start map */}
          {orders.map((v, i) => {
            return (
              <li style={{ border: "solid 1px lightgrey" }} key={i}>
                <div className="me-4">日期：{v.book_date}</div>
                <div className="me-4">時間：{v.book_time}</div>
                <div className="me-4">訂位人：{v.book_name}</div>
              </li>
            );
          })}
          <Link
            href={`/restaurant-member/${memberAuth.result.restaurant_id}/member-orders`}
            className="link-unstyled"
          >
            更多訂單...
          </Link>
        </ul>
      </div>
    </>
  );
}
