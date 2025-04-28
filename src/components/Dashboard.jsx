import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Charts from "./Charts";
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
  const [sortOrder, setSortOrder] = useState("");
  const [filterType, setFilterType] = useState("");

  const updateCurrentValues = async (investments) => {
    try {
      const responses = await Promise.all([
        axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"),
        axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
      ]);

      const bitcoinPrice = responses[0]?.data?.bitcoin?.usd || 0;
      const ethereumPrice = responses[1]?.data?.ethereum?.usd || 0;

      const updatedInvestments = investments.map(inv => {
        let currentPrice = 0;
        if (inv.name.toLowerCase() === "bitcoin") {
          currentPrice = bitcoinPrice;
        } else if (inv.name.toLowerCase() === "ethereum") {
          currentPrice = ethereumPrice;
        } else {
          currentPrice = inv.purchasePrice;
        }

        return {
          ...inv,
          currentValue: currentPrice * inv.quantity,
          lastUpdated: new Date().toLocaleString()
        };
      });

      return updatedInvestments;
    } catch (err) {
      console.error("Failed to update asset values:", err);
      return investments;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError("");

      try {
        let userId = "";
        if (location.state?.userId) {
          userId = location.state.userId;
          setUserData({
            userId: location.state.userId,
            userName: location.state.userName || "User",
            userEmail: location.state.userEmail || ""
          });
        } else {
          userId = localStorage.getItem("userId") || "";
          const userName = localStorage.getItem("userName") || "User";
          const userEmail = localStorage.getItem("userEmail") || "";

          if (!userId) {
            navigate("/login");
            return;
          }

          setUserData({
            userId,
            userName,
            userEmail
          });
        }

        const response = await axios.get(
          "https://investment-6f46c-default-rtdb.firebaseio.com/users.json"
        );

        if (response.data) {
          const users = response.data;

          for (const key in users) {
            const user = users[key];
            if (user.userId === userId || key === userId) {
              const userInvestments = Array.isArray(user.investments) ? user.investments : [];
              if (userInvestments.length > 0) {
                let updatedInvestments = await updateCurrentValues(userInvestments);

                setInvestments(updatedInvestments);

                const investmentTotal = updatedInvestments.reduce((acc, inv) => acc + (inv.purchasePrice * inv.quantity), 0);
                const currentValueTotal = updatedInvestments.reduce((acc, inv) => acc + inv.currentValue, 0);

                setTotalInvestment(investmentTotal);
                setTotalCurrentValue(currentValueTotal);

                await axios.patch(
                  `https://investment-6f46c-default-rtdb.firebaseio.com/users/${key}.json`,
                  { investments: updatedInvestments }
                );
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

  const totalProfitLoss = totalCurrentValue - totalInvestment;
  const profitLossPercentage = totalInvestment > 0 
    ? ((totalProfitLoss / totalInvestment) * 100).toFixed(2)
    : 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredInvestments = investments.filter(inv => {
    if (!filterType) return true;
    return inv.name.toLowerCase() === filterType.toLowerCase();
  });

  const sortedInvestments = [...filteredInvestments].sort((a, b) => {
    const returnA = (a.currentValue - (a.purchasePrice * a.quantity));
    const returnB = (b.currentValue - (b.purchasePrice * b.quantity));

    if (sortOrder === "high-to-low") {
      return returnB - returnA;
    } else if (sortOrder === "low-to-high") {
      return returnA - returnB;
    } else {
      return 0;
    }
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-nav">
        <h2>Investment Dashboard</h2>
        <button 
          className="add-investment-button"
          style={{backgroundColor:"green"}}
          onClick={() => navigate("/add-investment", { state: { userId: userData.userId } })}
        >
          Add Investments
        </button>
        <button 
            className="compare-button"
         
          className="compare-btn"
            onClick={() => navigate("/compare", { state: { userId: userData.userId } })}
          >
            Compare
          </button>
      </div>

      <div className="dashboard-content">
        {isLoading ? (
          <div className="loading">Loading your investments...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : investments.length > 0 ? (
          <div className="investments-section">
            <h2>Your Investments</h2>

            {/* ----------- Charts Component Loaded Here ------------ */}
            <Charts investments={investments} totalInvestment={totalInvestment} />

            <div className="filter-sort-controls">
              <div>
                <label>Filter by Asset: </label>
                <select className="filterSelect" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="">All</option>
                  <option value="bitcoin">Bitcoin</option>
                  <option value="ethereum">Ethereum</option>
                </select>
              </div>

              <div>
                <label>Sort by Return: </label>
                <select className="sortSelect" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="">None</option>
                  <option value="high-to-low">High to Low</option>
                  <option value="low-to-high">Low to High</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="investments-table">
                <thead>
                  <tr>
                    <th>Asset</th>
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
                  {sortedInvestments.map((investment, index) => {
                    const initialInvestment = investment.purchasePrice * investment.quantity;
                    const profitLoss = investment.currentValue - initialInvestment;
                    const returnPercentage = ((profitLoss / initialInvestment) * 100).toFixed(2);

                    return (
                      <tr key={investment.investmentId || index}>
                        <td>{investment.name}</td>
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
