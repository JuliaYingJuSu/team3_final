import React from "react";
import { motion } from "framer-motion";
import styles from "../../components/restaurant-member/styles/animation.module.css"

export default function App() {
  return (
    <>
    <motion.div
      className={styles.box}
      initial={{ backgroundColor: "	#FF0000",x:-100 }}
      animate={{ backgroundColor: "#0000E3",x:100  }}
      transition={{ duration: 10 }}
    />
    </>
  );
}
