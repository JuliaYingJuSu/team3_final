import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

export default function ClassicForm() {
  const [input, SetInput] = useState({ account: "", password: "" });
  const handleChange = (e) => {
    SetInput({ ...input, [e.target.name]: e.target.value });
    console.log(input);
  };
  const genre = ["boy", "girl", "futa"];
  const [sex, setSex] = useState(["futa"]);

  const cityArray =["taipei","keelung","newpei"]
  const [city,setCity] = useState('')


///
const requestData = {
  userInfo: {
    account: input.account,
    password: input.password,
  },
  selectedGenres: sex,
  selectedCity: city,
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3002/try-post", requestData);
      console.log("Server Response:", res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect(() => {
  //   handleSubmit();
  // }, [input]);
  // 傳送資料不需要

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="account"
        value={input.account}
        onChange={handleChange}
      />
      <div></div>
      <input
        type="text"
        name="password"
        value={input.password}
        onChange={handleChange}
      />
      <div></div>
      {genre.map((v, i) => {
        return (
          <label htmlFor={v} key={i}>
            <input
              id={v}
              type="checkbox"
              value={v}
              checked={sex.includes(v)}
              onChange={(e) => {
                if (sex.includes(e.target.value)) {
                  const newSex = sex.filter((v2) => v2 !== e.target.value);
                  setSex(newSex);
                }
                else{setSex([...sex,e.target.value])}
              }}
            />
            {v}
          </label>
        );
      })}
      <div></div>
      <select value={city} onChange={(e)=>{setCity(e.target.value)}} name="city" id="">
        {cityArray.map((v,i)=>{return(<option key={i} value={v}>{v}</option>)})}
      </select>
      <button type="submit">Send</button>
    </form>
  );
}
