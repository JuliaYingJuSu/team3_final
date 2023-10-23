import React from "react";
import Switch from "react-switch";
import { useState, useEffect } from "react";
import router from "next/router";

export default function Toggle() {
  const [checked, setChecked] = useState(false);

  //從localStorage拿開關狀態
  useEffect(() => {
    const savedState = localStorage.getItem("switchState");
    if (savedState !== null) {
      setChecked(JSON.parse(savedState));
    }
  }, []);

  const handleChange = () => {
    setChecked(!checked);

    // 開關狀態存到localStorage
    localStorage.setItem("switchState", JSON.stringify(!checked));

    // 根據不同路徑轉換
    if (!checked) {
      router.push("/restaurant-member/member-login");
    } else {
      router.push("/user/login");
    }
  };

  return (
    <>
      <div className="middle">
        <span className="user-login me-2">會員登入</span>
        <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
          onColor="rgb(205, 205, 205)"
          onHandleColor="#3F4C5C"
          offHandleColor="#985637"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
        />
        <span className="member-login ms-2">廠商登入</span>
      </div>
      <style jsx>
        {`
          .react-switch {
            vertical-align: middle;
            margin-left: 4px;
          }
          .user-login {
            color: #985637;
            font-size: 32px;
            font-weight: 700;
          }
          .member-login {
            font-size: 32px;
            font-weight: 700;
            color: #3f4c5c;
          }
        `}
      </style>
    </>
  );
}
