import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
export const MemberAuthContext = createContext();
import Swal from "sweetalert2";

export const MemberAuthProvider = ({ children }) => {
  const router = useRouter();
  const [memberAuth, setMemberAuth] = useState({ auth: "", result: "" });

  const logOut = () => {
    localStorage.removeItem("token");
    setMemberAuth({ auth: "", result: "" });
    Swal.fire({
      title: "登出成功",
      text: "已成功登出",
      icon: "success",
    });
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
        logOut,
      }}
    >
      {children}
    </MemberAuthContext.Provider>
  );
};
