"use client";
import { useForm } from "react-hook-form";
import React from 'react';
import FormHeader from '../../../../../Components/dashboard/FormHeaders';
import TextInput from "@/Components/FormInputs/TextInput";
import SubumitButton from "@/Components/FormInputs/SubumitButton";
import TextAreaInputs from "@/Components/FormInputs/TextAreaInputs";
import { makePUTApiRequest, makePOSTApiRequest } from '../../../../../actions/StoreGeneralCrudRequests';
import { useRouter } from 'next/navigation'; // Import the router

export default function NewSupplier(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter(); // Initialize the router

  const {
    name = '',
    phone = '',
    email = '',
    address = '',
    contactPerson = '',
    taxID = '',
    supplierCode = '',
    PaymentTerms = '',
    notes = ''
  } = props.initialData || {};
  
  const isUpdate = props.isupdate;

  async function onSubmit(data) {
    setLoading(true); // Set loading state

    try {
      if (isUpdate) {
        await makePUTApiRequest(`Supplier/${props.initialData.id}`, setLoading, data, 'Supplier');
      } else {
        await makePOSTApiRequest('Supplier', setLoading, data, 'Supplier');
      }
      
      // Navigate after the API call is successful
      // router.replace('/dashboard/inventory/WareHouse');
    } catch (error) {
      console.error("API Error:", error); // Log the error for debugging
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  return (
    <div>
      <FormHeader title={`${isUpdate ? 'Update Supplier Information' : 'New Supplier'}`} link={'#'} />
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
        <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
          <TextInput label="Supplier Name" name="name" type="text" defaultValue={name} register={register} errors={errors} />
          <TextInput label="Supplier Phone" name="phone" type="text" defaultValue={phone} register={register} errors={errors} />
          <TextInput label="Supplier Email" name="email" type="email" defaultValue={email} register={register} errors={errors} />
          <TextInput label="Supplier Address" name="address" type="text" defaultValue={address} register={register} errors={errors} />
          <TextInput label="Supplier Contact Person" name="contactPerson" type="text" defaultValue={contactPerson} register={register} errors={errors} />
          <TextInput label="Supplier Code" name="supplierCode" type="text" defaultValue={supplierCode} register={register} errors={errors} />
          <TextInput label="Supplier Tax ID" name="taxID" type="text" defaultValue={taxID} register={register} errors={errors} />
          <TextAreaInputs label="Supplier Payment Terms" name="PaymentTerms" defaultValue={PaymentTerms} register={register} errors={errors} />
          <TextAreaInputs label="Supplier Notes" name="notes" defaultValue={notes} register={register} errors={errors} />
        </div>
        <SubumitButton title={`${isUpdate ? 'Update Supplier Information' : 'New Supplier'}`} isLoading={loading} />
      </form>
    </div>
  );
}
