// Footer.jsx
import React from "react";
import "./Footer.css";
// import { Twitter, Facebook, Linkedin, Github } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-brand">
          <div className="brand-logo" style={{color:"black"}}>Portvio</div>
          <p className="brand-tagline">Smart investment tracking for informed decisions</p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Twitter">
{/*               <Twitter size={18} /> */}<img src="./assets/twitter-x.svg" alt="" />
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
{/*               <Facebook size={18} /> */}<img src="./assets/facebook.svg" alt="" />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
{/*               <Linkedin size={18} /> */}<img src="./assets/linkedin.svg" alt="" />
            </a>
            <a href="https://github.com/" className="social-link" aria-label="GitHub">
{/*               <Github size={18} /> */}<img src="./assets/github.svg" alt="" />
            </a>
          </div>
        </div>

        <div className="footer-columns">
          {/* <div className="footer-section">
            <h4>Product</h4>
            <ul> */}
              {/* <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Mobile App</a></li> */}
            {/* </ul>
          </div> */}

          {/* <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Tutorials</a></li>
              <li><a href="#">Webinars</a></li>
            </ul>
          </div> */}

          <div className="footer-section" style={{position:"relative" ,left:"700px"}}>
            <h4>Company</h4>
            <ul>
              <li><a href="/about-us">About Us</a></li>
              {/* <li><a href="#">Careers</a></li> */}
              <li><a href="/contact">Contact</a></li>
              {/* <li><a href="#">Press</a></li> */}
            </ul>
          </div>

          {/* <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div> */}
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
