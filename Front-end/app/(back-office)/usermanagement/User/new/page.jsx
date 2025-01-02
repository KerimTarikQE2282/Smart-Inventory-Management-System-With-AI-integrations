"use client";

import React from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { connect } from "react-redux";
import FormHeader from '@/Components/dashboard/FormHeaders';
import TextInput from "@/Components/FormInputs/TextInput";
import SelectComponent from "@/Components/FormInputs/SelectComponent";
import SubumitButton from "@/Components/FormInputs/SubumitButton";
import { makePUTApiRequest, makePOSTApiRequest } from '@/actions/StoreGeneralCrudRequests';
import { useGetDataById } from "@/hooks/useGetDataById";
import ImageInput from "@/Components/FormInputs/ImageInput";

function NewUser({ initialData, isupdate = false, makePOSTApiRequest, makePUTApiRequest }) {
  const [imageUrl, setImageUrl] = React.useState(isupdate ? initialData?.imageUrl : '');

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
        const done = await makePUTApiRequest(`user/${initialData._id}`, setLoading, formData, 'user');
        if (done === true) {
          router.replace('/storing/Brands');
        }
      } else {
        // Create new record
        const modifiedData = { ...formData, profilePicture: imageUrl }; // Corrected here
        await makePOSTApiRequest('', setLoading, modifiedData, 'brands');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const roles = [
    { id: 'admin', title: 'Admin' },
    { id: 'sales_personnel', title: 'Sales Personnel' },
    { id: 'warehouse_personnel', title: 'Warehouse Personnel' },
    { id: 'accountant', title: 'Accountant' }
  ];
  return (
    <div>
      <FormHeader title={`${isupdate ? 'Update User' : 'New User'}`} link={'/dashboard/inventory/Brands'} />
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
        <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
          <TextInput
            label="Username"
            name="username"
            type="text"
            width="full"
            defaultValue={isupdate ? initialData?.username || '' : ''}
            register={register}
            errors={errors}
          />
        { !isupdate && <TextInput
            label="Password"
            name="password"
            type="password"
            width="full"
            defaultValue={isupdate ? initialData?.password || '' : ''}
            register={register}
            errors={errors}
          />}
          <TextInput
            label="Email"
            name="email"
            type="email"
            width="full"
            defaultValue={isupdate ? initialData?.email || '' : ''}
            register={register}
            errors={errors}
          />
                   <SelectComponent label="Role" name="role"  type="text" width='full'  options={roles}   register={register}  errors={errors}  className='w-full'/>

          <TextInput
            label="Full Name"
            name="fullName"
            type="text"
            width="full"
            defaultValue={isupdate ? initialData?.fullName || '' : ''}
            register={register}
            errors={errors}
          />
          <TextInput
            label="Phone Number"
            name="phoneNumber"
            type="text"
            width="full"
            defaultValue={isupdate ? initialData?.phoneNumber || '' : ''}
            register={register}
            errors={errors}
          />
        
          <TextInput
            label="Address"
            name="address"
            type="text"
            width="full"
            defaultValue={isupdate ? initialData?.address || '' : ''}
            register={register}
            errors={errors}
          />
          <TextInput
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            width="full"
            defaultValue={isupdate ? initialData?.dateOfBirth || '' : ''}
            register={register}
            errors={errors}
          />
          <TextInput
            label="Department"
            name="department"
            type="text"
            width="full"
            defaultValue={isupdate ? initialData?.department || '' : ''}
            register={register}
            errors={errors}
          />
         
          <TextInput
            label="Permissions"
            name="permissions"
            type="text"
            width="full"
            defaultValue={isupdate ? initialData?.permissions || '' : ''}
            register={register}
            errors={errors}
          />
          <ImageInput label="User Profile Image" imageURL={imageUrl} setImageUrl={setImageUrl} />
        </div>
        <SubumitButton title={`${isupdate ? 'Update User' : 'New User'}`} isLoading={loading} />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { makePOSTApiRequest, makePUTApiRequest })(NewUser);
