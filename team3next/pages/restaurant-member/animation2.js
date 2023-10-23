import React from "react";
import { motion, useAnimation } from "framer-motion";

export default function SequentialAnimation() {
  const controls = useAnimation();

  const startAnimation = async () => {
    // 第一个动画：Y轴移动，跳动效果
    await controls.start({ y: -50, transition: { duration: 0.5 } });

    // 第二个动画：旋转
    await controls.start({ rotate: 360, transition: { duration: 1 } });

    // 第三个动画：恢复原始位置
    await controls.start({ y: 0, transition: { duration: 0.5 } });
  };

  return (
    <div>
      <button onClick={startAnimation}>開始動畫</button>
      <motion.div
        initial={{ y: 0, rotate: 0 }}
        animate={controls}
        style={{
          width: 100,
          height: 100,
          background: "blue",
          margin: 10,
        }}
      />
    </div>
  );
}
