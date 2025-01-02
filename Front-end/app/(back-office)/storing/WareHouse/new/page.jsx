"use client"
import { useForm } from "react-hook-form";
import React from 'react';
import FormHeader from '../../../../../Components/dashboard/FormHeaders';
import TextInput from "@/Components/FormInputs/TextInput";
import toast from "react-hot-toast";
import SubumitButton from "@/Components/FormInputs/SubumitButton";
import TextAreaInputs from "@/Components/FormInputs/TextAreaInputs";
import {makePOSTApiRequest} from "../../../../../actions/StoreGeneralCrudRequests";
import {makePUTApiRequest} from "../../../../../actions/StoreGeneralCrudRequests";

import { connect } from "react-redux";

 function NewWareHouse({initialData,isupdate,makePOSTApiRequest,makePUTApiRequest}) {


  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading,setLoading]=React.useState(false)
var done=false
  async function onSubmit(data){

    if(isupdate){
      setLoading(true)
      try {
        
       const done=await makePUTApiRequest(`WareHouse/${initialData._id}`,setLoading,data,'WareHouse')
         
         console.log("🚀 ==> file: page.jsx:28 ==> onSubmit ==> done:", done);

         if(done==true){
          router.replace('/storing/WareHouse')
       }
      } catch (error) {
        console.log(error)
      }
     
    }
    else{
      setLoading(true)

      await makePOSTApiRequest('WareHouse',setLoading,data,'WareHouse')
    }

  }
  return (
    <div>
      {/* { header } */}
      <FormHeader title={`${isupdate?'Update Warehouse Information':'New WareHouse'}`} link={'storing/WareHouse'} />
      {/* { Form } */}
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
        <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
         <TextInput label="WareHouse Name" name="WareHouseName" defaultValue={initialData?.WareHouseName || ''}  type="text" width='N-full'   register={register}  errors={errors}/>
         <TextInput label="WareHouse Location" name="WareHouseLocation" defaultValue={initialData?.WareHouseLocation || ''}   type="text" width='full'   register={register}  errors={errors}/>
         <TextInput label="WareHouse Capacity" name="Capacity" defaultValue={initialData?.Capacity || ''}   type="number" width='full'   register={register}  errors={errors}/>
         <TextAreaInputs  label="WareHouse  " name="WareHouseDescription"    type="text" width='full'  defaultValue={initialData?.WareHouseDescription || ''}   register={register}  errors={errors}/>

         {/* <TextInput label="Brand Name" name="WareHouseName"  type="text" width='full'   register={register}  errors={errors}/> */}
        

         <div className="flex items-center mb-4">
<input
    id="default-radio-1"
    type="radio"
    value={initialData?.WareHouseType      || ''} 
    name="Main"
    {...register("WareHouseType", { required: "This field is required" })}
    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  />
  <label
    htmlFor="default-radio-1"
    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
  >
    Main
  </label>
</div>
         <div className="flex items-center mb-4">
        
          
  <input
    id="default-radio-1"
    type="radio"
    value="Personal"
    name="Personal"
    {...register("WareHouseType", { required: "This field is required" })}
    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  />
  <label
    htmlFor="default-radio-1"
    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
  >
    Personal
  </label>
</div>

<div className="flex items-center">
  <input
    id="default-radio-2"
    type="radio"
    value="Shared"
    name="Shared"
    {...register("WareHouseType", { required: "This field is required" })}
    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  />
  <label
    htmlFor="default-radio-2"
    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
  >
    Shared
  </label>
</div>

        
        
        



        </div>
       <SubumitButton title={`${isupdate?'Updated Warehouse informations':'New Warehouse'}`} isLoading={loading}/>

      </form>
    </div>
  )
}

const mapStateToProps=(state)=>({

})

export default connect(mapStateToProps,{makePOSTApiRequest,makePUTApiRequest}) (NewWareHouse)