import { useState } from "react";
import Select from "react-select";
import restaurantArray from "@/data/post_restaurant.json";
import "./select.module.css";

function PostRestaurant() {
  const options = restaurantArray.map((v, i) => {
    return {
      value: v.post_restaurant_id,
      label: v.restaurant_name,
    };
  });

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption.value);
  };

  return (
    <>
      <Select
        onChange={handleChange}
        options={options}
        placeholder="請輸入餐廳名稱或者下拉選擇餐廳"
        style={{width: '300px'}}
        autoFocus={true} className="custom-select" 
      />
      {/* <style jsx>
        {`
          .select {
            width: calc(100%-42px);
          }
        `}
      </style> */}
    </>
  );
}

export default PostRestaurant;
