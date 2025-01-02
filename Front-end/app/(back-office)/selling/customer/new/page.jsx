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


function NewCustomer({ initialData, isupdate = false, makePOSTApiRequest, makePUTApiRequest }) {
  console.log("🚀 ==> file: page.jsx:14 ==> NewBrand ==> initialData:", initialData);

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
        const done = await makePUTApiRequest(`Customer/${initialData._id}`, setLoading, formData, 'brands');
        if (done === true) {
          router.replace('/storing/Brands');
        }
      } else {
        // Create new record
        await makePOSTApiRequest('Customer', setLoading, formData, 'customer');
        router.replace('/selling/customer');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }



  return (
    <div>
       <FormHeader title={`${isupdate ? 'Update Customer' : 'New Customer'}`} link={'/dashboard/customers'} />
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
        <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
          <TextInput
            label="Customer Name"
            name="customerName"
            type="text"
            width="not-full"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Phone 1"
            name="phone1"
            type="text"
            width="full"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Phone 2"
            name="phone2"
            type="text"
            width="full"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Address 1"
            name="address1"
            type="text"
            width="full"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Address 2"
            name="address2"
            type="text"
            width="full"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Registered By"
            name="registeredBy"
            type="text"
            width="full"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Status"
            name="status"
            type="text"
            width="full"
            register={register}
            errors={errors}
            defaultValue={isupdate ? initialData?.status : 'active'}
          />
        </div>
        <SubumitButton title={`${isupdate ? 'Update Customer' : 'New Customer'}`} isLoading={loading} />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { makePOSTApiRequest, makePUTApiRequest })(NewCustomer);
