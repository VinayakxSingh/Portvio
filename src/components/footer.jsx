import React from "react";
import "./Footer.css";

import twitterIcon from "../assets/twitter-x.svg";
import facebookIcon from "../assets/facebook.svg";
import linkedinIcon from "../assets/linkedin.svg";
import githubIcon from "../assets/github.svg";

import { Link } from "react-router-dom"; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="brand-logo">Portvio</div>
          <p className="brand-tagline">
            Smart investment tracking for informed decisions
          </p>
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

        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/contactus">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p className="copyright">
            © {new Date().getFullYear()} Portvio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
