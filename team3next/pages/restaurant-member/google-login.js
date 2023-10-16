import React from "react";
import { useEffect } from "react";

export default function App() {
  const handleCallbackResponse = (response) => {};
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
  }, []);
  return (
    <>
      <div id="signInDiv"></div>
    </>
  );
}
