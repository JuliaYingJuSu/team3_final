import React from 'react'
import { Select, Space } from 'antd';
import restaurantArray from "@/data/post_restaurant.json";

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
const options = restaurantArray.map((v, i) => {
  return {
    value: v.post_restaurant_id,
    label: v.restaurant_name,
  };
});


export default function AntdRestaurant() {
  return (
    <Select
    showSearch
    placeholder="下拉選擇餐廳"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
      
      style={{
        width: 387,
      }}
      
      options={options}
    />
  )
}
