import React from "react";
import { motion } from "framer-motion";
import "../pages/fet.css";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Unified Dashboard",
    description: "View stocks, crypto, and mutual funds all in one streamlined overview. All syncing live, all the time.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#f3ebff"/><path d="M13 27l3.5-4.5 3.5 4 7-9.5" stroke="#a385ed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="13" cy="27" r="2.5" fill="#a385ed"/><circle cx="20" cy="26.5" r="2" fill="#a385ed"/><circle cx="27" cy="17.5" r="2" fill="#a385ed"/></svg>
    ),
  },
  {
    title: "Smart Insights",
    description: "Let AI suggest allocation tweaks or trending opportunities based on your unique holdings—nothing generic.",
    icon: (
      <svg width="40" height="40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#edeafd"/><path d="M20 13v7l5 3" stroke="#836acf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    title: "Real-Time Alerts",
    description: "Important moves? Volatility spikes? Portfolio up 3%? Get notified instantly with personalized pings.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#f8f4fe"/><rect x="16.5" y="11" width="7" height="18" rx="3.5" stroke="#ab8cfb" strokeWidth="2.5"/><circle cx="20" cy="32" r="2" fill="#ab8cfb"/></svg>
    ),
  },
  {
    title: "Advanced Security",
    description: "Your data is encrypted in transit and at rest. MFA, device controls, and breach monitoring are built-in.",
    icon: (
      <svg width="40" height="40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#ecebfb"/><rect x="11.5" y="19" width="17" height="11" rx="3" stroke="#7873d7" strokeWidth="2.5"/><path d="M16 19v-2a4 4 0 018 0v2" stroke="#7873d7" strokeWidth="2.5"/></svg>
    ),
  },
  {
    title: "Seamless Sync",
    description: "Connect multiple brokers, add bank accounts, and watch everything update in perfect harmony.",
    icon: (
      <svg width="40" height="40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#efe3ff"/><path d="M13 23c2-2 6-2 8 0 2 2 6 2 8 0" stroke="#a385ed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    title: "24/7 Human Support",
    description: "Questions? Real people answer fast. Success coaches help you reach your investment goals.",
    icon: (
      <svg width="40" height="40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#f4f9ff"/><ellipse cx="20" cy="23" rx="8" ry="6" stroke="#a385ed" strokeWidth="2.5"/><circle cx="20" cy="16" r="3.5" stroke="#a385ed" strokeWidth="2.5"/></svg>
    ),
  }
];

function Features() {
  return (
    <section className="features-section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-110px" }}
        transition={{ duration: 0.73 }}
        className="features-intro"
      >
        <span className="features-tag">Why Choose Us?</span>
        <h2 className="features-title">Features that Power Up Your Portfolio</h2>
        <p className="features-lead">
          Everything you need to track, grow, and protect your wealth—presented with clarity, backed by security.
        </p>
      </motion.div>

      <motion.div
        className="features-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-70px" }}
        variants={{
          hidden: { opacity: 1 },
          visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
          },
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="feature-card"
            initial={{ opacity: 0, y: 52 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.64, delay: index * 0.12 }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="features-cta-block"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.53, delay: 0.16 }}
      ><Link to={"/signup"}>
        </Link><div className="features-cta-caption">No credit card required &bull; Cancel anytime</div>
      </motion.div>
      <div className="features-bgi" aria-hidden="true"></div>
    </section>
  );
}

export default Features;
