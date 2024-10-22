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

function NewUnit(props) {
  const {initialData,isupdate,makePOSTApiRequest,makePUTApiRequest}=props
   // Fetch data by ID




   const { register, handleSubmit, watch, formState: { errors } } = useForm();
   const [loading,setLoading]=React.useState(false)
 var done=false
   async function onSubmit(data){
 
     if(isupdate){
       setLoading(true)
       try {
         
        const done=await makePUTApiRequest(`unit/${initialData._id}`,setLoading,data,'unit')
          
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
 
       await makePOSTApiRequest('unit',setLoading,data,'WareHouse')
     }
 
   }

  return (
    <div>
      {/* { header } */}
      <FormHeader  title={`${isupdate?'Updated Unit':'New Unit'}`}   link={'/storing/units'} />
      {/* { Form } */}
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
        <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
         <TextInput label="Unit Name" name="UnitName" defaultValue={initialData?.UnitName}  type="text" width='full'   register={register}  errors={errors}/>
        
         <TextInput label="Unit Abreviation" name="UnitAbreviation" defaultValue={initialData?.UnitAbreviation}  type="text" width='full'   register={register}  errors={errors}/>

        
        
        



        </div>
       <SubumitButton  title={`${isupdate?'Updated Unit':'New Unit'}`}   isLoading={loading}/>

      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { makePOSTApiRequest, makePUTApiRequest })(NewUnit);