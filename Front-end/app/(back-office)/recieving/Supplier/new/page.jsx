"use client";

import React from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { connect } from "react-redux";
import FormHeader from '../../../../../Components/dashboard/FormHeaders';
import TextInput from "@/Components/FormInputs/TextInput";
import TextAreaInputs from "@/Components/FormInputs/TextAreaInputs";
import SubumitButton from "@/Components/FormInputs/SubumitButton";
import { makePUTApiRequest, makePOSTApiRequest } from '../../../../../actions/StoreGeneralCrudRequests';

function NewSupplier({ initialData, isupdate = false, makePOSTApiRequest, makePUTApiRequest }) {
  console.log("🚀 ==> file: page.jsx:14 ==> NewSupplier ==> initialData: if there is ", initialData);
  
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData, // Set initial data as default values
  });

  // Handle form submission
  async function onSubmit(formData) {
    setLoading(true);
    try {
      if (isupdate) {
        // Update existing record
        const done = await makePUTApiRequest(`Supplier/${initialData._id}`, setLoading, formData, 'Supplier');
        if (done === true) {
          router.replace('/recieving/Supplier');
        }
      } else {
        // Create new record
        await makePOSTApiRequest('supplier', setLoading, formData, 'supplier');
        router.replace('/recieving/Supplier');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <FormHeader title={`${isupdate ? 'Update Supplier Information' : 'New Supplier'}`} link={'/dashboard/inventory/Supplier'} />
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
        <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
          <TextInput
            label="Supplier Name"
            name="name"
            type="text"
            defaultValue={isupdate ? initialData?.name || '' : ''}
            register={register}
            errors={errors}
          />
          <TextInput
            label="Supplier Phone"
            name="phone"
            type="text"
            defaultValue={isupdate ? initialData?.phone || '' : ''}
            register={register}
            errors={errors}
          />
          <TextInput
            label="Supplier Email"
            name="email"
            type="email"
            defaultValue={isupdate ? initialData?.email || '' : ''}
            register={register}
            errors={errors}
          />
          <TextInput
            label="Supplier Address"
            name="address"
            type="text"
            defaultValue={isupdate ? initialData?.address || '' : ''}
            register={register}
            errors={errors}
          />
          <TextInput
            label="Supplier Contact Person"
            name="contactPerson"
            type="text"
            defaultValue={isupdate ? initialData?.contactPerson || '' : ''}
            register={register}
            errors={errors}
          />
          <TextInput
            label="Supplier Code"
            name="supplierCode"
            type="text"
            defaultValue={isupdate ? initialData?.supplierCode || '' : ''}
            register={register}
            errors={errors}
          />
          <TextInput
            label="Supplier Tax ID"
            name="taxID"
            type="text"
            defaultValue={isupdate ? initialData?.taxID || '' : ''}
            register={register}
            errors={errors}
          />
          <TextAreaInputs
            label="Supplier Payment Terms"
            name="PaymentTerms"
            defaultValue={isupdate ? initialData?.PaymentTerms || '' : ''}
            register={register}
            errors={errors}
          />
          <TextAreaInputs
            label="Supplier Notes"
            name="notes"
            defaultValue={isupdate ? initialData?.notes || '' : ''}
            register={register}
            errors={errors}
          />
        </div>
        <SubumitButton title={`${isupdate ? 'Update Supplier Information' : 'New Supplier'}`} isLoading={loading} />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { makePOSTApiRequest, makePUTApiRequest })(NewSupplier);
