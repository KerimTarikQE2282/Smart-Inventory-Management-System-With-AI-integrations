"use client"
import React from 'react'
import NewBrand from '../../new/page'
import { useGetDataById } from '@/hooks/useGetDataById';
export default  function Update({params:id}) {


            
    const {isLoading,data,isError,error,isFetching}=useGetDataById('brands',id);
   
return <NewBrand initialData={data?.data} isupdate={true}/>
    
 
    
  
}
