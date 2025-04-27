import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userId: "",
    userName: "",
    userEmail: ""
  });
  const [investments, setInvestments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalCurrentValue, setTotalCurrentValue] = useState(0);
  
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError("");
      
      try {
        // Get userId either from location state or localStorage
        let userId = "";
        if (location.state && location.state.userId) {
          userId = location.state.userId;
          setUserData({
            userId: location.state.userId,
            userName: location.state.userName || "User",
            userEmail: location.state.userEmail || ""
          });
        } else {
          userId = localStorage.getItem("userId");
          const userName = localStorage.getItem("userName");
          const userEmail = localStorage.getItem("userEmail");
          
          if (!userId) {
            navigate("/login");
            return;
          }
          
          setUserData({
            userId,
            userName: userName || "User",
            userEmail: userEmail || ""
          });
        }
        
        // Fetch user investments from Firebase
        const response = await axios.get(
          "https://investment-6f46c-default-rtdb.firebaseio.com/users.json"
        );
        
        if (response.data) {
          const users = response.data;
          
          // Find the user in the database
          for (const key in users) {
            const user = users[key];
            if (user.userId === userId || key === userId) {
              // User found, check if they have investments
              if (user.investments && user.investments.length > 0) {
                setInvestments(user.investments);
                
                // Calculate totals
                let investmentTotal = 0;
                let currentValueTotal = 0;
                
                user.investments.forEach(inv => {
                  investmentTotal += inv.purchasePrice * inv.quantity;
                  currentValueTotal += inv.currentValue;
                });
                
                setTotalInvestment(investmentTotal);
                setTotalCurrentValue(currentValueTotal);
              } else {
                setInvestments([]);
                setTotalInvestment(0);
                setTotalCurrentValue(0);
              }
              break;
            }
          }
        }
      } catch (err) {
        setError("Failed to load investment data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [location, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  // Calculate profit or loss
  const totalProfitLoss = totalCurrentValue - totalInvestment;
  const profitLossPercentage = totalInvestment > 0 
    ? ((totalProfitLoss / totalInvestment) * 100).toFixed(2)
    : 0;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-nav">
        <h2>Investment Dashboard</h2>
        <button 
          className="logout-button"
          onClick={handleLogout}
        >
          Add Investments
        </button>
        <button 
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      
      <div className="dashboard-header">
        {/* <h1>Welcome, {userData.userName}!</h1> */}
        {/* <p>Email: {userData.userEmail}</p> */}
      </div>
      
      <div className="dashboard-content">
        {isLoading ? (
          <div className="loading">Loading your investments...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : investments.length > 0 ? (
          <div className="investments-section">
            <h2>Your Investments</h2>
            <div className="table-responsive">
              <table className="investments-table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Symbol</th>
                    <th>Purchase Date</th>
                    <th>Purchase Price</th>
                    <th>Quantity</th>
                    <th>Initial Investment</th>
                    <th>Current Value</th>
                    <th>Return</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map(investment => {
                    const initialInvestment = investment.purchasePrice * investment.quantity;
                    const profitLoss = investment.currentValue - initialInvestment;
                    const returnPercentage = ((profitLoss / initialInvestment) * 100).toFixed(2);
                    
                    return (
                      <tr key={investment.investmentId}>
                        <td>{investment.name}</td>
                        <td>{investment.symbol}</td>
                        <td>{investment.purchaseDate}</td>
                        <td>{formatCurrency(investment.purchasePrice)}</td>
                        <td>{investment.quantity}</td>
                        <td>{formatCurrency(initialInvestment)}</td>
                        <td>{formatCurrency(investment.currentValue)}</td>
                        <td className={profitLoss >= 0 ? "profit" : "loss"}>
                          {formatCurrency(profitLoss)} ({returnPercentage}%)
                        </td>
                        <td>{investment.lastUpdated}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="summary-section">
              <div className="summary-card">
                <h3>Investment Summary</h3>
                <div className="summary-row">
                  <span>Total Investment:</span>
                  <span>{formatCurrency(totalInvestment)}</span>
                </div>
                <div className="summary-row">
                  <span>Current Value:</span>
                  <span>{formatCurrency(totalCurrentValue)}</span>
                </div>
                <div className={`summary-row ${totalProfitLoss >= 0 ? "profit" : "loss"}`}>
                  <span>Total Profit/Loss:</span>
                  <span>{formatCurrency(totalProfitLoss)} ({profitLossPercentage}%)</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-investments">
            <h2>No Investments Found</h2>
            <p>You don't have any investments yet. Start investing to see your portfolio here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;