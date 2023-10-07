import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export default AuthContext;

export const noLoginState = {
  useer_id: "",
  user_email: "",
  nickname: "",
  token: "",
};

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(noLoginState);
  console.log({ auth });

  //登出
  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(noLoginState);
  };

  useEffect(() => {
    const str = localStorage.getItem("auth");
    if (str) {
      try {
        const myAuth = JSON.parse(str);
        setAuth(myAuth);
      } catch (ex) {}
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 協助導入context用的(消費者consumer)的勾子
export const useAuth = () => useContext(AuthContext);
