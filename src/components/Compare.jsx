import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Compare = () => {
  const [investments, setInvestments] = useState([]);
  const [selectedInvestments, setSelectedInvestments] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

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
          setError("Failed to fetch investments. Please try again later.");
        });
    }
  }, [userId]);

  const handleSelectionChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    if (selectedOptions.length <= 2) {
      setSelectedInvestments(selectedOptions);
      setError("");
    } else {
      setError("You can only select 2 investments.");
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
      setError("");
    } else {
      setError("Please select exactly 2 investments before submitting.");
    }
  };

  const containerStyle = {
    fontFamily: "'Poppins', Arial, sans-serif", 
    padding: '30px',
    textAlign: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
  };

  const headingStyle = {
    fontSize: '2.75rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '40px',
    textAlign: 'center',
    position: 'relative',
    paddingBottom: '15px',
  };

  const selectContainerStyle = {
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const labelStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#334155',
    alignSelf: 'flex-start',
    marginLeft: '10%',
  };

  const selectStyle = {
    fontSize: '1.1rem',
    padding: '14px',
    width: '80%',
    maxWidth: '500px',
    borderRadius: '10px',
    border: '2px solid #cbd5e1',
    outline: 'none',
    color: '#334155',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    minHeight: '120px',
  };

  const optionStyle = {
    padding: '8px',
    margin: '4px 0',
  };

  const buttonStyle = {
    fontSize: '1.25rem',
    padding: '14px 30px',
    backgroundColor: '#10b981',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '10px',
    marginBottom: '40px',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    transition: 'all 0.3s ease',
    fontWeight: '600',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0d9669',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 14px rgba(16, 185, 129, 0.4)',
  };

  const errorStyle = {
    color: '#ef4444',
    fontSize: '1.1rem',
    fontWeight: '500',
    marginBottom: '20px',
    padding: '10px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '8px',
    borderLeft: '4px solid #ef4444',
    display: error ? 'block' : 'none',
    width: '80%',
    maxWidth: '500px',
    margin: '0 auto 20px auto',
    textAlign: 'left',
  };

  const chartContainerStyle = {
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    marginBottom: '40px',
    flexWrap: 'wrap',
  };

  const singleChartStyle = {
    width: '45%',
    minWidth: '300px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const comparisonContainerStyle = {
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    marginTop: '40px',
    flexWrap: 'wrap',
  };

  const investmentCardStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '14px',
    width: '45%',
    minWidth: '300px',
    textAlign: 'left',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const investmentCardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)',
  };

  const investmentTitleStyle = {
    fontSize: '1.8rem',
    marginBottom: '25px',
    textAlign: 'center',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '15px',
    color: '#1e293b',
    fontWeight: '700',
  };

  const dataRowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    margin: '12px 0',
    alignItems: 'center',
    padding: '8px 0',
  };

  const dataLabelStyle = {
    fontWeight: '600',
    margin: '0',
    color: '#475569',
    fontSize: '1.1rem',
  };

  const dataValueStyle = {
    textAlign: 'right',
    margin: '0',
    fontSize: '1.25rem',
    fontWeight: '500',
    color: '#334155',
  };

  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Compare Investments</h2>

      <div style={selectContainerStyle}>
        <label htmlFor="investments" style={labelStyle}>Select Investments (max 2):</label>
        <select
          id="investments"
          multiple
          value={selectedInvestments}
          onChange={handleSelectionChange}
          style={selectStyle}
        >
          {investments.map((investment) => (
            <option 
              key={`${investment.name}-${investment.purchaseDate}`} 
              value={`${investment.name}-${investment.purchaseDate}`}
              style={optionStyle}
            >
              {investment.name} - {new Date(investment.purchaseDate).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      <div style={errorStyle}>{error}</div>

      <button
        onClick={handleSubmit}
        style={{...buttonStyle, ...(isButtonHovered ? buttonHoverStyle : {})}}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        Compare Investments
      </button>

      {chartData && (
        <div>
          <div style={chartContainerStyle}>
            {chartData.datasets.map((dataset, index) => (
              <div key={index} style={singleChartStyle}>
                <Line 
                  data={{ 
                    labels: ["Purchase Price", "Current Value"], 
                    datasets: [dataset] 
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: dataset.label,
                        font: {
                          size: 16,
                          weight: 'bold'
                        }
                      },
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        ticks: {
                          callback: function(value) {
                            return '$' + value;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            ))}
          </div>

          <div style={comparisonContainerStyle}>
            {investments
              .filter((investment) =>
                selectedInvestments.includes(`${investment.name}-${investment.purchaseDate}`)
              )
              .map((investment, index) => {
                const percentageChange = calculatePercentageChange(
                  investment.currentValue,
                  investment.purchasePrice
                );
                const isPositive = parseFloat(percentageChange) >= 0;

                return (
                  <div 
                    key={`${investment.name}-${investment.purchaseDate}`} 
                    style={{
                      ...investmentCardStyle, 
                      ...(hoveredCard === index ? investmentCardHoverStyle : {})
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <h3 style={investmentTitleStyle}>{investment.name}</h3>
                    <div style={{...dataRowStyle, borderBottom: '1px solid #f1f5f9'}}>
                      <p style={dataLabelStyle}>Purchase Date:</p>
                      <p style={dataValueStyle}>{new Date(investment.purchaseDate).toLocaleDateString()}</p>
                    </div>
                    <div style={{...dataRowStyle, borderBottom: '1px solid #f1f5f9'}}>
                      <p style={dataLabelStyle}>Purchase Price:</p>
                      <p style={dataValueStyle}>${investment.purchasePrice.toLocaleString()}</p>
                    </div>
                    <div style={{...dataRowStyle, borderBottom: '1px solid #f1f5f9'}}>
                      <p style={dataLabelStyle}>Current Value:</p>
                      <p style={dataValueStyle}>${investment.currentValue.toLocaleString()}</p>
                    </div>
                    <div style={dataRowStyle}>
                      <p style={dataLabelStyle}>Performance:</p>
                      <p style={{
                        textAlign: 'right',
                        margin: '0',
                        fontSize: '1.3rem',
                        color: isPositive ? '#10b981' : '#ef4444',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                        {isPositive ? '↑ ' : '↓ '}{isPositive ? '+' : ''}{percentageChange}%
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
