import React from "react";
import { useState } from "react";

export default function ClassicForm() {
  const [input, SetInput] = useState({ account: "", password: "" });
  const handleChange = (e) => {
    SetInput({...input,[e.target.name]:e.target.value})
  }

  return (
    <form>
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
