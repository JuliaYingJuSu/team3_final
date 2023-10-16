import React from "react";
import Link from "next/link";
import { useMemberAuthContext } from "./hooks/use-memberauth-context";

export default function RestaurantSidebar() {
  const { memberAuth, setMemberAuth, logOut } = useMemberAuthContext();
  return (
    <>
      <div
        className=" btn-group-vertical mt-5"
        role="group"
        aria-label="Vertical button group"
      >
        <button
          type="button"
          className="btn d-flex justify-content-center px-4 mb-3"
        >
          <div className="d-flex justify-content-between w-100 ">
            <span
              className="icon-member me-2"
              style={{ fontSize: "32px" }}
            ></span>
            <div
              className="option justify-content-center"
              style={{ width: "140px" }}
            >
              <Link
                className="stretched-link text-dark"
                href={`/restaurant-member/${memberAuth.result.restaurant_id}/profile`}
              >
                會員資料管理
              </Link>
            </div>
          </div>
        </button>
        <button
          type="button"
          className="btn d-flex justify-content-center px-4 mb-3"
        >
          <div className="d-flex justify-content-between w-100">
            <span
              className="icon-edit me-2"
              style={{ fontSize: "32px" }}
            ></span>
            <div
              className="option justify-content-center"
              style={{ width: "140px" }}
            >
              <Link
                className="stretched-link text-dark"
                href={`/restaurant-member/${memberAuth.result.restaurant_id}/page-content`}
              >
                餐廳資料維護
              </Link>
            </div>
          </div>
        </button>
        <button
          type="button"
          className="btn d-flex justify-content-center px-4 mb-3"
        >
          <div className="d-flex justify-content-between w-100">
            <span
              className="icon-bell me-2"
              style={{ fontSize: "32px" }}
            ></span>
            <div
              className="option justify-content-center"
              style={{ width: "140px" }}
            >
              <Link
                className="stretched-link text-dark"
                href={`/restaurant-member/${memberAuth.result.restaurant_id}/orders`}
              >
                餐廳訂單管理
              </Link>
            </div>
          </div>
        </button>
        <button
          type="button"
          className="btn d-flex justify-content-center px-4 mb-3"
        >
          <div className="d-flex justify-content-between w-100">
            <span
              className="icon-payment me-2"
              style={{ fontSize: "28px" }}
            ></span>
            <div
              className="option justify-content-center"
              style={{ width: "140px" }}
            >
              <Link
                className="stretched-link text-dark"
                href={`/restaurant-member/${memberAuth.result.restaurant_id}/opening-hours`}
              >
                營業時間管理
              </Link>
            </div>
          </div>
        </button>
        <button
          type="button"
          className="btn d-flex justify-content-center px-4 mb-3"
        >
          <div className="d-flex justify-content-between w-100">
            <div
              className="option justify-content-center"
              style={{ width: "140px" }}
            >
              <span
                className="stretched-link text-dark"
                onClick={() => {
                  logOut();
                }}
              >
                登出
              </span>
            </div>
          </div>
        </button>
      </div>
      <style jsx>{`
        .option {
          font-size: 22px;
        }
        .icon-member:before,
        .icon-bell:before,
        .icon-edit:before,
        .icon-payment:before {
          color: black;
        }

        button:hover {
          border-bottom: 3px solid #b6705e !important;
        }
      `}</style>
    </>
  );
}
