import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useMemberAuthContext } from "../../components/restaurant-member/hooks/use-memberauth-context";
import axios from "axios";

// const { memberAuth, setMemberAuth } = useMemberAuthContext();

const firebaseConfig = {
  apiKey: "AIzaSyDER4UlsxdFFOO2gn_IAQeDea9-_UDWYgE",
  authDomain: "auth-e37f4.firebaseapp.com",
  projectId: "auth-e37f4",
  storageBucket: "auth-e37f4.appspot.com",
  messagingSenderId: "58968927622",
  appId: "1:58968927622:web:c791b7f2f83d87c7ef5007",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => signInWithPopup(auth, provider);

// export const signInWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     console.log(result);
//     const response = await axios.post(
//       "http://localhost:3002/firebase/google/verify-google-token",
//       result
//     );
//     console.log(response.data);
//     localStorage.setItem("token", JSON.stringify(response.data));
//     setMemberAuth(response.data);
//   } catch (err) {
//     console.log(err);
//   }
// };
