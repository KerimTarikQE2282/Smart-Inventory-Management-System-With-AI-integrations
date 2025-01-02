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
function NewBrand({ initialData, isupdate = false, makePOSTApiRequest, makePUTApiRequest }) {


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
        const done = await makePUTApiRequest(`brands/${initialData._id}`, setLoading, formData, 'brands');
        if (done === true) {
          router.replace('/storing/Brands');
        }
      } else {
        // Create new record
        await makePOSTApiRequest('brands', setLoading, formData, 'brands');
        router.replace('/storing/Brands');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }



  return (
    <div>
      <FormHeader title={`${isupdate ? 'Update Brand' : 'New Brand'}`} link={'/dashboard/inventory/Brands'} />
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
        <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
        <TextInput
  label="Brand Name"
  name="BrandName"
  type="text"
  width="full"
  defaultValue={isupdate ? initialData?.BrandName || '' : ''}
  register={register}
  errors={errors}
/>

        </div>
        <SubumitButton title={`${isupdate ? 'Update Brand' : 'New Brand'}`} isLoading={loading} />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { makePOSTApiRequest, makePUTApiRequest })(NewBrand);
