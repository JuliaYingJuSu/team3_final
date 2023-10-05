import React, { useState } from "react";

export default function Like() {
  const [like, setLike] = useState(false);
  return (
    <>
      <button
        className="btn btn-sm btn-i"
        onClick={() => {
          setLike(!like);
        }}
      >
        <i className={like ? "icon-heart-fill" : "icon-heart"}></i>
      </button>
    </>
  );
}
