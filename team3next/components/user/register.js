import { useState } from "react";

// 子頁面(區域)
import Register1 from "@/components/user/register01";
import Register2 from "@/components/user/register02";

export default function Register({ handleClose = () => {} }) {
  const maxSteps = 2;

  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState([]);

  // 狀態的範例，都集中在這裡接收
  const [userData, setUserData] = useState([]);

  const [foodtagid, setFoodTagID] = useState({
    isChecked1: "",
    isChecked2: "",
    isChecked3: "",
    isChecked4: "",
    isChecked5: "",
    isChecked6: "",
    isChecked7: "",
    isChecked8: "",
    isChecked9: "",
  });

  // 動態元件語法
  const components = [Register1, Register2];
  const BlockComponent = components[step - 1];

  // 下一步按鈕
  const next = () => {
    // 運送表單用檢查
    if (step === 2) {
      const {
        isChecked1,
        isChecked2,
        isChecked3,
        isChecked4,
        isChecked5,
        isChecked6,
        isChecked7,
        isChecked8,
        isChecked9,
      } = foodtagid;
      console.log(foodtagid);
    }
    // 沒錯誤才會到下一步
    if (step < maxSteps) setStep(step + 1);
  };
  return (
    <>
      {/* 子頁面區域 */}
      <div className="order-steps">
        <BlockComponent
          handleClose={handleClose}
          foodtagid={foodtagid}
          setFoodTagID={setFoodTagID}
        />
      </div>
      {/* 按鈕 */}
      {step !== 2 && (
        <div className="position-relative">
          <span style={{ position: "absolute", bottom: 20, left: 465 }}>
            <button className="btn fs-5 grey" onClick={next}>
              下次再選
            </button>
          </span>
          <div style={{ position: "absolute", bottom: 16, left: 600 }}>
            <button className="btn btn-middle fs-5" onClick={next}>
              確定選擇
            </button>
          </div>
        </div>
      )}
    </>
  );
}
