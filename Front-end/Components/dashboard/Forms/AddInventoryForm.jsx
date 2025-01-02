'use client'
import { useForm } from "react-hook-form";
import React from 'react';
import TextInput from "@/Components/FormInputs/TextInput";
import SubumitButton from "@/Components/FormInputs/SubumitButton";
import TextAreaInputs from "@/Components/FormInputs/TextAreaInputs";
import SelectComponent from "@/Components/FormInputs/SelectComponent";
import toast from "react-hot-toast";
import { makePOSTApiRequest } from "@/actions/StoreGeneralCrudRequests";
import { connect } from "react-redux";



function AddinventoryForm({items,WareHouses,makePOSTApiRequest}) {
  const [selection, setSelection] = React.useState('single');
  

  
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading,setLoading]=React.useState(false)
    async function onSubmit(data){
      console.log('hqlllllllllllllllllllllllllllllllll')
      console.log("🚀 ==> file: AddInventoryForm.jsx:18 ==> onSubmit ==> data:", data);

      
          makePOSTApiRequest('WareHouseAdjustments/',setLoading,data,'Inventory')
  
    }
    
    console.log('from add inevntory form',items)
    return (
  
       
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
          <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
          <TextInput label="Enter Reference Number" name="ReferenceNumber"  type="text" width=''   register={register}  errors={errors}/>
         
          <div>
                <label   className="mr-10">
                    <input
                        type="radio"
                        value="single"
                        checked={selection === 'single'}
                        onChange={(e) => setSelection(e.target.value)}
                      className="mr-5"
                    />
                    Add Single Item
                </label>
                <label>
                    <input
                        type="radio"
                        value="multiple"
                        checked={selection === 'multiple'}
                        onChange={(e) => setSelection(e.target.value)}
                        className="mr-5"
                    />
                    Add Multiple Items
                </label>
            </div>
            <br/>
            {selection === 'single' && (
              
                <div>
                
                  <TextInput  label="Add carton number" name="Carton_number"  type="number"  width=''   register={register}  errors={errors}/>
                </div>
            )}

            {selection === 'multiple' && (
              <>
               
                 <div className="w-[18vw]">                
                   <TextInput  label="Add from carton number" name="from_Carton_Number"  type="number"    register={register}  errors={errors}/>
                 </div>
                 <div  className="w-[18vw]">                
                 <TextInput  label="Add to carton number"   name="to_Carton_Number"    type="number"    register={register}  errors={errors}/>
                 </div>

               
             
               </>
                    
            )}
  
           {/* <TextInput label="Date of item added" name="AddingDate"  type="date" width='full'   register={register}  errors={errors}/> */}
           
            <SelectComponent
            name="item" 
            label="Select the item to add  "
            register={register}
            error={errors}
            
            options={items}
            />
            <SelectComponent
            name="To_WareHouse" 
            label="warehouse to Add to  "
            register={register}
            error={errors}
            options={WareHouses}
            />
          
          <TextAreaInputs  label="Notes for Adding inventory to another warehouse" name="AddingInventoryNotes"  type="text" width='full'   register={register}  errors={errors}/>
     
         
  
  
          
          
          
  
  
  
          </div>
         <SubumitButton title="New Stock" isLoading={loading}/>
  
        </form>
    )
}

const mapStateToProps=(state)=>({

})


export default connect(mapStateToProps, { makePOSTApiRequest })(AddinventoryForm)