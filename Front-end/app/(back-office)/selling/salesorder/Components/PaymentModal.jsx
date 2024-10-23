import { Check, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Logo from '@/Resources/O.png'
export default function SalesModal(props) {
  console.log("🚀 ==> file: SalesModal.jsx:7 ==> SalesModal ==> props:", props.data.payment[(props.data.payment).length-1]);

 

  // const {
  //   Order_item,
  //   billingStatus,
  //   customer,
  //   orderNumber,
  //   orderStatus,
  //   orderTotal,
  //   payedAmount,
  //   paymentMethod,
  //   salesRepresentative,
  // } = props.data;
  const user=JSON?.parse(global?.window?.localStorage.getItem('INVENTORY_USER'))
  const componentRef = useRef(); // Create a reference to the component

  function getProductName(id) {
    const product = props.item.find((myItem) => {
      return myItem._id === id;
    });
    return product?.title;
  }
  const backendSendingData={OrderNumber:props.data.orderNumber,payedAmount:props.data.payment[(props.data.payment).length-1].payedAmount}
  async function handleRequest() {
    console.log('Request Sent');
    try {
      await props.request('GeneralSales/pay', props.setLoading,backendSendingData, 'GeneralSales');

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
    <div className="w-full h-[94.8vh] bg-black absolute top-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <div className="bg-white relative left-[2vw] top-[2vh] w-[85vw] opacity-100 rounded-lg shadow-lg px-10 py-5 min-h-[100vh]" ref={componentRef}>
      <div className="flex flex-row justify-between">
        <Image src={Logo} alt="Logo" className="w-[20vw] h-[18vh] relative" />
        <div className="shop-info text-right">
          <p className="text-base mb-1">Phone#: 0911240914</p>
          <p className="text-base mb-1">Fax#: +0000-000-00-00</p>
          <p className="text-base mb-1">Oumer Awol</p>
          <p className="text-base mb-1">TIN: 0000000000</p>
          <p className="text-base mb-1">Addis Ababa, Ethiopia</p>
          <hr className="mt-2" />
        </div>
      </div>
  
      <section className="bill-to flex justify-between mb-5">
        <div className="customer-info">
          <h2 className="text-lg mb-2 font-bold">Bill To:</h2>
          <p><strong>Name:</strong> { props.datacustomer}</p>
          <p><strong>Address:</strong> { props.dataCustomeradress}</p>
          <p><strong>Phone#:</strong> { props.dataCustomerPhone}</p>
        </div>
        <div className="invoice-info">
          <h2 className="text-lg mb-2 font-bold">Customer Invoice</h2>
          <p><strong>Date:</strong> { props.data.orderDate}</p>
          <p><strong>Invoice#:</strong> { props.dataorderNumber}</p>
          <p><strong>Status:</strong> { props.dataorderStatus}</p>
          <p><strong>Billing Status:</strong> { props.databillingStatus}</p>
          <p><strong>Payment Method:</strong> { props.datapaymentMethod}</p>
        </div>
      </section>
  
      <section className="product-details">
        <table className="w-full border-collapse mb-5">
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
            { props.data.OrderedItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{ props.data.orderNumber}</td>
                <td className="border border-gray-300 p-2">{item.productCode}</td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
                <td className="border border-gray-300 p-2">{item.unitPrice}</td>
                <td className="border border-gray-300 p-2">{item.quantity * item.unitPrice}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="font-bold bg-gray-100">
            <tr>
              <td colSpan="6" className="border border-gray-300 p-2 text-right">Amount Due</td>
              <td className="border border-gray-300 p-2">{ props.data.orderTotal}</td>
            </tr>
            <tr>
              <td colSpan="6" className="border border-gray-300 p-2 text-right">Amount Paid</td>
              <td className="border border-gray-300 p-2">{ props.data.payment.reduce((total, p) => total + p.payedAmount, 0)}</td>
            </tr>
          </tfoot>
        </table>
      </section>
  
      <section className="payment-details mt-5">
        <h2 className="text-lg font-bold mb-2">Payment Details:</h2>
        <table className="w-full border-collapse mb-5">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Payment Date</th>
              <th className="border border-gray-300 p-2">Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            { props.data.payment.map((payment, index) => (
              <tr key={payment._id}>
                <td className="border border-gray-300 p-2">{new Date(payment.date).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">{payment.payedAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
  
      <section className=" mt-5">
        <p><strong>Prepared by:</strong> {user.username}</p>
        <p><strong>Signature:</strong> __________________</p>
        <p><strong>Date:</strong> __________________</p>
      </section>
  
      <footer className="text-center mt-5 text-gray-500">
        <p>Distribution: Original: For Payer | 2nd: For Accountant | 3rd: Pad</p>
      </footer>
    </div>
  
    <div className="flex flex-row gap-20 z-10 relative left-[30vw] top-[5vh] w-[40vw]">
      <div>
        <button className="p-1 bg-blue-600 rounded-md flex items-center space-x-2 px-3 w-[5vw]" onClick={handleRequest}>
          <Check className="text-white w-4 h-4" />
          <span className="text-white">Accept</span>
        </button>
      </div>
      <div>
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




