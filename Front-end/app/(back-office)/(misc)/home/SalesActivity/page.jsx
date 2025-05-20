'use client'
import React from 'react'
import {useGetData} from '../../../../../hooks/useGetData';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react'
import axios from 'axios';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function page() {
  const [salesData,setSalesData]=useState([])
  React.useEffect(()=>{
   axios.get('https://smart-inventory-management-system-with-a1f2.onrender.com/api/v1/GeneralSales/weeklySales/')
   .then((res)=>{
     setSalesData(res.data)
   })
  }
  ,[])
  


  
  console.log("🚀 ==> page ==> salesData:", salesData);

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (salesData?.length === 0) return;
    
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
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    });
  }, [salesData]);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Weekly Sales</h2>
      <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </div>
  );
};

export default page;