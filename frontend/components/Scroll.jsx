import React from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";

const Scroll = () => {
  // Track vertical scroll
  const { scrollY } = useScroll();

  // Get scroll velocity for smoothness
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Map scroll velocity to horizontal x movement
  const x = useTransform(smoothVelocity, [0, 1000], [0, -2000]);

  return (
    <div style={{ width:"100%", height: "50vh", background: "", overflow: "hidden" }}>
      <motion.div
        style={{
          x,
          whiteSpace: "nowrap",
          fontSize: "8rem",
          fontWeight: "bold",
          color: "white",
          fontFamily: "'Anton', sans-serif",
        }}
      >
        SUPER MOTION FRAMEWORK SUPER MOTION FRAMEWORK SUPER MOTION FRAMEWORK
      </motion.div>
    </div>
  );
};

export default Scroll;
