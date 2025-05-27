"use client"
import { useGetDataById } from '@/hooks/useGetDataById'
import DetailsNavBar from '@/Components/DetailsNavBar'
import { useParams } from 'next/navigation'
import React from 'react'
import BarChart from '@/Components/ChartComponents/BarCharts'
import Image from 'next/image'
import WareHouseImage from '@/Resources/WareHouse.png'
import PieChart from '@/Components/ChartComponents/PieCharts'
import DataTable from '../../Components/DataTable'

export default function WarehousePage() {
  const { id } = useParams()
  console.log("🚀 ==> WarehousePage ==> id:", id)

  const { data: warehouseData, error } = useGetDataById('WareHouse/wareHouseItems', { id })
  const { data: warehouseDetails, error: myDetailErrors } = useGetDataById('WareHouse/', { id })

  if (error) {
    console.error("Error fetching warehouse data:", error)
    return <div>Error loading warehouse data.</div>
  }

  const warehouse = warehouseData?.data
  const WareHouseDetailsData = warehouseDetails?.data

  // Generate distinct colors
  const generateColors = (length) => {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
      '#9966FF', '#FF9F40', '#E7E9ED', '#8BC34A',
      '#FF5722', '#03A9F4', '#F44336', '#CDDC39',
      '#9C27B0', '#00BCD4', '#795548', '#607D8B'
    ]
    return Array.from({ length }, (_, i) => colors[i % colors.length])
  }

  const labels = Object.keys(warehouse || {})
  const values = Object.values(warehouse || {})
  const colors = generateColors(labels.length)

  const data = {
    labels,
    datasets: [
      {
        label: 'Warehouse Item Holdings',
        data: values,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  }

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
  }

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <div className="relative w-full h-auto bg-white shadow-lg rounded-lg p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
        <div>
          <Image src={WareHouseImage} alt="Warehouse" className="w-36 h-28 object-contain" />
        </div>
        <div className="text-center md:text-left">
          <p className="font-bold text-2xl">
            {warehouse?.WareHouseName || WareHouseDetailsData?.WareHouseName} Warehouse
          </p>
          <div className="text-sm font-semibold">
            Location: <span className="font-normal"> {WareHouseDetailsData?.WareHouseLocation} </span>
          </div>
          <div className="text-sm font-semibold">
            Capacity: <span className="font-normal"> {WareHouseDetailsData?.Capacity} </span>
          </div>
          <div className="text-sm font-semibold">
            Type: <span className="font-normal"> {WareHouseDetailsData?.WareHouseType} </span>
          </div>
          <div className="text-sm font-semibold">
            Description: <span className="font-normal"> {WareHouseDetailsData?.WareHouseDescription} </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="w-full ">
          <BarChart data={data} options={options} />
        </div>

        <div className="w-full h-64 flex items-center justify-center">
          <PieChart data={data} options={options} />
        </div>

        <div className="w-full col-span-1 md:col-span-2 max-h-80 overflow-y-auto">
          <DataTable
            name={`WareHouse/wareHouseItemsDetailed/${id}`}
            resourceTitle="WareHouse"
            columns={['Carton_Number', 'itemName','Container_Id']}
          />
        </div>
      </div>
    </div>
  )
}
