import { createContext, useState, useEffect } from "react";

export const MemberAuthContext = createContext();

// 老師是因為掛在頂層middleware才不需要路由，但你不是
export const MemberAuthProvider = ({ children }) => {
  const [memberAuth, setMemberAuth] = useState("");
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

  return (
    <MemberAuthContext.Provider value={{ memberAuth, setMemberAuth }}>
      {children}
    </MemberAuthContext.Provider>
  );
};
