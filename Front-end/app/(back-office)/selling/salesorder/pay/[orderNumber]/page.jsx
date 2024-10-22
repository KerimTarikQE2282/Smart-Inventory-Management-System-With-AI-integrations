"use client";

import React from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { connect } from "react-redux";
import FormHeader from '@/Components/dashboard/FormHeaders';          
import TextInput from "@/Components/FormInputs/TextInput";
import SubumitButton from "@/Components/FormInputs/SubumitButton";
import { makePUTApiRequest, makePOSTApiRequest } from '@/actions/StoreGeneralCrudRequests';   
import { useGetDataById } from "@/hooks/useGetDataById";
import { getData } from "@/actions/storeActions/StoreGeneralCrudRequests/getData";
import PaymentModal from '../../Components/PaymentModal';
function NewBrand() {
  const { initialData, isupdate = false, makePOSTApiRequest, makePUTApiRequest,params:orderNumber }=props
  const [showModal,setShowModal]=React.useState(false) 
  const [product,setProduct]=React.useState([])

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData, // Set initial data as default values
  });
   const [order,setOrder]=React.useState({})
   const [FinalVersionFromData,setFinalVersionFromData]=React.useState({})


   React.useEffect(() => {
    async function getItems(){try {
      const [ItemData,CustomerData]=await Promise.all([
        getData('items'),
        getData('Customer'),
      ])

  
      setProduct(ItemData.items)
      setCustomer(CustomerData.Customer)

    } catch (error) {
      console.log("🚀 ==> file: page.jsx:27 ==> NewCustomer ==> error:", error);
     }
  
    }
    getItems()
  },[])
  


   React.useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`GeneralSales/OrderNumber/${orderNumber.orderNumber}`);
      setOrder(data);
    };

    fetchData();
  }, [orderNumber.orderNumber]);

  // Handle form submission
  async function onSubmit(formData) {
   

    setLoading(true);
    const editedSale = {

      ...order,
      payment: [...order.payment, { 
        payedAmount: parseInt(formData.payedAmount), 
        date: Date.now() 
      }]
    };
    console.log("🚀 ==> file: page.jsx:43 ==> onSubmit ==> editedSale:", editedSale);

    setFinalVersionFromData(editedSale)
    setShowModal(true);

        // Create new record
        // await makePOSTApiRequest('GeneralSales/pay', setLoading, formData, 'Credit_Payment');
       // router.replace('/storing/Brands');
 
  }


  console.log("🚀 ==> file: page.jsx:26 ==> NewBrand ==> FinalVersionFromData:", FinalVersionFromData);

  return (
    <div>
      <FormHeader title={`${isupdate ? 'Update Brand' : 'Make Credit Payment'}`} link={'/dashboard/inventory/Brands'} />
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
        <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
      {OrderDetails(order)}
      
<TextInput
  label="Payed Amount"
  name="payedAmount"
  type="number"
  width="full"
  defaultValue={isupdate ? initialData?.BrandName || '' : ''}
  register={register}
  errors={errors}
/>


        </div>
        <SubumitButton title={'Payment'} isLoading={loading}  />
      </form>
      {showModal && <PaymentModal data={FinalVersionFromData} item={product} removeModal={setShowModal} request={makePOSTApiRequest} setLoading={setLoading}/>}

    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { makePOSTApiRequest, makePUTApiRequest })(NewBrand);



const OrderDetails = (order ) => {
  // Ensure order.payment is always an array
  const payments = Array.isArray(order.payment) ? order.payment : [];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Order Number: {order.orderNumber}</h2>
        <p><strong>Order Date:</strong> {order.orderDate}</p>
        <p><strong>Created At:</strong> {order.createdAt}</p>
        <p><strong>Status:</strong> {order.orderStatus}</p>
        <p><strong>Total Amount:</strong> ${order.orderTotal}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        <p><strong>Billing Status:</strong> {order.billingStatus}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
        <p><strong>Customer Name:</strong> {order.customer}</p>
        <p><strong>Customer Adress:</strong> {order.Customeradress}</p>
        <p><strong>Customer Phone:</strong> {order.CustomerPhone}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
        {
          <ul className="list-disc pl-5">
            {payments.map((pay, index) => (
              <li key={index} className="mb-2">
                <p><strong>Payment {index + 1}:</strong></p>
                <p><strong>Amount:</strong> ${pay.payedAmount}</p>
                <p><strong>Date:</strong> {pay.payedDate}</p>
              </li>
            ))}
          </ul>
       }
      </div>
    </div>
  );
};