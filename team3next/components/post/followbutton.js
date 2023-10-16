import React, {useState, useContext} from 'react'
import AuthContext from "@/hooks/AuthContext";

export default function FollowButton({ifFollow}) {
  //follow true增加
  //follow false刪除
  const { auth } = useContext(AuthContext);
  const [follow, setFollow] = useState(ifFollow);
  
  return (
    <>
      <button
                    className="btn btn-little ms-auto"
                    onClick={() => {
                      if (auth.user_id == ""){ alert("please log in")} else{
                        if (follow){setFollow(!follow);
                      // delfollow()
                      }
                      else{
                        setFollow(!follow)

                        // addfollow()
                      }
                        
                    }}}
                  >
                    {follow ? '追蹤中' : '追蹤'}
                  </button>
    </>
  )
}
