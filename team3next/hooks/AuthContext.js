import { createContext, useEffect, useState } from "react";
import Router from "next/router";
import Swal from "sweetalert2";

const AuthContext = createContext({});

export default AuthContext;

export const noLoginState = {
  user_id: "",
  user_email: "",
  nickname: "",
  token: "",
};

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(noLoginState);
  console.log({ auth });

  // sweetalert設定
  const swal = Swal.mixin({
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (swal) => {
      swal.addEventListener("mouseenter", Swal.stopTimer);
      swal.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  //登出
  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    setAuth(noLoginState);
    swal.fire({
      title: "登出成功",
      icon: "success",
    });
    Router.push("/");
  };

  useEffect(() => {
    const jwt = localStorage.getItem("auth");
    if (jwt) {
      try {
        const myAuth = JSON.parse(jwt);
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
