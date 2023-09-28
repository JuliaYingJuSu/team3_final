import { useState } from "react";

export default function SelectFoodStyle() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="middle sfsbc">
        <h4>請先選擇您喜愛的食物樣式(可多選)</h4>
        <div className="ficb">
          <div className="middle">
            <div className="c-card middle">
              <div className="mt-2">
                <div className="custom-control custom-checkbox image-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="ck1a"
                  />
                  <label className="custom-control-label" for="ck1a">
                    <img
                      src="/images/food-1106513_1920.jpg"
                      alt="台式"
                      className="w-100 c-card-img image-checkbox"></img>
                  </label>
                </div>
                <div>
                  <span className="c-card-text fs18b pb-4">台式</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                <i className={`${isChecked ? "icon-heart-fill" : ""}`}></i>
              </label>
            </div>
            <div>
              <span className="c-card-text fs18b pb-4">台式</span>
            </div>
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
        .c-card-text {
          display: flex;
          width: 43px;
          height: 49px;
          flex-direction: column;
          justify-content: center;
        }

        /* 隐藏原始的多選框 */
        .custom-control-input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        /* 设置label的样式，例如图标和边框 */
        .custom-icon-checkbox {
          display: inline-block;
          cursor: pointer;
          position: relative; /* 为了定位图标 */
          border: 2px solid transparent; /* 初始状态下，边框透明 */
          transition: border-color 0.2s; /* 边框颜色渐变效果 */
        }

        /* 添加图标字体样式 */
        .custom-icon-checkbox i {
          font-size: 24px; /* 设置图标的大小 */
          position: absolute; /* 使图标相对于父元素定位 */
          bottom: 5px; /* 距离底部的距离 */
          right: 5px; /* 距离右边的距离 */
        }

        /* 当复选框被选中时，修改图标的样式和外框颜色 */
        .custom-control-input:checked + .custom-icon-checkbox {
          border-radius: 164px;
          border: 3px solid var(--FF4F00, #ff4f00); /* 选中时的外框颜色 */
        }
        /* /* 当复选框被选中时，修改图标的样式 */
        
      `}</style>
    </>
  );
}
