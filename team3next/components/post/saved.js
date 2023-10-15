import React, { useState } from "react";

export default function Saved() {
  const [saved, setSaved] = useState(false);

  // const handleFav = (post_id) => {
  //   if (!saved.includes(post_id)) {
  //     // console.log(post_id);
  //     fetch("http://localhost:3002/api/product/add-fav", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         pid: post_id,
  //         uid: JSON.parse(localStorage.getItem("auth")).user_id,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((r) => r.json())
  //       .then((r) => {
  //         console.log(r); //true
  //         if (r) {
  //           location.reload();
  //         }
  //       })
  //       .catch((ex) => {
  //         console.log(ex);
  //       });
  //   }
  //   if (saved.includes(post_id)) {
  //     fetch("http://localhost:3002/api/product/del-fav", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         pid: post_id,
  //         uid: JSON.parse(localStorage.getItem("auth")).user_id,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((r) => r.json())
  //       .then((r) => {
  //         console.log(r); //true
  //         if (r) {
  //           location.reload();
  //         }
  //       })
  //       .catch((ex) => {
  //         console.log(ex);
  //       });
  //   }
  // };

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
