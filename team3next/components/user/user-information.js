import React from "react";
import UserButtonGroup from "./user-button-group";
import Styles from "./user-information.module.scss";
import AuthContext from "@/hooks/AuthContext";
import { useContext } from "react";

export default function UserInformation() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <div className={"container" + " " + `${Styles.bgc}`}>
        <div className={Styles.inputarea}>
          <div className="middle flex-column w-75">
            <dvi>
              <h4>會員資訊</h4>
            </dvi>
            <form className="mt-4">
              <fieldset disabled>
                <div className="mb-3">
                  <label
                    htmlFor="disabledTextInput"
                    className="form-label fs18b">
                    電子信箱( 此欄位不能變更){" "}
                  </label>
                  <input
                    type="text"
                    id="disabledTextInput"
                    className="form-control input-f"
                    value={auth.user_email}
                  />
                </div>
              </fieldset>
              <div className="mb-3">
                <label htmlFor="InputName" className="form-label fs18b">
                  姓名
                  <span style={{ color: "red" }} className="ps-1">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control input-f"
                  id="InputName"
                  value={auth.user_name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="InputNickName" className="form-label fs18b">
                  暱稱
                  <span style={{ color: "red" }} className="ps-1">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control input-f"
                  id="InputNickName"
                  value={auth.nickname}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="InputPassword" className="form-label fs18b">
                  密碼
                  <span style={{ color: "red" }} className="ps-1">
                    *
                  </span>
                </label>
                <input
                  type="password"
                  className="form-control input-f"
                  id="InputPassword"
                  value={auth.user_password}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="InputPhone" className="form-label fs18b">
                  手機號碼
                  <span style={{ color: "red" }} className="ps-1">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control input-f"
                  id="InputPhone"
                  value={auth.user_phone}
                />
              </div>
              <UserButtonGroup />
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-middle fs18b">
                  確認修改
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
