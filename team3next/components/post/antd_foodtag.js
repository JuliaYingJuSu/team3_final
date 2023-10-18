import React from 'react'
import foodtagArray from "@/data/food_tag.json";
import { Select, Space } from 'antd';
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const options = foodtagArray.map((v,i)=> {
    return {
      value: v.food_tag_id,
      label: v.food_tag_name
    }
  })


export default function AntdFoodtag() {
  
  return (
    <Select
      mode="multiple"
      style={{
                    width: 387,
                  }}
      placeholder="新增食記標籤 (可多選，最多5個)"
      onChange={handleChange}
      options={options}
    />
  )
}
