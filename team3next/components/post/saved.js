import React, { useState,useContext } from "react";
import AuthContext from "@/hooks/AuthContext";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";

export default function Saved({ifSave, post_id}) {
  const [saved, setSaved] = useState(ifSave);
  const { auth } = useContext(AuthContext);
  const router = useRouter()

  const favToggle  = async()=>{
    if(auth.user_id === ""){
      Swal.fire({
        title: "請先登入",
        icon: "warning",
      });
      router.push("/user/login");
    }else{
      try {
        const response = await axios.post(`/api/post/toggle-fav/${post_id}`);
        const data = response.data;

        if (data.action === 'insert') {
          setSaved(true);
        } else if (data.action === 'delete') {
          setSaved(false);
        }

        router.push("/post");
      } catch (err) {
        console.error("Error", err);
    }
  }
}
  
  return (
    <>
      <button
        className="btn btn-sm btn-i"
        onClick={favToggle
            } 
      >
        <i className={saved ? "icon-mark-fill" : "icon-mark"}></i>
      </button>
    </>
  );
}
