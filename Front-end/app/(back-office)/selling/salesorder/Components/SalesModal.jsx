'use client';
import { Check, X } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Logo from '@/Resources/O.png';

export default function SalesModal(props) {
  const user = JSON?.parse(global?.window?.localStorage.getItem('INVENTORY_USER'));

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
    const product = props.item.find((myItem) => myItem._id === id);
    return product?.title || 'Unknown Product';
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleRequest = async () => {
    try {
      await props.request('GeneralSales', props.setLoading, props.data, 'GeneralSales');
      handlePrint();
      props.removeModal(false);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        ref={componentRef}
        className="bg-white w-full max-w-5xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <Image src={Logo} alt="Logo" className="w-32 h-auto" />
          <div className="text-sm text-right">
            <p>Phone#: 0911240914</p>
            <p>Fax#: +0000-000-00-00</p>
            <p>Oumer Awol</p>
            <p>TIN: 0000000000</p>
            <p>Addis Ababa, Ethiopia</p>
            <hr className="mt-2" />
          </div>
        </div>

        {/* Customer & Invoice Info */}
        <div className="flex flex-col md:flex-row justify-between mb-6 text-sm">
          <div>
            <h2 className="text-lg font-semibold mb-2">Bill To:</h2>
            <p><strong>Name:</strong> {customer}</p>
            <p><strong>Address:</strong> HARAR, HARAR</p>
            <p><strong>Phone#:</strong></p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Customer Invoice</h2>
            <p><strong>Date:</strong> 02 Sep, 2024</p>
            <p><strong>Invoice#:</strong> {orderNumber}</p>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">S.N</th>
                <th className="border border-gray-300 p-2">Order#</th>
                <th className="border border-gray-300 p-2">Product Code</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Unit Price</th>
                <th className="border border-gray-300 p-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {Order_item.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{orderNumber}</td>
                  <td className="border border-gray-300 p-2">{getProductName(item.Item)}</td>
                  <td className="border border-gray-300 p-2">{item.quantity}</td>
                  <td className="border border-gray-300 p-2">{item.unitPrice}</td>
                  <td className="border border-gray-300 p-2">
                    {item.quantity * item.unitPrice}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="font-bold bg-gray-100">
              <tr>
                <td colSpan="5" className="border border-gray-300 p-2 text-right">Amount Due</td>
                <td className="border border-gray-300 p-2">{orderTotal}</td>
              </tr>
              <tr>
                <td colSpan="5" className="border border-gray-300 p-2 text-right">Amount Paid</td>
                <td className="border border-gray-300 p-2">{payedAmount}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Payment Info */}
        <div className="text-sm mb-6">
          <p><strong>Prepared by:</strong> {user?.username}</p>
          <p><strong>Signature:</strong> __________________</p>
          <p><strong>Date:</strong> __________________</p>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-xs">
          <p>Distribution: Original: For Payer | 2nd: For Accountant | 3rd: Pad</p>
        </footer>
      </div>

      {/* Buttons */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-4">
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          onClick={handleRequest}
        >
          <Check className="w-4 h-4" />
          Accept
        </button>
        <button
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md text-sm"
          onClick={() => props.removeModal(false)}
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
}
