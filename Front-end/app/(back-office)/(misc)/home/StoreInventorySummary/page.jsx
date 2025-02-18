'use client'
import React from 'react';
import { useStoreData } from '../../../../../hooks/useStoreData';
import BarChart from '@/Components/ChartComponents/BarCharts';

export default function WarehousePage() {
  const { warehouses, loading, error } = useStoreData();
  console.log("🚀 ==> WarehousePage ==> warehouses:", warehouses);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Warehouse Item Types" },
    },
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-2 gap-4 mt-8">
        {warehouses.map((warehouse, index) => {
          if (!warehouse) return null;
          
          // Group items by itemName
          const counts = warehouse.details.reduce((acc, item) => {
            const name = item.itemName || "Unknown";
            acc[name] = (acc[name] || 0) + 1;
            return acc;
          }, {});

          const labels = Object.keys(counts);
          const values = Object.values(counts);

          const data = {
            labels,
            datasets: [
              {
                label: "Count of Items",
                data: values,
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          };

          return (
            <div key={index} className="w-[25vw]">
              <h3 className="text-center font-bold mb-2">Warehouse {index + 1}</h3>
              <BarChart data={data} options={options} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
