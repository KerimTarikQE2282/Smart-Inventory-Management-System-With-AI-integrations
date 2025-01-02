// components/BarChartModal.js
import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Modal from 'react-modal';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const BarChartModal = ({ isOpen, onRequestClose, data }) => {
  const chartData = {
    labels: ['Predicted Quantity'],
    datasets: [
      {
        label: 'Predicted Quantity',
        data: data, // This should be an array of numbers
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <h2>Prediction Result</h2>
      <Bar data={chartData} />
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default BarChartModal;
