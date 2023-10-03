import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/style.css";
import { AuthProviderJWT } from "@/hooks/use-auth-jwt";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <AuthProviderJWT>
      <Component {...pageProps} />
    </AuthProviderJWT>
  );
}
