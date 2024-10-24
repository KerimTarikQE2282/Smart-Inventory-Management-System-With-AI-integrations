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
  const { id } = useParams();
  console.log("🚀 ==> file: page.jsx:10 ==> WarehousePage ==> id:", id);
  
  const { data: warehouseData, error: warehouseError } = useGetDataById('items//wareHouseItems', { id });
  const WareHouseStorageData = warehouseData?.data;
  console.log("🚀 ==> file: page.jsx:16 ==> ItemDetailPage ==> WareHouseStorageData:", WareHouseStorageData);

  const { data: itemDetails, error: itemError } = useGetDataById('items/', { id });
  const product = itemDetails?.data;

  if (itemError || warehouseError) {
    console.error("Error fetching data:", itemError || warehouseError);
    return <div>Error loading data.</div>;
  }

  const chartData = {
    labels: Object.keys(WareHouseStorageData || {}),
    datasets: [
      {
        label: 'Warehouse Item Holdings',
        data: Object.values(WareHouseStorageData || {}),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <img
        className="w-64 h-64 object-cover"
        src={product?.imagesUrl || WareHouseImage}
        alt={product?.title || 'Warehouse Item'}
      />
      
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{product?.title || 'Item Title'}</h2>
        <p className="text-gray-500 text-sm mb-4">SKU: {product?.SKU || 'N/A'}</p>
        
        <div className="space-y-2">
          {[
            { label: 'Barcode', value: product?.barcode },
            { label: 'Brand', value: product?.brand },
            { label: 'Category', value: product?.category },
            { label: 'Cost Price', value: `$${product?.costPrice}` },
            { label: 'Selling Price', value: `$${product?.sellingPrice}` },
            { label: 'Reorder Point', value: product?.reorderPoint },
            { label: 'Tax Rate', value: `${product?.taxRate}%` },
            { label: 'Weight', value: `${product?.weight} kg` },
            { label: 'Dimensions', value: product?.dimensions },
            { label: 'Supplier', value: product?.supplier },
            { label: 'Description', value: product?.description }
          ].map(({ label, value }, idx) => (
            <div className="flex" key={idx}>
              <span className="font-semibold">{label}:</span>
              <span>{value || 'N/A'}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-400 mt-4">Created At: {new Date(product?.createdAt).toLocaleDateString() || 'N/A'}</p>
        <p className="text-sm text-gray-400">Updated At: {new Date(product?.updatedAt).toLocaleDateString() || 'N/A'}</p>
      </div>

      <div className="w-full h-full p-4">
        <BarChart data={chartData} />
      </div>

      <DataTable
        name={`WareHouse/wareHouseItemsDetailed/${id}`} 
        resourceTitle="WareHouse"  
        columns={['Carton_Number', 'itemName']}
      />
    </div>
  );
}
