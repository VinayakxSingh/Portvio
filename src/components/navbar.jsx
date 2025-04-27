import "./Navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Portvio</div>
      <div className="navbar__links">
        <Link to="/">Home</Link>
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
export default Navbar;
