import { useState } from "react";

export default function SelectFoodStyle() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="c-card middle">
        <div className="mt-2">
          <div className="custom-control custom-checkbox image-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="test"
              checked={isChecked}
              onChange={() => {}}
            />
            <label
              className={`custom-icon-checkbox ${isChecked ? "checked" : ""}`}
              htmlFor="test"
              onClick={handleCheckboxClick}>
              <img
                src="/images/food-1106513_1920.jpg"
                alt="台式"
                className="w-100 c-card-img"></img>
              <i
                className={`${
                  isChecked
                    ? "icon-heart-fill rounded-circle img-thumbnail"
                    : ""
                }`}></i>
            </label>
          </div>
          <div className="text-center pt-2">
            <span className="fs-5 fw-bold">台式</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .sfsbc {
          display: flex;
          padding: 10px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          background: linear-gradient(
            146deg,
            rgba(249, 231, 166, 0.8) 16.14%,
            #fff 92.53%
          );
        }
        .ficb {
          display: flex;
          padding: 0px 10px;
          justify-content: center;
          align-items: center;
          align-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        .c-card-img {
          width: 164px;
          height: 164px;
          border-radius: 164px;
          object-fit: cover;
        }
        .c-card {
          height: 220px;
          width: 170px;
          flex-direction: column;
          gap: 10px;
        }

        /* 隱藏原始的多選框 */
        .custom-control-input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        /* 變更label的樣式，邊框 */
        .custom-icon-checkbox {
          display: inline-block;
          cursor: pointer;
          position: relative; /* 定位圖示 */
          border: 3px solid transparent; /* 一開始邊框透明 */
        }

        /* 變更ICON樣式 */
        .custom-icon-checkbox i {
          font-size: 24px; /* ICON大小 */
          position: absolute; /* 定位ICON圖示 */
          bottom: 5px; /* 底部的間隔 */
          right: 10px; /* 右邊的間隔 */
        }

        /* 選取圖片時外框的樣式 */
        .custom-control-input:checked + .custom-icon-checkbox {
          border-radius: 164px;
          border: 5px solid #dc8b76; /* 選取時的外框顏色 */
        }
      `}</style>
    </>
  );
}
