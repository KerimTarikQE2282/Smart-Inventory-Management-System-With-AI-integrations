"use client"
import React from 'react'
import { getDataById } from '@/actions/storeActions/StoreGeneralCrudRequests/getDataByid'
import NewItem from '../../new/page'
import NewUnit from '../../new/page'
import { useGetDataById } from '@/hooks/useGetDataById';
export default  function Update({params:id}) {
  
  const { isLoading, data, isError, error, isFetching } = useGetDataById('unit', id);
  console.log("🚀 ==> file: page.jsx:15 ==> NewUnit ==> data:", data);
    
  return (

   
      <NewUnit initialData={data?.data?.unit} id={id}  isupdate={true}/>
 
    
  )
}
