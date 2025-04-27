// AddInvestment.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Addinvestment.css";

const AddInvestment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    purchaseDate: "",
    purchasePrice: "",
    quantity: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User not logged in. Please login first.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("https://investment-6f46c-default-rtdb.firebaseio.com/users.json");

      if (res.data) {
        const users = res.data;
        let userKey = null;
        let userData = null;

        for (const key in users) {
          if (users[key].userId === userId || key === userId) {
            userKey = key;
            userData = users[key];
            break;
          }
        }

        if (!userKey || !userData) {
          setError("User not found.");
          return;
        }

        // Determine symbol based on asset name
        let symbol = "";
        if (formData.name.toLowerCase() === "bitcoin") {
          symbol = "BTC";
        } else if (formData.name.toLowerCase() === "ethereum") {
          symbol = "ETH";
        } else {
          setError("Invalid asset selected.");
          return;
        }

        const newInvestment = {
          investmentId: `INV${Date.now()}`,
          type: "Cryptocurrency",
          name: formData.name,
          symbol: symbol,
          purchaseDate: formData.purchaseDate,
          purchasePrice: parseFloat(formData.purchasePrice),
          quantity: parseFloat(formData.quantity),
          currentValue: 0, // initially 0, will be updated in dashboard
          lastUpdated: new Date().toISOString().split('T')[0],
        };

        const updatedInvestments = userData.investments ? [...userData.investments, newInvestment] : [newInvestment];

        await axios.patch(`https://investment-6f46c-default-rtdb.firebaseio.com/users/${userKey}.json`, {
          investments: updatedInvestments,
        });

        setSuccess("Investment added successfully!");
        setFormData({
          name: "",
          purchaseDate: "",
          purchasePrice: "",
          quantity: "",
        });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to add investment. Please try again.");
    }
  };

  return (
    <div className="add-investment-container">
      <h2>Add New Investment</h2>
      <form className="investment-form" onSubmit={handleSubmit}>
        <select
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        >
          <option value="">Select Asset</option>
          <option value="Bitcoin">Bitcoin</option>
          <option value="Ethereum">Ethereum</option>
        </select>

        <input
          type="date"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="purchasePrice"
          placeholder="Purchase Price (USD)"
          value={formData.purchasePrice}
          onChange={handleChange}
          required
          step="0.01"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          step="0.0001"
        />

        <button type="submit" className="submit-button">
          Add Investment
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default AddInvestment;
