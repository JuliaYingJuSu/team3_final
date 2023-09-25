import axios from "axios";
import React from "react";
import { useState } from "react";

export default function ClassicForm() {
  const [input, SetInput] = useState({ account: "", password: "" });
  const handleChange = (e) => {
    SetInput({ ...input, [e.target.name]: e.target.value });
    console.log(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3002/try-post", input);
      console.log("Server Response:", res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
      <button type="submit">Send</button>
    </form>
  );
}
