"use client"
import { useGetDataById } from '@/hooks/useGetDataById'
import DetailsNavBar from '@/Components/DetailsNavBar'
import { useParams } from 'next/navigation'
import React from 'react'
import BarChart from '@/Components/ChartComponents/BarCharts'
import Image from 'next/image'
import WareHouseImage from '@/Resources/WareHouse.png'
import PieChart from '@/Components/ChartComponents/PieCharts'
import DataTable from '@/Components/dashboard/DataTable'
export default function ItemDetailPage() {
  const { id } = useParams()
  console.log("🚀 ==> file: page.jsx:10 ==> WarehousePage ==> id:", id);
  const { data: warehouseData, error } = useGetDataById('items//wareHouseItems', {id:id})
  const WareHouseStoreageData= warehouseData?.data;
  console.log("🚀 ==> file: page.jsx:16 ==> ItemDetailPage ==> WareHouseStoreageData:", WareHouseStoreageData);



  const { data: ItemDetails, error:myDetailErrors } = useGetDataById('items/', {id:id})
  // const ItemDetailsData=ItemDetails.data

  const product=ItemDetails?.data


  if (myDetailErrors) {
    console.error("Error fetching warehouse data:", error)
    return <div>Error loading warehouse data.</div>
  }
  // const {data:StoreageDetails, error:myDetailErrors2 } = useGetDataById('wareHouseItems/', {id:id})
  // const StoreageDetailsData=StoreageDetails?.data
  // console.log("🚀 ==> file: page.jsx:27 ==> ItemDetailPage ==> StoreageDetailsData:", StoreageDetailsData);


  ///////////////////////////////////////////Test
  const data = {
    labels: Object.keys(WareHouseStoreageData || {}),
    datasets: [
      {
        label: 'Ware House item Holdings',
        data: Object.values(WareHouseStoreageData || {}),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Monthly Sales Data for 2023',
  //     },
  //   },
  // };

  return (
    <div className=" mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
    <img
      className="w-64 h-64 object-cover"
      src={product?.imagesUrl}
      alt={product?.title}
    />
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{product?.title}</h2>
      <p className="text-gray-500 text-sm mb-4">SKU: {product?.SKU}</p>
      <div className="space-y-2">
        <div className="flex ">
          <span className="font-semibold">Barcode:</span>
          <span>{product?.barcode}</span>
        </div>
        <div className="flex ">
          <span className="font-semibold">Brand:</span>
          <span>{product?.brand}</span>
        </div>
        <div className="flex ">
          <span className="font-semibold">Category:</span>
          <span>{product?.category}</span>
        </div>
        <div className="flex ">
          <span className="font-semibold">Cost Price:</span>
          <span>${product?.costPrice}</span>
        </div>
        <div className="flex ">
          <span className="font-semibold">Selling Price:</span>
          <span>${product?.sellingPrice}</span>
        </div>
        <div className="flex ">
          <span className="font-semibold">Reorder Point:</span>
          <span>{product?.reorderPoint}</span>
        </div>
        <div className="flex ">
          <span className="font-semibold">Tax Rate:</span>
          <span>{product?.taxRate}%</span>
        </div>
        <div className="flex ">
          <span className="font-semibold">Weight:</span>
          <span>{product?.weight} kg</span>
        </div>
        <div className="flex ">
          <span className="font-semibold">Dimensions:</span>
          <span>{product?.dimensions}</span>
        </div>
        <div className="flex j">
          <span className="font-semibold">Supplier:</span>
          <span>{product?.supplier}</span>
        </div>
        <div className="flex ">
          <span className="font-semibold">Description:</span>
          <span>{product?.description}</span>
        </div>
      </div>
      <p className="text-sm text-gray-400 mt-4">Created At: {new Date(product?.createdAt).toLocaleDateString()}</p>
      <p className="text-sm text-gray-400">Updated At: {new Date(product?.updatedAt).toLocaleDateString()}</p>
    </div>
    <div className="w-full h-full ">
        <BarChart data={data}  />

        </div>
  </div>
  )
}
