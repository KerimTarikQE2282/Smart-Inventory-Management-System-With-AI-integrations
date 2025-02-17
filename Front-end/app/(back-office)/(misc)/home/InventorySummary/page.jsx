import React from 'react';
import useWarehouseData from '@/hooks/useWarehouseData';
import BarChart from '@/Components/ChartComponents/BarCharts';

export default function WarehousePage() {
  const { warehouses, loading, error } = useWarehouseData;
  console.log("🚀 ==> WarehousePage ==> warehouses:", warehouses);


  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Sales Data for 2023' },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading warehouse data.</div>;

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-2 grid-rows-2 items-start gap-4 mt-8">
        {warehouses.map((myData, index) => {
          if (!myData) return null;

          const data = {
            labels: Object.keys(myData),
            datasets: [
              {
                label: 'Warehouse Item Holdings',
                data: Object.values(myData),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          };

          return <BarChart key={index} data={data} options={options} />;
        })}
      </div>
    </div>
  );
}
