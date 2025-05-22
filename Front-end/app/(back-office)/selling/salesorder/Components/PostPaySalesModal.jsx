import { Check, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Logo from '@/Resources/O.png';

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

  const componentRef = useRef();

  const getProductName = (id) => {
    const product = props.item.find((item) => item._id === id);
    return product?.title || 'Unknown';
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleRequest = async () => {
    console.log('Request Sent');
    try {
      await props.request('GeneralSales', props.setLoading, props.data, 'GeneralSales');
      handlePrint();
      props.removeModal(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div
      className="w-full h-[94.8vh] absolute top-0 bg-black"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div
        ref={componentRef}
        className="w-[47vw] h-[70vh] bg-white relative left-[20vw] top-[20vh] rounded-lg shadow-lg p-6"
      >
        <ShoppingCart />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>

        <div className="space-y-3">
          <InfoRow label="Order Number" value={orderNumber} />
          <InfoRow label="Customer" value={customer} />
          <InfoRow label="Order Status" value={orderStatus} />
          <InfoRow label="Billing Status" value={billingStatus} />
          <InfoRow label="Payment Method" value={paymentMethod} capitalize />
          <InfoRow label="Order Total" value={`$${orderTotal}`} />
          <InfoRow label="Payed Amount" value={`$${payedAmount}`} />
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Items Bought</h3>
        <div className="space-y-2 max-h-[15vh] overflow-y-auto">
          {Order_item.map((item, index) => (
            <div key={index} className="flex flex-col p-4 bg-gray-50 rounded-md shadow-sm">
              <InfoRow label={`Item ${index + 1}`} value={getProductName(item.Item)} />
              <InfoRow label="Quantity" value={item.quantity} />
              <InfoRow label="Unit Price" value={`$${item.unitPrice}`} />
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-10 flex-row mt-[3vh]">
          <ActionButton
            label="Accept"
            icon={<Check className="text-white w-4 h-4" />}
            color="bg-blue-600"
            onClick={handleRequest}
          />
          <ActionButton
            label="Cancel"
            icon={<X className="text-white w-4 h-4" />}
            color="bg-red-600"
            onClick={() => props.removeModal(false)}
          />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, capitalize = false }) {
  return (
    <div className="flex gap-5">
      <span className="font-medium text-gray-600">{label}:</span>
      <span className={`text-gray-900 ${capitalize ? 'capitalize' : ''}`}>{value}</span>
    </div>
  );
}

function ActionButton({ label, icon, color, onClick }) {
  return (
    <button
      className={`p-1 ${color} rounded-md flex items-center space-x-2 px-3 w-[5vw]`}
      onClick={onClick}
    >
      {icon}
      <span className="text-white">{label}</span>
    </button>
  );
}
