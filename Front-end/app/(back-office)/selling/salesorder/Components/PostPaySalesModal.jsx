import { Check, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Logo from '@/Resources/O.png'
export default function SalesModal(props) {
  const {
    Order_item,
    billingStatus,
    customer,
    orderNumber,
    orderStatus,
    orderTotal,
    payedAmount,
    paymentMethod,
    salesRepresentative,
  } = props.data;

  const componentRef = useRef(); // Create a reference to the component

  function getProductName(id) {
    const product = props.item.find((myItem) => {
      return myItem._id === id;
    });
    return product?.title;
  }

  async function handleRequest() {
    console.log('Request Sent');
    try {
      await props.request('GeneralSales', props.setLoading, props.data, 'GeneralSales');
     handlePrint()
      props.removeModal(false);
    } catch (error) {
      console.log('Error:', error);
    }
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
      });
  return (
    <div className="w-full h-[94.8vh] bg-black absolute top-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} >
      <div className="w-[47vw] h-[70vh] bg-white relative left-[20vw] top-[20vh] opacity-100 rounded-lg shadow-lg p-6" ref={componentRef}>
        <ShoppingCart />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>

        <div className="space-y-3">
          <div className="flex gap-5">
            <span className="font-medium text-gray-600">Order Number:</span>
            <span className="text-gray-900">{orderNumber}</span>
          </div>

          <div className="flex gap-5">
            <span className="font-medium text-gray-600">Customer:</span>
            <span className="text-gray-900">{customer}</span>
          </div>

          <div className="flex gap-5">
            <span className="font-medium text-gray-600">Order Status:</span>
            <span className="text-gray-900">{orderStatus}</span>
          </div>

          <div className="flex gap-5">
            <span className="font-medium text-gray-600">Billing Status:</span>
            <span className="text-gray-900">{billingStatus}</span>
          </div>

          <div className="flex gap-5">
            <span className="font-medium text-gray-600">Payment Method:</span>
            <span className="text-gray-900 capitalize">{paymentMethod}</span>
          </div>

          <div className="flex gap-5">
            <span className="font-medium text-gray-600">Order Total:</span>
            <span className="text-gray-900">${orderTotal}</span>
          </div>

          <div className="flex gap-5">
            <span className="font-medium text-gray-600">Payed Amount:</span>
            <span className="text-gray-900">${payedAmount}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Items Bought</h3>
        <div className="space-y-2 max-h-[15vh] overflow-y-auto">
          {Order_item.map((item, index) => (
            <div key={index} className="flex flex-col p-4 bg-gray-50 rounded-md shadow-sm">
              <div className="flex gap-5 mb-2">
                <span className="text-gray-600 font-medium">Item {index + 1}:</span>
                <span className="text-gray-900">{getProductName(item.Item)}</span>
              </div>
              <div className="flex gap-5 mb-2">
                <span className="text-gray-600 font-medium">Quantity:</span>
                <span className="text-gray-900">{item.quantity}</span>
              </div>
              <div className="flex gap-5">
                <span className="text-gray-600 font-medium">Unit Price:</span>
                <span className="text-gray-900">${item.unitPrice}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-10 flex-row mt-[3vh]">
          <button className="p-1 bg-blue-600 rounded-md flex items-center space-x-2 px-3 w-[5vw]" onClick={handleRequest}>
            <Check className="text-white w-4 h-4" />
            <span className="text-white">Accept</span>
          </button>
          <button
            className="p-1 bg-red-600 rounded-md flex items-center space-x-2 px-3 w-[5vw]"
            onClick={(e) => {
              e.preventDefault();
              props.removeModal(false);
            }}
          >
            <X className="text-white w-4 h-4" />
            <span className="text-white">Cancel</span>
          </button>
        </div>
      </div>
    </div>

  );
}


