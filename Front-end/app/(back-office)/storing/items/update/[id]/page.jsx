"use client"
import React from 'react'
import NewItem from '../../new/page'
import { useGetDataById } from '@/hooks/useGetDataById';
export default  function Update({params:id}) {
  
  const {isLoading,data,isError,error,isFetching}=useGetDataById('items',id);
  console.log("🚀 ==> file: page.jsx:8 ==> Update ==> data:", data);


    
  return (


      <NewItem initialData={data?.data} isupdate={true}/>
 
    
  )
}
