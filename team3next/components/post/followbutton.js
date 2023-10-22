import React, {useState, useContext, useEffect} from 'react'
import AuthContext from "@/hooks/AuthContext";
import Swal from "sweetalert2";

export default function FollowButton({ifFollow, user_id}) {
  //follow true增加
  //follow false刪除
  // console.log(ifFollow);
  const { auth } = useContext(AuthContext);
  const [follow, setFollow] = useState(ifFollow);
  useEffect(()=>{setFollow(ifFollow)},[ifFollow])


  const followToggle = async () => {
    if (!auth?.user_id) {
      Swal.fire({
        title: "登入才能加入追蹤喔",
        icon: "warning",
      });
      // router.push("/user/login");
    } else {
      try {
        const response = await fetch(
          `http://localhost:3002/api/post/toggle-follow/${user_id}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        const data = await response.json();
        if (data?.action)
          if (data.action === "insert") {
            setFollow(true);
          } else {
            setFollow(false);
          }

       
      } catch (err) {
        console.error("Error", err);
      }
    }
  };
  
  return (
    <>
      <button
                    className="btn btn-little ms-auto"
                    onClick={followToggle}
                  >
                    {follow ? '追蹤中' : '追蹤'}
                  </button>
    </>
  )
}
