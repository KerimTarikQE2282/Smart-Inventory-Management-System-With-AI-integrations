"use client"
import DataTable from '@/Components/dashboard/DataTable'
import TabelNavBar from '@/Components/TabelNavBar'
import React from 'react'
import { useGetData } from '@/hooks/useGetData'

export default  function Categories() {
const columns=['title','description']


 
 
  return (
    <div>
    {/* { header } */}
  <TabelNavBar link='/storing/category/new/' title='categoty'/>
    {/* { Table  } */}
    <div className='my-4 p-8'>
    <DataTable name='category' columns={columns} resourceTitle={'category'}/>

    </div>
     
  </div>
  )
}
