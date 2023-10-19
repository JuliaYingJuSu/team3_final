import React from "react";
import { useMemberAuthContext } from "./hooks/use-memberauth-context";
import axios from "axios";
export default function GoogleLogin() {
  const { googleAuth, setGoogleAuth } = useMemberAuthContext();
  const googleResponse = async () => {
    const response = await axios.get(
      "http://localhost:3002/auth/google-member"
    );
    console.log(response.data);
    setGoogleAuth(response.data);
    if (googleAuth.googleId) {
      router.push(`/restaurant-member/member-login`);
    }
  };
  return (
    <>
      <h1>認證成功，點擊下方按鈕繼續登入</h1>
      <button onClick={googleResponse}>登入</button>
    </>
  );
}
