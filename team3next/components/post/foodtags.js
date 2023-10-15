import { useState } from "react";
import Select from 'react-select';
import foodtagArray from "@/data/food_tag.json";

function FoodTags() {
  const options = foodtagArray.map((v,i)=> {
    return {
      value: v.food_tag_id,
      label: v.food_tag_name
    }
  })
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption.value);
  };

  

  return (
    <Select onChange={handleChange} options={options} placeholder="新增食記標籤 (可多選，最多五個)" isMulti  />
  )
}

export default FoodTags;