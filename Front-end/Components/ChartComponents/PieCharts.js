// components/PieChart.js

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components for the pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, options }) => {
  return <Pie data={data} options={options} />;
};

export default PieChart;
