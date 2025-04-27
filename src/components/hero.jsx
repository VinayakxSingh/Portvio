import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";

const fade = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.8 } }),
};
const phoneAnim = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { delay: 0.35, duration: 0.9, type: "spring", bounce: 0.32 } },
};
const chartAnim = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { delay: 1, duration: 1, ease: "easeInOut" } },
};

function Hero() {
  return (
    <section className="hero-section">
      <motion.div
        className="hero-bg-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.15, duration: 1.6 } }}
      />
      <div className="hero-content">
        <motion.div
          className="hero-image"
          variants={phoneAnim}
          initial="hidden"
          animate="visible"
        >
       
        </motion.div>
        <motion.div
          className="hero-text"
          custom={1}
          variants={fade}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 custom={1} variants={fade}>
            Track. Analyze. <span className="highlighted-key">Grow</span>
            <br /> Your Wealth.
          </motion.h1>
          <motion.p custom={2} variants={fade} className="hero-sub">
            Seamlessly connect accounts, get real-time analytics, visualize your future. Unlock perfect clarity over your investments—in one beautiful dashboard.
          </motion.p>
          <motion.blockquote custom={3} variants={fade}>
            "The first step towards getting somewhere is to decide you’re not going to stay where you are."
            <br />
            <span>- J.P. Morgan</span>
          </motion.blockquote>
          <motion.div className="hero-btn-row" custom={4} variants={fade}>
            <a className="get-started-btn" href="/signup">Get Started</a>
         
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
