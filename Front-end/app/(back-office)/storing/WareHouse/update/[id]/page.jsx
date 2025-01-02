"use client"
import React from 'react'
import { getDataById } from '@/actions/storeActions/StoreGeneralCrudRequests/getDataByid'
import NewItem from '../../new/page'
import { useGetDataById } from '@/hooks/useGetDataById';
export default  function Update({params:id}) {
  
    


    const {isLoading,data,isError,error,isFetching}=useGetDataById('WareHouse',id);
    console.log("🚀 ==> file: page.jsx:12 ==> Update ==> error:", error);

    const mydata=data?.data
    console.log("🚀 ==> file: page.jsx:13 ==> Update ==> mydata:", mydata);

    
  return (


      <NewItem initialData={mydata} isupdate={true}/>
 
    
  )
}
