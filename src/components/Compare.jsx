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
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#333', marginBottom: '30px' }}>Compare Investments</h2>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="investments" style={{ fontSize: '1.2rem', fontWeight: '500', marginRight: '10px' }}>Select Investments (max 2):</label>
        <select
          id="investments"
          multiple
          value={selectedInvestments}
          onChange={handleSelectionChange}
          style={{
            fontSize: '1rem',
            padding: '10px',
            width: '300px',
            marginBottom: '30px',
            borderRadius: '8px',
            border: '2px solid #ddd',
            outline: 'none',
            color: '#333',
            transition: 'border-color 0.3s ease',
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
          fontSize: '1.2rem',
          padding: '12px 25px',
          backgroundColor: '#45A049',
          color: 'white',
          cursor: 'pointer',
          border: 'none',
          borderRadius: '8px',
          marginBottom: '40px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease',
        }}
      >
        Submit
      </button>

      {chartData && (
        <div>
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', marginBottom: '40px' }}>
            {chartData.datasets.map((dataset, index) => (
              <div key={index} style={{ width: '45%' }}>
                <Line data={{ labels: chartData.labels, datasets: [dataset] }} />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', marginTop: '40px' }}>
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
                  <div key={`${investment.name}-${investment.purchaseDate}`} style={{
                    backgroundColor: '#f9f9f9',
                    padding: '30px',
                    borderRadius: '12px',
                    width: '45%',
                    textAlign: 'left',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease',
                  }}>
                    <h3 style={{
                      fontSize: '1.8rem',
                      marginBottom: '20px',
                      textAlign: 'center',
                      borderBottom: '2px solid #ddd',
                      paddingBottom: '15px',
                      color: '#333'
                    }}>{investment.name}</h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '15px',
                      margin: '10px 0',
                      alignItems: 'center',
                    }}>
                      <p style={{ fontWeight: 'bold', margin: '0' }}>Purchase Price:</p>
                      <p style={{ textAlign: 'right', margin: '0', fontSize: '1.2rem' }}>${investment.purchasePrice}</p>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '15px',
                      margin: '10px 0',
                      alignItems: 'center',
                    }}>
                      <p style={{ fontWeight: 'bold', margin: '0' }}>Current Value:</p>
                      <p style={{ textAlign: 'right', margin: '0', fontSize: '1.2rem' }}>${investment.currentValue}</p>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '15px',
                      margin: '10px 0',
                      alignItems: 'center',
                    }}>
                      <p style={{ fontWeight: 'bold', margin: '0' }}>Change:</p>
                      <p style={{
                        textAlign: 'right',
                        margin: '0',
                        fontSize: '1.2rem',
                        color: isPositive ? '#45A049' : '#f44336',
                        fontWeight: 'bold'
                      }}>
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
