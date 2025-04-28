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
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Compare Investments</h2>

      <div>
        <label htmlFor="investments" style={{ fontSize: '1rem', marginRight: '10px' }}>Select Investments (max 2):</label>
        <select
          id="investments"
          multiple
          value={selectedInvestments}
          onChange={handleSelectionChange}
          style={{
            fontSize: '1rem',
            padding: '8px',
            width: '250px',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        >
          {investments.map((investment) => (
            <option key={`${investment.name}-${investment.purchaseDate}`} value={`${investment.name}-${investment.purchaseDate}`}>
              {investment.name} - {investment.purchaseDate}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          fontSize: '1rem',
          padding: '10px 20px',
          border: 'none',
          backgroundColor: '#45A049',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '5px',
          marginBottom: '30px'
        }}
      >
        Submit
      </button>

      {chartData && (
        <div>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
            {chartData.datasets.map((dataset, index) => (
              <div key={index} style={{ width: '45%' }}>
                <Line data={{ labels: chartData.labels, datasets: [dataset] }} />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
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
                  <div key={`${investment.name}-${investment.purchaseDate}`} style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', width: '45%', textAlign: 'left', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', textAlign: 'center', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>{investment.name}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '10px 0', gap: '10px', alignItems: 'center' }}>
                      <p style={{ fontWeight: 'bold', margin: '0' }}>Purchase Price:</p>
                      <p style={{ textAlign: 'right', margin: '0', fontSize: '1.1rem' }}>${investment.purchasePrice}</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '10px 0', gap: '10px', alignItems: 'center' }}>
                      <p style={{ fontWeight: 'bold', margin: '0' }}>Current Value:</p>
                      <p style={{ textAlign: 'right', margin: '0', fontSize: '1.1rem' }}>${investment.currentValue}</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '10px 0', gap: '10px', alignItems: 'center' }}>
                      <p style={{ fontWeight: 'bold', margin: '0' }}>Change:</p>
                      <p style={{ textAlign: 'right', margin: '0', fontSize: '1.1rem', color: isPositive ? '#45A049' : '#f44336', fontWeight: 'bold' }}>
                        {isPositive ? '+' : ''}{percentageChange}%
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;
