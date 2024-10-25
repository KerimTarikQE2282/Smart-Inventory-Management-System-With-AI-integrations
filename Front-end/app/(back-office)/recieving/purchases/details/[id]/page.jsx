"use client";
import { useGetDataById } from '@/hooks/useGetDataById';
import { useParams } from 'next/navigation';
import React from 'react';

export default function PODetailPage() {
  const { id } = useParams();
  console.log("🚀 ==> file: page.jsx:10 ==> PODetailPage ==> id:", id);

  // Fetch the Purchase Order details using the `useGetDataById` hook
  const { data: poDetails, error: poError } = useGetDataById('PO/', { id });
  const purchaseOrder = poDetails?.data;

  // Handle potential errors
  if (poError) {
    console.error("Error fetching data:", poError);
    return <div>Error loading data.</div>;
  }
  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Purchase Order Title
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Purchase Order ID: {purchaseOrder?.PurchaseOrderId || 'N/A'}
        </p>
        
        <div className="space-y-2">
          <div className="flex " style={{width:'40vw',height:'30vh'}}>
            <img
              src={purchaseOrder?.PurchaseOrder } // Use correct field for the image URL or fallback to default
              alt="Purchase Order Document"
              onError={(e) => (e.target.src = POImage)} // Fallback if image fails to load
            />
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          Created At: {new Date(purchaseOrder?.createdAt).toLocaleDateString() || 'N/A'}
        </p>
        <p className="text-sm text-gray-400">
          Updated At: {new Date(purchaseOrder?.updatedAt).toLocaleDateString() || 'N/A'}
        </p>
      </div>
    </div>
  );
}
