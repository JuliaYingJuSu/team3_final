import React from "react";
import Switch from "react-switch";
import { useState } from "react";

export default function Toggle() {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
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
            offHandleColor="#AE4818"
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
          .user-login{
            color: #AE4818;
            font-size: 32px;
            font-weight: 700;
          }
          .member-login{
            font-size: 32px;
            font-weight: 700;
            color: #3F4C5C;
          }
        `}
      </style>
    </>
  );
}
