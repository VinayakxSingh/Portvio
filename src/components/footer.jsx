import React from "react";
import "./Footer.css";

// Import images
import twitterIcon from "../assets/twitter-x.svg";
import facebookIcon from "../assets/facebook.svg";
import linkedinIcon from "../assets/linkedin.svg";
import githubIcon from "../assets/github.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-brand">
          <div className="brand-logo" style={{ color: "black" }}>Portvio</div>
          <p className="brand-tagline">Smart investment tracking for informed decisions</p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Twitter">
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a href="https://github.com/" className="social-link" aria-label="GitHub">
              <img src={githubIcon} alt="GitHub" />
            </a>
          </div>
        </div>

        <div className="footer-columns">
          <div className="footer-section" style={{ position: "relative", left: "700px" }}>
            <h4>Company</h4>
            <ul>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/contactus">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-container">
          <p className="copyright">© {new Date().getFullYear()} Portvio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
