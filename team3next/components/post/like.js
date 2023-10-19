import React, { useState ,useContext} from "react";
import AuthContext from "@/hooks/AuthContext";
import Swal from "sweetalert2";

export default function Like({ ifLike, post_id }) {
  const [like, setLike] = useState(ifLike);
  const { auth } = useContext(AuthContext);

  const likeToggle = async () => {
    if (!auth?.user_id) {
      Swal.fire({
        title: "登入才能加入收藏喔",
        icon: "warning",
      });
    } else {
      try {
        const response = await fetch(
          `http://localhost:3002/api/post/toggle-like/${post_id}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        const data = await response.json();
        if (data?.action)
          if (data.action === "insert") {
            setLike(true);
          } else {
            setLike(false);
          }

        // router.push("/post");
      } catch (err) {
        console.error("Error", err);
      }
    }
  };

  return (
    <>
      <button
        className="btn btn-sm btn-i"
        onClick={likeToggle}
      >
        <i className={like ? "icon-heart-fill" : "icon-heart"}></i>
      </button>
    </>
  );
}
