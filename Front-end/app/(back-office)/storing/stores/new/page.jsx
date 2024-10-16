"use client"
import { useForm } from "react-hook-form";
import React from 'react';
import FormHeader from '../../../../../Components/dashboard/FormHeaders';
import TextInput from "@/Components/FormInputs/TextInput";
import SubumitButton from "@/Components/FormInputs/SubumitButton";
import {makePOSTApiRequest} from "@/actions/StoreGeneralCrudRequests";
import  {makePUTApiRequest} from "@/actions/StoreGeneralCrudRequests";
import { useGetDataById } from "@/hooks/useGetDataById";
import { connect } from "react-redux";
import TextAreaInputs from "@/Components/FormInputs/TextAreaInputs";
import { useRouter } from "next/navigation";

function NewStore({initialData,isupdate,makePOSTApiRequest,makePUTApiRequest}) {
  
   // Fetch data by ID




   const { register, handleSubmit, watch, formState: { errors } } = useForm();
   const [loading,setLoading]=React.useState(false)
   const router=useRouter()
 var done=false
   async function onSubmit(data){
 
     if(isupdate){
       setLoading(true)
       try {
         
        const done=await makePUTApiRequest(`stores/${initialData._id}`,setLoading,data,'stores')
          
          console.log("🚀 ==> file: page.jsx:28 ==> onSubmit ==> done:", done);
          router.replace('/storing/stores')
        
       } catch (error) {
         console.log(error)
       }
      
     }
     else{
       setLoading(true)
       console.log("🚀 ==> file: page.jsx:47 ==> onSubmit ==> data:", data);

       await makePOSTApiRequest('stores',setLoading,data,'Stores')
       router.replace('/storing/stores')
     }

 
   }

  return (
    <div>
      {/* { header } */}
      <FormHeader  title={`${isupdate?'Updated Unit':'New Unit'}`}   link={'/storing/units'} />
      {/* { Form } */}
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
        <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
         <TextInput label="Store Name" name="StoreName" defaultValue={initialData?.StoreName}  type="text" width='full'   register={register}  errors={errors}/>

         <TextInput label="Store Location" name="StoreLocation" defaultValue={initialData?.StoreLocation}  type="text" width='full'   register={register}  errors={errors}/>
         <TextInput label="Store Capacity" name="Capacity" defaultValue={initialData?.StoreName}  type="number" width='full'   register={register}  errors={errors}/>

         <TextAreaInputs  label="Store Description " name="StoreDescription"    type="text" width='full'  defaultValue={initialData?.StoreDescription
 || ''}   register={register}  errors={errors}/>

        
        



        </div>
       <SubumitButton  title={`${isupdate?'Updated Unit':'New Unit'}`}   isLoading={loading}/>

      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { makePOSTApiRequest, makePUTApiRequest })(NewStore);