import React from "react";
import {
  auth,
  signInWithGoogle,
} from "@/components/restaurant-member/firebase";

export default function FirebaseTest() {
  return (
    <>
      <div>
        <button onClick={signInWithGoogle}>Sign in with google</button>
      </div>
    </>
  );
}
