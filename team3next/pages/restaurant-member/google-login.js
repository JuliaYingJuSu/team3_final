import React from "react";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

export default function App() {
  const [user, setUser] = useState({});
  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token" + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  };
  const handleSignOut = () => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };
  useEffect(() => {
    // global google
    google.accounts.id.initialize({
      client_id:
        "303259912767-fnb80rlqep35t9872mo2q16bu1sch7kr.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt()
  }, []);


  return (
    <>
      <div className="App"></div>
      <div id="signInDiv"></div>
      {user && (
        <div>
          <img src={user.picture} />
          <h3>{user.name}</h3>
        </div>
      )}
      {user.email ? <button onClick={handleSignOut}>Sign Out</button> : <button>Sign In</button>}
    </>
  );
}
