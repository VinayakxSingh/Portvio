import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">Portvio</div>
      <div className="navbar__links">
        <Link to="/">Home</Link>
        <a href="/features">Features</a>
        <a href="/about-us">About</a>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button className="logout-button" onClick={handleLogout} style={{backgroundColor:"purple"}}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
