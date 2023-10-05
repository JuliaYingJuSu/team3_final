import React, { useState } from "react";

export default function Saved() {
  const [saved, setSaved] = useState(false);
  return (
    <>
      <button
        className="btn btn-sm btn-i"
        onClick={() => {
          setSaved(!saved);
        }}
      >
        <i className={saved ? "icon-mark-fill" : "icon-mark"}></i>
      </button>
    </>
  );
}
