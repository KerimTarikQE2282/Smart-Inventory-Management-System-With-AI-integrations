
"use client"
import React from 'react'
import NewSupplier from '../../new/page'
import { useGetDataById } from '@/hooks/useGetDataById';
export default  function Update({params:id}) {


            
    const {isLoading,data,isError,error,isFetching}=useGetDataById('supplier',id);
    console.log("🚀 ==> file: page.jsx:11 ==> Update ==> data:", data);

   
return       <NewSupplier initialData={data?.data?.SupplierExists} isupdate={true}/>

    
 
    
  
}
