import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
export const MemberAuthContext = createContext();

export const MemberAuthProvider = ({ children }) => {
  const router = useRouter();
  const [memberAuth, setMemberAuth] = useState({ auth: "", result: "" });
  const [googleAuth, setGoogleAuth] = useState({ username: "", googleId: "" });
  // const googleResponse = async () => {
  //   const response = await axios.get("/api/google-member");
  //   console.log(response.data);
  //   setGoogleAuth(response.data);
  //   if (googleAuth.googleId) {
  //     router.push(`/restaurant-member/${googleAuth.googleId}`);
  //   }
  // };
  const logOut = () => {
    localStorage.removeItem("token");
    setMemberAuth({ auth: "", result: "" });
    router.push("/restaurant-member/member-login");
  };
  useEffect(() => {
    const memberJwt = localStorage.getItem("token");
    if (memberJwt) {
      try {
        const parseMemberJwt = JSON.parse(memberJwt);
        setMemberAuth(parseMemberJwt);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // useEffect(() => {
  //   if (googleAuth.googleId) {
  //     router.push(`/restaurant-member/${googleAuth.googleId}`);
  //   }
  // }, [googleAuth.googleId]);

  useEffect(() => {
    if (memberAuth) {
      console.log("auth state changed", memberAuth);
    }
  }, [memberAuth]);

  return (
    <MemberAuthContext.Provider
      value={{
        memberAuth,
        setMemberAuth,
        googleAuth,
        setGoogleAuth,
        logOut,
      }}
    >
      {children}
    </MemberAuthContext.Provider>
  );
};
