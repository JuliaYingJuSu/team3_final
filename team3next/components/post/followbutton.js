import React, {useState} from 'react'

export default function FollowButton() {
  const [follow, setFollow] = useState(false);

  return (
    <>
      <button
                    className="btn btn-little ms-auto"
                    onClick={() => {
                      setFollow(!follow);
                    }}
                  >
                    {follow ? '追蹤中' : '追蹤'}
                  </button>
    </>
  )
}
