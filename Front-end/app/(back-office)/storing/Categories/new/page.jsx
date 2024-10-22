"use client"
import { useForm } from "react-hook-form";
import React from 'react';
import FormHeader from '../../../../../Components/dashboard/FormHeaders';
import TextInput from "@/Components/FormInputs/TextInput";
import SubumitButton from "@/Components/FormInputs/SubumitButton";
import TextAreaInputs from "@/Components/FormInputs/TextAreaInputs";
import toast from "react-hot-toast";
import {makePOSTApiRequest,makePUTApiRequest} from '@/actions/StoreGeneralCrudRequests';

import { useRouter } from "next/navigation";
import { connect } from "react-redux";

function NewCategory(props) {
  const {initialData='',isupdate=false, makePOSTApiRequest, makePUTApiRequest}=props
  // console.log("🚀 ==> file: page.jsx:15 ==> NewCategory ==> initialData:", initialData);

  const router=useRouter()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading,setLoading]=React.useState(false)
  
  async function onSubmit(data){
   console.log("🚀 ==> file: page.jsx:22 ==> onSubmit ==> data:", data);

   const mydata={
    
    title: data.CategoryName,
  description:data.CategoryDescription

   }
    if(isupdate){
      // Update Request 
      try {
       await makePUTApiRequest(`category/${initialData._id}`,setLoading,mydata,'Category')
         done=true
         if(done==true){
          router.replace('/dashboard/inventory/Category')
       }
      } catch (error) {
        console.log(error)
      }
     
    }
    else{
      makePOSTApiRequest('category',setLoading,mydata,'Categories')
    }

  }

  
  return (
    <div>
      {/* { header } */}
      <FormHeader  title={`${isupdate?'Update Category':'New Category'}`} link={'/dashboard/inventory/Categories'} />
      {/* { Form } */}
      <form onSubmit={handleSubmit(onSubmit)}  className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
        <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
         <TextInput label="Category Name" name="CategoryName"  defaultValue={initialData.title} type="text" width=''   register={register}  errors={errors}/>
         {/*Text Ares*/}
        <TextAreaInputs label="Category " defaultValue={initialData.description} name="CategoryDescription"  type="text" width='full'   register={register}  errors={errors}/>
        
        
        



        </div>
       <SubumitButton  title={`${isupdate?'Updated Category':'New Category'}`} isLoading={loading}/>

      </form>
    </div>
  )

}



const mapStateToProps = (state) => ({

})



export default connect(mapStateToProps, { makePOSTApiRequest, makePUTApiRequest })(NewCategory)