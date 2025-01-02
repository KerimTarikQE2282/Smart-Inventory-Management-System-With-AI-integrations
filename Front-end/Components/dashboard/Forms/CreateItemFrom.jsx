"use client"
import { useForm } from "react-hook-form";
import React from 'react';
import TextInput from "@/Components/FormInputs/TextInput";
import SubumitButton from "@/Components/FormInputs/SubumitButton";
import TextAreaInputs from "@/Components/FormInputs/TextAreaInputs";
import SelectComponent from "@/Components/FormInputs/SelectComponent";
import ImageInput from "@/Components/FormInputs/ImageInput";
import { makePOSTApiRequest, makePUTApiRequest } from "@/actions/StoreGeneralCrudRequests";
import { useRouter } from 'next/navigation';
import { connect } from "react-redux";
  




function CreateItemFrom({categories,units,brands,suppliers,initialData={},isupdate=false,makePOSTApiRequest,makePUTApiRequest}) {




  const [imageUrl,setImageUrl]=React.useState(isupdate==true ? initialData?.imageUrl :'')
  const { register, handleSubmit, watch, formState: { errors,isDirty } } = useForm();
  const [loading,setLoading]=React.useState(false)
  const router = useRouter();

  async function onSubmit(data){
    if(isupdate){
      // Update Request 
      const myCompleteItemData={...data,imagesUrl:imageUrl}

      try {
       await makePUTApiRequest(`items/${initialData._id}`,setLoading,myCompleteItemData,'Items')
         done=true
         if(done==true){
          router.replace('/dashboard/inventory/Items')
         }
      } catch (error) {
        console.log(error)
      }
      router.replace('/storing/items')

    }
    else{
      console.log('item adddd')
      console.log("completed item data",data,imageUrl)
      const myCompleteItemData={...data,imagesUrl:imageUrl}
      //data.imageURL=imageUrl
      await makePOSTApiRequest('items',setLoading,myCompleteItemData,'Items')
      setImageUrl('');
      router.replace('/storing/items')
    }


  
  }

  return (
    
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
        <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
         <TextInput label="Item Name" name="title" type="text" width='fuller' defaultValue={initialData.title}    register={register}  errors={errors}/>
         <TextInput label="Item SKU" name="SKU"  type="text" width='fuller' defaultValue={initialData.SKU}   register={register}  errors={errors} className='w-full'/>

         <SelectComponent label="Category" name="category"  type="text" width='full' defaultValue={initialData.categoryId} options={categories}   register={register}  errors={errors}  className='w-full'/>

        
        
     
     
      <TextInput label="Item BarCode" name="barcode"  type="text" width='full' defaultValue={initialData.title}   register={register}  errors={errors}  />

      

         {/* ************************************Fix for Measurement ******************************************************************* */}
         

        
        
      {/* ************************************untill here******************************************************************* */}


      <TextInput label="Item Cost Price" name="costPrice"  type="number" width='full' defaultValue={initialData.costPrice}  register={register}  errors={errors}  />
      <TextInput label="Item Selling Price" name="sellingPrice"  type="number" width='full' defaultValue={initialData.sellingPrice}  register={register}  errors={errors}  />
      <SelectComponent label="Brand" name="brand"  type="text" width='full'  options={brands}  defaultValue={initialData.title}   register={register}  errors={errors}  className='w-full'/>
      <TextInput label="Item Reorder point" name="reorderPoint"  type="number" width='full' defaultValue={100}   register={register}  errors={errors}  />
        

  {/* ************************************Fix for WareHouse ******************************************************************* */}
         
<SelectComponent label="Supplier" name="supplier"  type="text" width='full'  options={suppliers}  defaultValue={initialData.title}   register={register}  errors={errors}  className='w-full'/>

        
      {/* ************************************untill here******************************************************************* */}
      <TextInput label="Item Weight" name="weight"  type="number" width='full'   register={register} defaultValue={100} errors={errors}  />
      <TextInput label="Item Dimensions in cm (20 X 30 X 40)" name="dimensions"  type="text" width='full'  defaultValue={initialData.title} register={register}  errors={errors}  />
      <TextInput label="Tax Rates in %" name="taxRate"  type="number" width='full'   register={register} defaultValue={15} errors={errors}  />
      <TextAreaInputs  label="Item Description " name="description"  type="text" width='full'   register={register} defaultValue={initialData.title} errors={errors}/>

      <TextAreaInputs  label="Notes " name="ItemNotes"  type="text" width='full'   register={register} defaultValue={initialData.title} errors={errors}/>
        <ImageInput label="Item Image " imageURL={imageUrl} setImageUrl={setImageUrl} />
        </div>
       <SubumitButton title={`${isupdate?'Updated Item':'New item'}`}  isLoading={loading}/>

      </form>
    
  )
}

const mapStateToProps=(state)=>({
  })

  export default connect(mapStateToProps, { makePOSTApiRequest, makePUTApiRequest })(CreateItemFrom)