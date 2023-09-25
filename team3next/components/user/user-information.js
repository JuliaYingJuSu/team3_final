import React from "react";
import UserButtonGroup from "./user-button-group";
import Styles from "./user-information.module.scss";

export default function UserInformation() {
  return (
    <>
      <div className={"container" + " " + `${Styles.bgc}`}>
        <div className={Styles.inputarea}>
          <div className="middle flex-column w-100">
            <dvi>
              <h4>會員資訊</h4>
            </dvi>
            <form className="mt-4">
              <fieldset disabled>
                <div className="mb-3">
                  <label for="disabledTextInput" className="form-label fs18b">
                    電子信箱( 此欄位不能變更){" "}
                  </label>
                  <input
                    type="text"
                    id="disabledTextInput"
                    className="form-control input-f"
                    placeholder="test@gmail.com"
                  />
                </div>
              </fieldset>
              <div className="mb-3">
                <label for="InputName" className="form-label fs18b">
                  姓名
                  <span style={{ color: "red" }} className="ps-1">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="InputName"
                  placeholder="請輸入姓名"
                />
              </div>
              <div className="mb-3">
                <label for="InputNickName" className="form-label fs18b">
                  暱稱
                  <span style={{ color: "red" }} className="ps-1">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="InputNickName"
                  placeholder="請輸入暱稱"
                />
              </div>
              <div className="mb-3">
                <label for="InputPassword" className="form-label fs18b">
                  密碼
                  <span style={{ color: "red" }} className="ps-1">
                    *
                  </span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="InputPassword"
                  placeholder="請輸入英文+數字至少8碼"
                />
              </div>
              <div className="mb-3">
                <label for="InputPhone" className="form-label fs18b">
                  手機號碼
                  <span style={{ color: "red" }} className="ps-1">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="InputPhone"
                  placeholder="請輸入09開頭共10碼的數字"
                />
              </div> 
                <UserButtonGroup />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
