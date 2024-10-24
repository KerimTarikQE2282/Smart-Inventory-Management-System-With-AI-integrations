"use client"
import React from 'react'
import NewCategory from '../../new/page'
import { useGetDataById } from '@/hooks/useGetDataById';


export default  function Update({params:id}) {
  const {isLoading,data,isError,error,isFetching}=useGetDataById('category',id);
  console.log("🚀 ==> file: page.jsx:9 ==> Update ==> data:", data);
  return (
  <NewCategory initialData={data?.data} isupdate={true}/>
 )
}
