"use client"
import React from 'react'
import NewPO from '../../new/page'
import { useGetDataById } from '@/hooks/useGetDataById';
export default  function Update({params:id}) {


            
    const {isLoading,data,isError,error,isFetching}=useGetDataById('PO',id);
   
return <NewPO initialData={data?.data} isupdate={true}/>
    
 
    
  
}
