import "./WhyUsCards.css";
import { useState } from "react";
import { motion } from "framer-motion";
// console.log(motion);

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
  const handleFlip = (idx) =>
    setFlipped((f) => f.map((v, i) => (i === idx ? !v : v)));
  return (
    <section className="whyus-section" id="whyus">
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
    </section>
  );
}

export default WhyUsCards;
