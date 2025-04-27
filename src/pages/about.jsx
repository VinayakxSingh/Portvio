import React from 'react';
import { motion } from 'framer-motion';
import './about.css';

const heroVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
const fadeVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const staggerContainer = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <motion.section
        className="about-hero"
        variants={heroVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="about-hero-content">
          <h1>The Power to Track and Grow Your Wealth</h1>
          <p>
            Our investment portfolio tracker brings clarity and simplicity to your financial journey. Analyze your holdings, monitor performance across multiple brokers and asset classes, and enjoy automated insights designed to put you in control—no matter your experience level.
          </p>
          <p>
            Designed for smart investors who value both detail and ease of use, our platform does the heavy lifting so you can focus on achieving your financial goals, not managing spreadsheets.
          </p>
        </div>
        <motion.div
          className="about-hero-img"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="about-mission"
        variants={fadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{once:true, amount: 0.4}}
      >
        <h2>Our Mission</h2>
        <p>
          Empowering investors of all backgrounds with intuitive tools, real data analysis, and actionable reporting. We believe investment management should be accessible, transparent, and insightful—where returns, risks, and opportunities are always clear.
        </p>
        <p>
          By blending robust automation with a human-focused experience, we’re redefining how everyday investors interact with their wealth—making it easier to learn, adapt, and thrive in a complex world.
        </p>
        <motion.div className="about-stats" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.div className="about-stat" variants={fadeVariant}>
            <span className="about-stat-num">120,000+</span>
            <span className="about-stat-label">Investors worldwide</span>
          </motion.div>
          <motion.div className="about-stat" variants={fadeVariant}>
            <span className="about-stat-num">25</span>
            <span className="about-stat-label">Countries supported</span>
          </motion.div>
          <motion.div className="about-stat" variants={fadeVariant}>
            <span className="about-stat-num">$8B+</span>
            <span className="about-stat-label">Tracked in assets</span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="about-team"
        variants={fadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{once:true, amount:0.2}}
      >
        <h2>Meet Our Team</h2>
        <div className="about-team-row">
          <motion.div className="about-team-member" variants={fadeVariant}>
            <div className="about-team-avatar" style={{backgroundImage: "url('https://randomuser.me/api/portraits/men/32.jpg')"}}></div>
            <div className="about-team-name">Alex Kim</div>
            <div className="about-team-role">Founder & CEO</div>
            <div className="about-team-bio">Alex brings 15+ years in fintech, driven by a passion for making investing approachable for everyone. Previously at two successful SaaS startups, he's the visionary who ensures we always innovate for our users.</div>
          </motion.div>
          <motion.div className="about-team-member" variants={fadeVariant}>
            <div className="about-team-avatar" style={{backgroundImage: "url('https://randomuser.me/api/portraits/men/85.jpg')"}}></div>
            <div className="about-team-name">Taylor Smith</div>
            <div className="about-team-role">Lead Developer</div>
            <div className="about-team-bio">Taylor architects and builds our platform's core engine. With expertise in security and cloud, they make sure your data is accurate, insightful, and always safe.</div>
          </motion.div>
          <motion.div className="about-team-member" variants={fadeVariant}>
            <div className="about-team-avatar" style={{backgroundImage: "url('https://randomuser.me/api/portraits/women/57.jpg')"}}></div>
            <div className="about-team-name">Jordan Lee</div>
            <div className="about-team-role">Head of Product</div>
            <div className="about-team-bio">Jordan fuses creative design thinking with deep financial insight. She champions user experience and ensures our features are both powerful and user-friendly.</div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="about-cta"
        variants={fadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{once:true, amount: 0.5}}
      >
        <h2>Ready to take control of your investments?</h2>
        <p style={{ color: '#f2f2f2', margin: '16px 0 0 0' }}>
          Join thousands of investors who trust our tracker every day to make smarter financial decisions. Sign up now and start seeing your full financial picture—clearer than ever!
        </p>
        <button className="about-cta-btn">Get Started</button>
      </motion.section>
    </div>
  );
};

export default About;
