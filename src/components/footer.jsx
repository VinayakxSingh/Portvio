import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-logo">Portvio</span>
        <span className="footer-copy">
          © {new Date().getFullYear()} Portvio. All rights reserved.
        </span>
        <span className="footer-links">
          <a href="#" target="_blank" rel="noopener" className="footer-link">
            Contact
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener"
            className="footer-link"
          >
            GitHub
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
