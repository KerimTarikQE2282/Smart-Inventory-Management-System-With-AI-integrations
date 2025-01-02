"use client"
import React from 'react'
import { getDataById } from '@/actions/storeActions/StoreGeneralCrudRequests/getDataByid'
import NewStore from '../../new/page'
import { useGetDataById } from '@/hooks/useGetDataById';
export default  function Update({params:id}) {
  
  const { isLoading, data, isError, error, isFetching } = useGetDataById('stores', id);
  console.log("🚀 ==> file: page.jsx:15 ==> NewStore ==> data:", data?.data);
    
  return (

   
      <NewStore initialData={data?.data} id={id}  isupdate={true}/>
 
    
  )
}
