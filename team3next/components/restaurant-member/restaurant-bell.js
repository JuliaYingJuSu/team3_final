import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMemberAuthContext } from "./hooks/use-memberauth-context";
export default function NotificationBell() {
  const [newCount, setNewCount] = useState(0);
  const { memberAuth, setMemberAuth } = useMemberAuthContext();
  const fetchData = async () => {
    console.log("initial", memberAuth);
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
      setNewCount(
        (prevNewCount) =>
          setNewCount(Math.max(prevNewCount - response.data.total_records, 0))
        // 返回最大值，所以不會有負數
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [memberAuth]);

  useEffect(() => {
    console.log(newCount);
  }, [newCount]);
  return (
    <>
      <div className="dropdown">
        <button
          type="button"
          className="btn position-relative me-3 "
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="icon-bell" style={{ fontSize: "32px" }}></span>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            <span style={{ fontSize: "12px", color: "white" }}>{newCount}</span>
            <span className="visually-hidden">New alerts</span>
          </span>
        </button>
        <ul className="dropdown-menu">
          {/* start map */}
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Action two
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Action three
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
