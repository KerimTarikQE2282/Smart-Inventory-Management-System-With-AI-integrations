"use client"
import { useGetDataById } from '@/hooks/useGetDataById'
import DetailsNavBar from '@/Components/DetailsNavBar'
import { useParams } from 'next/navigation'
import React from 'react'
import BarChart from '@/Components/ChartComponents/BarCharts'

export default function WarehousePage() {
  const { id } = useParams()
  console.log("🚀 ==> file: page.jsx:10 ==> WarehousePage ==> id:", id);

  const { data: warehouseData, error } = useGetDataById('WareHouse/wareHouseItems', {id:id})


  if (error) {
    console.error("Error fetching warehouse data:", error)
    return <div>Error loading warehouse data.</div>
  }

  const warehouse = warehouseData?.data
  console.log("🚀 ==> file: page.jsx:22 ==> WarehousePage ==> warehouse:", warehouse);

  ///////////////////////////////////////////Test
  const data = {
    labels: Object.keys(warehouse),
    datasets: [
      {
        label: 'Ware House item Holdings',
        data: Object.values(warehouse),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Data for 2023',
      },
    },
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <DetailsNavBar title="Warehouse" link="/storing/WareHouse/new" />

      {/* Main Warehouse Info */}
      <div className="relative w-full h-auto bg-white shadow-lg rounded-lg p-6 md:p-10 flex items-center ">
        {/* Warehouse Title */}
        <h1 className="text-xl md:text-4xl font-bold text-gray-800">
          {warehouse?.WareHouseName} Warehouse
        </h1>
      </div>

      {/* 4x4 Grid Layout */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-8">
        <div className="w-full h-52 flex  p-10 shadow-xl flex-row">
          <div>Location:Merkato</div>

        </div>
        <div className="w-full h-full ">
        <BarChart data={data} options={options} />

        </div>
        <div className="w-full h-40 bg-red-200 flex items-center justify-center">3</div>
        <div className="w-full h-40 bg-yellow-200 flex items-center justify-center">4</div>
        
      </div>
    </div>
  )
}
