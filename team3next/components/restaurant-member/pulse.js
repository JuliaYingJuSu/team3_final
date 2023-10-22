import React from "react";
import { useEffect } from "react";
import Logo from "@/public/images/薯妹去背.png";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

export default function PulseMascot() {
  useEffect(() => {
    startAnimation();
    const intervalId = setInterval(() => {
      startAnimation();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const controls = useAnimation();
  const startAnimation = async () => {
    await controls.start({ y: -50, transition: { duration: 0.5 } });
    await controls.start({ y: 0, transition: { duration: 0.5 } });
    await controls.start({ y: 0, transition: { duration: 2 } });
    await controls.start({ y: -50, transition: { duration: 0.5 } });
    await controls.start({ y: 0, transition: { duration: 0.5 } });
    await controls.start({ rotateY: 360, transition: { duration: 1 } });
  };
  return (
    <>
      <motion.div
        style={{ height: "250px", width: "200px" }}
        initial={{ opacity: "100%" }}
        animate={controls}
      >
        <Image
          height={250}
          width={200}
          className="w-100 h-100"
          src={Logo}
          alt="Logo"
        ></Image>
      </motion.div>
    </>
  );
}
