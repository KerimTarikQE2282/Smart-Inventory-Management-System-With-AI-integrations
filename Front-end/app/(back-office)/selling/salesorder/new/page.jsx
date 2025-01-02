"use client";

import React from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { connect } from "react-redux";
import FormHeader from '../../../../../Components/dashboard/FormHeaders';
import TextInput from "@/Components/FormInputs/TextInput";
import SubumitButton from "@/Components/FormInputs/SubumitButton";
import { makePUTApiRequest, makePOSTApiRequest } from '../../../../../actions/StoreGeneralCrudRequests';
import { useGetDataById } from "@/hooks/useGetDataById";
import { Minus, Plus } from 'lucide-react';
import SelectComponent from '@/Components/FormInputs/SelectComponent';
import { getData } from '@/actions/storeActions/StoreGeneralCrudRequests/getData';
import NonIdSelectComponent from '@/Components/FormInputs/NonIdSelectComponent';
import SalesModal from '../Components/SalesModal';


function NewCustomer({ initialData, isupdate = false, makePOSTApiRequest, makePUTApiRequest }) {
  console.log("🚀 ==> file: page.jsx:14 ==> NewBrand ==> initialData:", initialData);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData, // Set initial data as default values
  });
  const [showModal,setShowModal]=React.useState(false) 

  const router = useRouter();
  const [FinalVersionFromData,setFinalVersionFromData]=React.useState({})
  const [loading, setLoading] = React.useState(false);
  const [product,setProduct]=React.useState([])
  const [customer,setCustomer]=React.useState([])

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
  
  


  const [itemNumber,setItemNumber]=React.useState(1)
  var itemsSold = [];
  var i;
for (i = 0; i < itemNumber; i++) {
  itemsSold.push(
    <div key={i} className={`${i !== 0 ? 'mt-[5vh]' : ''}`}
    >
     
      {i!=0 && <hr/> }
      <SelectComponent label="Items" name={`Item:${i}`}  type="text" width='full'  options={product}     register={register}  errors={errors}  className='w-full'/>
      <TextInput
        label="Quantity"
        name={`quantity:${i}`}
        type="number"
        width="not-full"
        register={register}
        errors={errors}
      />
      <TextInput
        label="Unit Price"
        name={`unitPrice:${i}`}
        type="number"
        step="0.01"
        width="not-full"
        register={register}
        errors={errors}
      />
    </div>
  );
}
var totalSalesPrice=0;
  // Handle form submission
  async function onSubmit(formData) {
    
    setLoading(true);
    setShowModal(true)
    try {
      if (isupdate) {
        // Update existing record
        const done = await makePUTApiRequest(`Customer/${initialData._id}`, setLoading, formData, 'brands');
        if (done === true) {
          router.replace('/storing/Brands');
        }
      } else {
        console.log("🚀 ==> file: page.jsx:29 ==> onSubmit ==> formData:", formData);
        var itemsBought=[];
        
        for (var i=0;i<itemNumber;i++){
          const Myitem={
            Item:formData[`Item:${i}`],
            quantity:formData[`quantity:${i}`],
            unitPrice:formData[`unitPrice:${i}`],
          }
          itemsBought.push(Myitem)
          var singleItemSalePrice=formData[`unitPrice:${i}`]*formData[`quantity:${i}`]

          totalSalesPrice+=singleItemSalePrice;
          console.log("🚀 ==> file: page.jsx:106 ==> onSubmit ==> totalSalesPrice:", totalSalesPrice);

        }

          // totalSalesPrice=(totalSalesPrice*0.15)+totalSalesPrice
        
    var user= JSON.parse(global?.window?.localStorage.getItem('INVENTORY_USER'))
    setFinalVersionFromData({
            orderNumber:formData.orderNumber,
            customer:formData.customer,
            orderStatus:formData.orderStatus,
            billingStatus:formData.billingStatus,
            paymentMethod:formData.paymentMethod,
            orderTotal:totalSalesPrice,
            payedAmount:formData.PayedAmount,
            salesRepresentative:user._id,
            Order_item:itemsBought,
          })
    console.log("🚀 ==> file: page.jsx:118 ==> onSubmit ==> FinalVersionFromData:", FinalVersionFromData);
          // if(FinalVersionFromData?.orderStatus  == 'paid' && ){

          // }

          
        // Create new record
       //await makePOSTApiRequest('GeneralSales', setLoading, FinalVersionFromData, 'GeneralSales');
       // router.replace('/selling/credits');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className='relative'>
       <FormHeader title={`${isupdate ? 'Update Customer' : 'New Customer'}`} link={'/dashboard/customers'} />
       <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
  <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
    <TextInput
      label="Order Number"
      name="orderNumber"
      type="text"
      width="not-full"
      register={register}
      errors={errors}
    />
      <SelectComponent label="Customer" name="customer"  type="text" width='full'  options={customer}     register={register}  errors={errors}  className='w-full'/>
      <NonIdSelectComponent label="Order Status" name="orderStatus"  type="text" width='full'  options={["pending", "delivered"]}     register={register}  errors={errors}  className='w-full'/>
      <NonIdSelectComponent label="Billing Status" name="billingStatus"  type="text" width='full'  options={["unpaid", "paid", "partially paid"]}     register={register}  errors={errors}  className='w-full'/>
      <NonIdSelectComponent label="Payment Method" name="paymentMethod" type="text" width='full'  options={["Cash", "Tele Birr", "Cbe birr", "Other bank transfer" ]}     register={register}  errors={errors}  className='w-full'/>

   
     
     
   
       <TextInput
      label="Payed Amount"
      name="PayedAmount"
      isrequired={false}
      type="number"  // Allows user to select date and time
      width="not-full"
      register={register}
      errors={errors}
      defaultValue={isupdate ? initialData?.dateCreated : new Date().toISOString().slice(0,16)}
    />

   
   
    
    {/* TODO dont forget the sales personell is the person currently logged in */}
    <div className='flex   flex-col col-span-2'>
   {itemsSold}
   </div>
   <br/>
   <div className='flex items-center space-x-10 flex-row'>
   <button className="p-1 bg-blue-600 rounded-md flex items-center space-x-2 px-3  w-[5vw]" onClick={(e) => { e.preventDefault(); setItemNumber(itemNumber + 1); }}>
  <Plus className="text-white w-4 h-4" />
  <span className='text-white'>More</span>
</button>
<button className="p-1 bg-red-600 rounded-md flex items-center space-x-2 px-3  w-[5vw]" onClick={(e) => { e.preventDefault(); setItemNumber(itemNumber - 1); }}>
  <Minus className="text-white w-4 h-4" />
  <span className='text-white'>Less</span>
</button>
<br/>
     </div>
  </div>

  <SubumitButton title={`${isupdate ? 'Update sales' : 'New sales'}`} isLoading={loading} />
</form>
{showModal && <SalesModal data={FinalVersionFromData} item={product} removeModal={setShowModal} request={makePOSTApiRequest} setLoading={setLoading}/>}
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { makePOSTApiRequest, makePUTApiRequest })(NewCustomer);
