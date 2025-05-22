'use client';

import { Check, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function SalesModal(props) {
  const [user, setUser] = useState({});
  const componentRef = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem('INVENTORY_USER'));
      setUser(storedUser || {});
    }
  }, []);

  const latestPayment = props.data.payment[props.data.payment.length - 1];

  const backendSendingData = {
    OrderNumber: props.data.orderNumber,
    payedAmount: latestPayment?.payedAmount || 0,
  };

  async function handleRequest() {
    try {
      await props.request('GeneralSales/pay', props.setLoading, backendSendingData, 'GeneralSales');
      handlePrint();
      props.removeModal(false);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-5 overflow-y-auto">
      <div
        className="bg-white w-[95%] max-w-5xl rounded-lg shadow-lg p-6 sm:p-10"
        ref={componentRef}
      >
        <div className="flex justify-end text-sm text-right mb-4">
          <div>
            <p>Phone#: 0911240914</p>
            <p>Fax#: +0000-000-00-00</p>
            <p>Oumer Awol</p>
            <p>TIN: 0000000000</p>
            <p>Addis Ababa, Ethiopia</p>
          </div>
        </div>

        <section className="flex flex-col sm:flex-row justify-between mb-6 gap-4 text-sm">
          <div>
            <h2 className="text-lg font-bold mb-2">Bill To:</h2>
            <p><strong>Name:</strong> {props.data.customer}</p>
            <p><strong>Address:</strong> {props.data.customerAddress}</p>
            <p><strong>Phone#:</strong> {props.data.customerPhone}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Customer Invoice</h2>
            <p><strong>Date:</strong> {props.data.orderDate}</p>
            <p><strong>Invoice#:</strong> {props.data.orderNumber}</p>
            <p><strong>Status:</strong> {props.data.orderStatus}</p>
            <p><strong>Billing Status:</strong> {props.data.billingStatus}</p>
            <p><strong>Payment Method:</strong> {props.data.paymentMethod}</p>
          </div>
        </section>

        <section className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">S.N</th>
                <th className="border p-2">Order#</th>
                <th className="border p-2">Product Code</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Unit Price</th>
                <th className="border p-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {props.data.OrderedItems.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{props.data.orderNumber}</td>
                  <td className="border p-2">{item.productCode}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">{item.unitPrice}</td>
                  <td className="border p-2">{item.quantity * item.unitPrice}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="font-bold bg-gray-100">
              <tr>
                <td colSpan="5" className="border p-2 text-right">Amount Due</td>
                <td className="border p-2">{props.data.orderTotal}</td>
              </tr>
              <tr>
                <td colSpan="5" className="border p-2 text-right">Amount Paid</td>
                <td className="border p-2">
                  {props.data.payment.reduce((total, p) => total + (p.payedAmount || 0), 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2">Payment Details:</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Payment Date</th>
                  <th className="border p-2">Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                {props.data.payment.map((payment) => (
                  <tr key={payment._id}>
                    <td className="border p-2">{new Date(payment.date).toLocaleDateString()}</td>
                    <td className="border p-2">{payment.payedAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="text-sm mb-6">
          <p><strong>Prepared by:</strong> {user?.username || 'N/A'}</p>
          <p><strong>Signature:</strong> __________________</p>
          <p><strong>Date:</strong> __________________</p>
        </section>

        <footer className="text-center text-gray-500 text-sm">
          <p>Distribution: Original: For Payer | 2nd: For Accountant | 3rd: Pad</p>
        </footer>
      </div>

      <div className="fixed bottom-5 w-full flex justify-center px-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md w-full"
            onClick={handleRequest}
          >
            <Check className="w-4 h-4" />
            <span>Accept</span>
          </button>

          <button
            className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md w-full"
            onClick={(e) => {
              e.preventDefault();
              props.removeModal(false);
            }}
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
