import React from "react";
import { Select } from "antd";
import restaurantArray from "@/data/post_restaurant.json";

const onSearch = (value) => {
  console.log("search:", value);
};

const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  
const options = restaurantArray.map((v, i) => {
  return {
    value: v.post_restaurant_id,
    label: v.restaurant_name,
  };
});

// const handleChange = (selectedOption) => {
//   console.log(selectedOption);
//   setSelectedOption(selectedOption);
// };

export default function AntdRestaurant({ selectedOption, setSelectedOption }) {
  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
  };

  return (
    <Select
      showSearch
      placeholder="下拉選擇餐廳"
      optionFilterProp="children"
      onChange={handleChange}
      onSearch={onSearch}
      filterOption={filterOption}
      style={{
        width: 387,
      }}
      options={options}
    />
  );
}
