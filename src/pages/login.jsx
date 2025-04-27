import React, { useState } from "react";
import "./Login.css";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Get all users from the Firebase database
      const response = await axios.get(
        "https://investment-6f46c-default-rtdb.firebaseio.com/users.json"
      );

      if (response.data) {
        const users = response.data;
        let userFound = false;
        
        for (const key in users) {
          const user = users[key];
          if (user.email === email && user.password === password) {
            userFound = true;
            
            // Store user info in localStorage so Dashboard can access it
            localStorage.setItem("userId", key);
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userName", user.fullName || "User");
            
            setEmail("");
            setPassword("");
            
            // Navigate to dashboard with state containing userId
            navigate("/dashboard", { 
              state: { 
                userId: key,
                userName: user.fullName,
                userEmail: user.email
              } 
            });
            break;
          }
        }
        
        if (!userFound) {
          setError("Invalid email or password");
        }
      } else {
        setError("No users found in the database");
      }
    } catch (err) {
      setError("Error connecting to the database. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <motion.div
        className="auth-box"
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            style={{ width: "90%" }}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            style={{ width: "90%" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="signUp-div">
          <div>
            <span>New User?</span>
          </div>
          <button
            type="button"
            className="sign-btn"
            onClick={() => navigate("/signup")}
            disabled={isLoading}
          >
            Sign Up
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </motion.div>
    </div>
  );
};

export default Login;