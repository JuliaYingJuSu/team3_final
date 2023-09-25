import axios from "axios";
import React from "react";
import { useState } from "react";

export default function ClassicForm() {
  const [input, SetInput] = useState({ account: "", password: "" });
  const handleChange = (e) => {
    SetInput({...input,[e.target.name]:e.target.value})
    console.log(input)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3002/try-post', input
      );
      // 处理服务器响应
      console.log('Server Response:', response.data);
    } catch (error) {
      // 处理请求错误
      console.error('Error:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="account" value={input.account} onChange={
        handleChange
      }  />
      <div></div>
      <input type="text" name="password" value={input.password} onChange={
        handleChange
      } />
      <div></div>
      <button type="submit">Send</button>
    </form>
  );
}