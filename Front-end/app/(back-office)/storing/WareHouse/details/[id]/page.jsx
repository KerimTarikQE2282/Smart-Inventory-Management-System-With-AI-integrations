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
  console.log("🚀 ==> file: page.jsx:10 ==> WarehousePage ==> id:", id);

  const { data: warehouseData, error } = useGetDataById('WareHouse/wareHouseItems', {id:id})
  console.log("🚀 ==> file: page.jsx:16 ==> WarehousePage ==> warehouseData:", warehouseData);

  const { data: warehouseDetails, error:myDetailErrors } = useGetDataById('WareHouse/', {id:id})
  const WareHouseDetailsData=warehouseDetails?.data




  if (error) {
    console.error("Error fetching warehouse data:", error)
    return <div>Error loading warehouse data.</div>
  }

  const warehouse = warehouseData?.data

  ///////////////////////////////////////////Test
  const data = {
    labels: Object.keys(warehouse || {}),
    datasets: [
      {
        label: 'Ware House item Holdings',
        data: Object.values(warehouse || {}),
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


      <div className="relative w-full h-auto bg-white shadow-lg rounded-lg p-6 md:p-10 flex items-center gap-10 ">
        {/* Warehouse Title */}
    
        <div>
          <Image src={WareHouseImage} className='w-36 h-28'/>
          </div>
          <div>

      <p className='font-bold text-2xl'>{warehouse?.WareHouseName} WareHouse {WareHouseDetailsData?.WareHouseName}</p>
          <div className="text-sm font-semibold">Location: <span className="font-normal"> {WareHouseDetailsData?.WareHouseLocation} </span></div>
  <div className="text-smfont-semibold">Capacity: <span className="font-normal"> {WareHouseDetailsData?.Capacity} </span></div>
  <div className="text-sm font-semibold">Type: <span className="font-normal">{WareHouseDetailsData?.WareHouseType}</span></div>
  <div className="text-sm font-semibold">Description :<span className="font-normal"> {WareHouseDetailsData?.WareHouseDescription}</span>                 
 
  
  </div>

          </div>
      </div>

      {/* 4x4 Grid Layout */}
      <div className="grid grid-cols-2 grid-rows-2 items-start gap-4 mt-8">
      <div className="w-full ">
        <BarChart data={data} options={options} />

        </div>

       
        <div className="w-full h-40  flex items-center justify-center">
          <PieChart data={data} options={options}/>
        </div>
        <div className="w-full max-h-80 overflow-y-auto col-span-2">
  <DataTable 
    name={`WareHouse/wareHouseItemsDetailed/${id}`} 
    resourceTitle={'WareHouse'}  
    columns={['Carton_Number', 'itemName']}
  />
</div>             
        

      </div>
    </div>

  )
}
