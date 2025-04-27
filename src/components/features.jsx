import "./Features.css";
import { motion } from "framer-motion";
// console.log(motion);
const features = [
  {
    title: "All Assets, One Place",
    text: "Track stocks, crypto, real estate, and more—seamlessly in one unified dashboard.",
  },
  {
    title: "Customizable Dashboards",
    text: "Personalize your experience. Pin what matters most to you, with zero clutter.",
  },
  {
    title: "Advanced Export & Insights",
    text: "Export data, analyze returns, plan future moves—all with intuitive tools.",
  },
];

function Features() {
  return (
    <section className="features-section" id="features">
      <motion.h2
        className="features-title"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-80px" }}
      >
        Make Smarter Moves with Portvio
      </motion.h2>
      <div className="features-list">
        {features.map((f, i) => (
          <motion.div
            className="feature"
            key={f.title}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.5, delay: 0.12 * i }}
          >
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;
