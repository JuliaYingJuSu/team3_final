import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/style.css";
import { AuthContextProvider } from "@/hooks/AuthContext";
import { MemberAuthProvider } from "@/components/restaurant-member/context/auth-context";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <MemberAuthProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </MemberAuthProvider>
  );
}
