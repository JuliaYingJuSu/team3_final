import React from "react";
import foodtagArray from "@/data/food_tag.json";
import { Select} from "antd";

const options = foodtagArray.map((v, i) => {
  return {
    value: v.food_tag_id,
    label: v.food_tag_name,
  };
});

// const handleChange = (selectedOptions) => {
//   console.log(selectedOptions);
//   setSelectedOptions(selectedOptions);
// };

export default function AntdFoodtag({selectedOptions, setSelectedOptions}) {
  const handleChange = (selectedOptions) => {
    console.log(selectedOptions);
    setSelectedOptions(selectedOptions);
  };
  

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
  );
}
