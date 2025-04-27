import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import "./Charts.css";

const Charts = ({ investments, joinDate }) => {
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFE"];

  useEffect(() => {
    if (investments.length > 0) {
      // PIE CHART
      const pie = investments.map((inv) => ({
        name: inv.name,
        value: inv.currentValue || 0,
      }));
      setPieData(pie);

      // LINE CHART
      // Sort investments by purchaseDate
      const sortedInvestments = [...investments].sort(
        (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate)
      );

      let cumulativeInitialInvestment = 0;
      let cumulativeCurrentValue = 0;
      const timeline = [];

      // Add a point at join date if available
      if (joinDate) {
        timeline.push({
          date: joinDate,
          value: 0,
        });
      }

      sortedInvestments.forEach((inv) => {
        const initialInvestment = inv.purchasePrice * inv.quantity;
        const currentValue = inv.currentValue || 0;

        cumulativeInitialInvestment += initialInvestment;
        cumulativeCurrentValue += currentValue;

        timeline.push({
          date: inv.purchaseDate,
          value: parseFloat(cumulativeCurrentValue.toFixed(2)),
        });
      });

      setLineData(timeline);
    }
  }, [investments, joinDate]);

  return (
    <div className="charts-container">
      <div className="pie-chart-wrapper">
        <h3>Asset Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="line-chart-wrapper">
        <h3>Portfolio Value Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              tickFormatter={(value) => `$${value.toLocaleString()}`} // nicer Y axis
            />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#82ca9d"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
