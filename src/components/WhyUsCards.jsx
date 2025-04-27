import "./WhyUsCards.css";
import { useState } from "react";
import { motion } from "framer-motion";

const reasons = [
  {
    title: "Effortless Tracking",
    content:
      "View all your investments—stocks, crypto, and more—in one dashboard.",
  },
  {
    title: "Powerful Analytics",
    content:
      "Interactive charts reveal insights that help maximize your returns.",
  },
  {
    title: "Ultra Secure",
    content: "We keep your data private and always under your control.",
  },
];

function WhyUsCards() {
  const [flipped, setFlipped] = useState([false, false, false]);

  const handleFlip = (idx) => {
    setFlipped((f) => f.map((v, i) => (i === idx ? !v : v)));
  };

  const handleRevealOrHideAll = () => {
    const allFlipped = flipped.every((f) => f);
    setFlipped([!allFlipped, !allFlipped, !allFlipped]);
  };

  const allFlipped = flipped.every((f) => f);

  return (
    <section className="whyus-section" id="whyus">
      <div className="whyus-bg-blob" aria-hidden="true">
  <motion.svg width="900" height="400" viewBox="0 0 900 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="blobGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a385ed" stopOpacity="0.26"/>
        <stop offset="100%" stopColor="#5e4c88" stopOpacity="0.16"/>
      </linearGradient>
    </defs>
    <motion.path
      d="M130,320 Q180,70 550,220 T830,150 Q860,380 390,380 Q110,400 130,320 Z"
      fill="url(#blobGrad)"
      animate={{
        d: [
          "M130,320 Q180,70 550,220 T830,150 Q860,380 390,380 Q110,400 130,320 Z",
          "M170,280 Q220,60 650,190 T780,200 Q860,340 390,380 Q130,350 170,280 Z",
          "M130,320 Q180,70 550,220 T830,150 Q860,380 390,380 Q110,400 130,320 Z"
        ]
      }}
      transition={{
        repeat: Infinity,
        duration: 12,
        ease: "easeInOut",
      }}
      style={{ filter: "blur(38px)" }}
    />
  </motion.svg>
</div>
      <motion.h2
        className="whyus-title"
        initial={{ y: 22, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.13 }}
      >
        Why Portvio?
      </motion.h2>

      <div className="whyus-cards">
        {reasons.map((r, idx) => (
          <motion.div
            className={`whyus-card${flipped[idx] ? " flipped" : ""}`}
            key={r.title}
            tabIndex={0}
            aria-label={r.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.55, delay: 0.12 * idx }}
            onHoverStart={() => handleFlip(idx)}
            onHoverEnd={() => handleFlip(idx)}
          >
            <motion.div
              className="whyus-card-inner"
              animate={{ rotateY: flipped[idx] ? 180 : 0 }}
              transition={{ duration: 0.37, type: "spring", bounce: 0.38 }}
            >
              {/* Front */}
              <div className="whyus-card-face whyus-card-front">
                <span className="whyus-qmark">?</span>
              </div>
              {/* Back */}
              <div className="whyus-card-face whyus-card-back">
                <h3>{r.title}</h3>
                <p>{r.content}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Reveal/Hide Button */}
      <motion.button
        className="reveal-btn"
        onClick={handleRevealOrHideAll}
        whileTap={{ scale: 0.92 }}
      >
        {allFlipped ? "Hide All?" : "Reveal All?"}
      </motion.button>
    </section>
  );
}

export default WhyUsCards;
