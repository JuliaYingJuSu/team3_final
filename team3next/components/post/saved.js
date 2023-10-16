import React, { useState } from "react";

export default function Saved({ifSave}) {
  const [saved, setSaved] = useState(ifSave);

  return (
    <>
      <button
        className="btn btn-sm btn-i"
        onClick={() => {
          setSaved(!saved);
        }}
        // onClick={() => {
        //   handleFav(post_id);
        // }}
      >
        <i className={saved ? "icon-mark-fill" : "icon-mark"}></i>
      </button>
    </>
  );
}
