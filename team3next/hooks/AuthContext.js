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

  const [fav, setFav] = useState([])

  useEffect(() => {
    const jwt = localStorage.getItem("auth");
    if (jwt) {
      try {
        const myAuth = JSON.parse(jwt);
        setAuth(myAuth);
      } catch (ex) {}
    }
  }, []);
  useEffect(() => {
    if(auth.user_id){
    fetch(process.env.API_SERVER + `/api/post/fav`,{
      headers: {
        //Bearer後面一定要空一格
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setFav(r);
        console.log(212);
        console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });}
  }, [auth]);


  return (
    <AuthContext.Provider value={{ auth, setAuth, logout ,fav}}>
      {children}
    </AuthContext.Provider>
  );
};
