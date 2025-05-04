import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setState] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      // Make API call to Firebase
      const response = await axios.post(
        `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/users.json`,
        formData
      );
      
      // Check if the request was successful
      if (response.data) {
        setMessage({
          text: 'Account created successfully! Redirecting to login page...',
          type: 'success'
        });
        
        // Clear form
        setState({
          fullName: '',
          email: '',
          password: ''
        });
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setMessage({
        text: error.message || 'An error occurred while creating your account.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <div className="form-header">
          <h1>Create an Account</h1>
          <p>Please fill in your details to sign up</p>
        </div>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-action">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
