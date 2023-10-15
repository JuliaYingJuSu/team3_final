import { useState } from "react";
import Select from 'react-select';
import restaurantArray from "@/data/post_restaurant.json";

function PostRestaurant() {
  const options = restaurantArray.map((v,i)=> {
    return {
      value: v.post_restaurant_id,
      label: v.restaurant_name
    }
  })


  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption.value);
  };

  
  return (
    <Select onChange={handleChange} options={options} placeholder="請輸入餐廳名稱或者下拉選擇餐廳"  />
  )
}

export default PostRestaurant;