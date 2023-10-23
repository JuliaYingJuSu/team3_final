import React, { useState, useContext ,useEffect} from "react";
import AuthContext from "@/hooks/AuthContext";
import Swal from "sweetalert2";



export default function Saved({ ifSave, post_id }) {
  // console.log(post_id);
  // console.log(ifSave);
  const [saved, setSaved] = useState(ifSave);
  const { auth } = useContext(AuthContext);
  useEffect(()=>{setSaved(ifSave)},[ifSave])
// if(post_id==40){console.log(saved)}

  const favToggle = async () => {
    if (!auth?.user_id) {
      Swal.fire({
        title: "登入才能加入收藏喔",
        icon: "warning",
      });
      // router.push("/user/login");
    } else {
      try {
        const response = await fetch(
          `http://localhost:3002/api/post/toggle-fav/${post_id}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        const data = await response.json();
        if (data?.action)
          if (data.action === "insert") {
            setSaved(true);
          } else {
            setSaved(false);
          }

        // router.push("/post");
      } catch (err) {
        console.error("Error", err);
      }
    }
  };

  return (
    <>
      <button className="btn btn-sm btn-i" onClick={favToggle}>
        <i className={saved ? "icon-mark-fill" : "icon-mark"}></i>
      </button>
    </>
  );
}
