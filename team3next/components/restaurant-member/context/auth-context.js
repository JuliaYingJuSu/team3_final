import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
export const MemberAuthContext = createContext();

export const MemberAuthProvider = ({ children }) => {
  const router = useRouter();
  const [memberAuth, setMemberAuth] = useState({ auth: "", result: "" });
  console.log(memberAuth);
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

  useEffect(() => {
    if (memberAuth) {
      console.log("finally changed", memberAuth);
    }
  }, [memberAuth]);

  return (
    <MemberAuthContext.Provider value={{ memberAuth, setMemberAuth, logOut }}>
      {children}
    </MemberAuthContext.Provider>
  );
};
