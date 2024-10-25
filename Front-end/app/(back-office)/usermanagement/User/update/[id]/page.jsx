"use client"
import React from 'react'
import NewUser from '../../new/page'
import { useGetDataById } from '@/hooks/useGetDataById';
export default  function Update({params:id}) {


            
    const {isLoading,data,isError,error,isFetching}=useGetDataById('user',id);
   
return <NewUser initialData={data?.data} isupdate={true}/>
    
 
    
  
}
