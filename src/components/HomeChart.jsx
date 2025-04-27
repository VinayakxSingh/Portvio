import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './HomeChart.css'; // Import your styles
import { Link } from 'react-router-dom';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4000 },
  { name: 'May', value: 4500 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 6000 },
];

const HomeChart = () => {
  return (
    <div className="home-chart-container">
      <div className="performance-chart-container">
        <h3>Portfolio Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="value" stroke="#4e39b1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-action">
        <Link to={"/login"}>
        <button className="market-button" style={{alignSelf:"center", textAlign:'center'}}>Wanna see in-depth? Go here</button>
        </Link></div>
    </div>
  );
};

export default HomeChart;
