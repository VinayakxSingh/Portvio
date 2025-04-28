import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Compare = () => {
  const [investments, setInvestments] = useState([]);
  const [selectedInvestments, setSelectedInvestments] = useState([]);
  const [chartData, setChartData] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://investment-6f46c-default-rtdb.firebaseio.com/users/${userId}.json`)
        .then((response) => {
          const { investments } = response.data;
          setInvestments(investments);
        })
        .catch((error) => {
          console.error("Error fetching investments:", error);
        });
    }
  }, [userId]);

  const handleSelectionChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    if (selectedOptions.length <= 2) {
      setSelectedInvestments(selectedOptions);
    } else {
      alert("You can only select 2 investments.");
    }
  };

  const calculatePercentageChange = (currentValue, purchasePrice) => {
    const difference = currentValue - purchasePrice;
    const percentageChange = (difference / purchasePrice) * 100;
    return percentageChange.toFixed(2);
  };

  const handleSubmit = () => {
    if (selectedInvestments.length === 2) {
      const selectedData = investments.filter((investment) =>
        selectedInvestments.includes(`${investment.name}-${investment.purchaseDate}`)
      );

      const labels = selectedData.map(investment => new Date(investment.purchaseDate).toLocaleDateString());
      const datasets = selectedData.map((investment, index) => {
        const investmentValues = [investment.purchasePrice, investment.currentValue];
        
        // Alternate colors for different investments
        const colors = [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)"
        ];

        return {
          label: investment.name,
          data: investmentValues,
          borderColor: colors[index % colors.length],
          backgroundColor: colors[index % colors.length].replace("1)", "0.2)"),
          fill: true,
        };
      });

      setChartData({
        labels: labels,
        datasets: datasets,
      });
    } else {
      alert("Please select exactly 2 investments before submitting.");
    }
  };

  return (
    <div className="compare-container">
      <h2>Compare Investments</h2>

      <div>
        <label htmlFor="investments">Select Investments (max 2):</label>
        <select
          id="investments"
          multiple
          value={selectedInvestments}
          onChange={handleSelectionChange}
        >
          {investments.map((investment) => (
            <option key={`${investment.name}-${investment.purchaseDate}`} value={`${investment.name}-${investment.purchaseDate}`}>
              {investment.name} - {investment.purchaseDate}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleSubmit}>Submit</button>

      {chartData && (
        <div>
          <div className="chart-container">
            {chartData.datasets.map((dataset, index) => (
              <div key={index} className="chart-item">
                <Line data={{ labels: chartData.labels, datasets: [dataset] }} />
              </div>
            ))}
          </div>

          <div className="investment-details-grid">
            {investments
              .filter((investment) =>
                selectedInvestments.includes(`${investment.name}-${investment.purchaseDate}`)
              )
              .map((investment) => {
                const percentageChange = calculatePercentageChange(
                  investment.currentValue,
                  investment.purchasePrice
                );
                const isPositive = parseFloat(percentageChange) >= 0;

                return (
                  <div key={`${investment.name}-${investment.purchaseDate}`} className="investment-item">
                    <h3>{investment.name}</h3>
                    <div className="investment-detail">
                      <p className="detail-label">Purchase Price:</p>
                      <p className="detail-value">${investment.purchasePrice}</p>
                    </div>
                    <div className="investment-detail">
                      <p className="detail-label">Current Value:</p>
                      <p className="detail-value">${investment.currentValue}</p>
                    </div>
                    <div className="investment-detail">
                      <p className="detail-label">Change:</p>
                      <p className={`detail-value ${isPositive ? 'positive-change' : 'negative-change'}`}>
                        {isPositive ? '+' : ''}{percentageChange}%
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      <style jsx>{`
        .compare-container {
          font-family: Arial, sans-serif;
          margin: 20px;
          text-align: center;
        }

        .compare-container h2 {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .compare-container label {
          font-size: 1rem;
          margin-right: 10px;
        }

        .compare-container select {
          font-size: 1rem;
          padding: 8px;
          width: 250px;
          margin-bottom: 20px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .compare-container button {
          font-size: 1rem;
          padding: 10px 20px;
          border: none;
          background-color: #4caf50;
          color: white;
          cursor: pointer;
          border-radius: 5px;
          margin-bottom: 30px;
        }

        .compare-container button:hover {
          background-color: #45a049;
        }

        .chart-container {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 20px;
        }

        .chart-item {
          width: 45%;
        }

        .investment-details-grid {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 20px;
        }

        .investment-item {
          background-color: #f4f4f4;
          padding: 20px;
          border-radius: 8px;
          width: 45%;
          text-align: left;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .investment-item h3 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          text-align: center;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;
        }

        .investment-detail {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin: 10px 0;
          gap: 10px;
          align-items: center;
        }

        .detail-label {
          font-weight: bold;
          margin: 0;
        }

        .detail-value {
          text-align: right;
          margin: 0;
          font-size: 1.1rem;
        }

        .positive-change {
          color: #4caf50;
          font-weight: bold;
        }

        .negative-change {
          color: #f44336;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Compare;
