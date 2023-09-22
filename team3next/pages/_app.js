import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Styles from "@/styles/globals.css"

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return <Component {...pageProps} />;
}
