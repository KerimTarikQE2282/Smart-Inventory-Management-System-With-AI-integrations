'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useGetData } from '@/hooks/useGetData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function Page() {
  const [salesData, setSalesData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const { isLoading, data, isError, error, isFetching } = useGetData('WareHouseAdjustments');
  const PieChartData = data?.data || {};

  useEffect(() => {
    axios.get('https://smart-inventory-management-system-with-a1f2.onrender.com/api/v1/GeneralSales/weeklySales/')
      .then((res) => {
        setSalesData(res.data);
      });
  }, []);

  useEffect(() => {
    if (salesData.length === 0) return;
    
    const salesByDay = { Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0 };
    
    salesData.forEach(sale => {
      const dayOfWeek = new Date(sale.orderDate).toLocaleString('en-US', { weekday: 'long' });
      salesByDay[dayOfWeek] += sale.orderTotal;
    });

    setChartData({
      labels: Object.keys(salesByDay),
      datasets: [{
        label: 'Total Sales per Day',
        data: Object.values(salesByDay),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointRadius: 5,
      }],
    });
  }, [salesData]);

  const pieData = {
    labels: Object.keys(PieChartData),
    datasets: [{
      label: 'Item Distribution',
      data: Object.values(PieChartData),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      borderColor: '#fff',
      borderWidth: 1,
    }],
  };

  if (!chartData) return <p>Loading...</p>;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div>
      <h2 className="text-xl font-semibold text-center mb-4">Weekly Sales</h2>
      <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
      <div>
      <h2 className="text-xl font-semibold text-center mt-8">Warehouse Item Distribution</h2>
      <div className="flex justify-center">
        <Pie data={pieData} options={{ responsive: true }} />
      </div>
      </div>
    </div>
  );
}

export default Page;