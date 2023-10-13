import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SelectFoodStyle() {
  const [foodItems, setFoodItems] = useState([
    {
      id: 1,
      name: "台式",
      img: "/images/food-1106513_1920.jpg",
      isChecked: false,
    },
    { id: 2, name: "中式", img: "/images/test/c1.jpg", isChecked: false },
    { id: 3, name: "日式", img: "/images/test/j1.jpg", isChecked: false },
    { id: 4, name: "韓式", img: "/images/test/k1.jpg", isChecked: false },
    { id: 5, name: "港式", img: "/images/test/h1.jpg", isChecked: false },
    { id: 6, name: "美式", img: "/images/test/a1.jpg", isChecked: false },
    { id: 7, name: "義式", img: "/images/test/i1.jpg", isChecked: false },
    { id: 8, name: "法式", img: "/images/test/f1.jpg", isChecked: false },
    { id: 9, name: "西式", img: "/images/test/e1.jpg", isChecked: false },
  ]);

  const handleCheckboxClick = (id) => {
    // 複製食物選項陣列，以免直接修改原始狀態
    const updatedFoodItems = foodItems.map((item) => {
      if (item.id === id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    setFoodItems(updatedFoodItems);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <>
      {foodItems.map((v, i) => {
        return (
          <div className="col ps-4">
            <div className="c-card middle" key={v.id}>
              <div className="mt-2">
                <div className="custom-control custom-checkbox image-checkbox">
                  <form>
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={`food_tag_${v.id}`}
                      name="likefoodtag[]"
                      value={v.id}
                      checked={v.isChecked}
                      onChange={() => {}}
                      {...register(`food_tag_${v.id}`)}
                    />
                    <label
                      className={`custom-icon-checkbox ${
                        v.isChecked ? "checked" : ""
                      }`}
                      htmlFor={`food_tag_${v.id}`}
                      onClick={() => {
                        handleCheckboxClick(v.id);
                      }}>
                      <img
                        src={v.img}
                        alt={v.name}
                        className="w-100 c-card-img"></img>
                      <i
                        className={`${
                          v.isChecked
                            ? "icon-heart-fill rounded-circle img-thumbnail"
                            : ""
                        }`}></i>
                    </label>
                  </form>
                </div>
                <div className="text-center pt-2">
                  <span className="fs-5 fw-bold">{v.name}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <style jsx>
        {`
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
        `}
      </style>
    </>
  );
}
