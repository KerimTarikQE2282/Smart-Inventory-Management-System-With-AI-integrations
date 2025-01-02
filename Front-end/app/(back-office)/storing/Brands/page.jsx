"use client"
import DataTable from '@/Components/dashboard/DataTable'
import TabelNavBar from '@/Components/TabelNavBar'
import React from 'react'


export default  function Brands() {
  const columns=['BrandName','createdAt','updatedAt'];
 

    return (
      <div>
          <TabelNavBar link='/storing/Brands/new' title='Brands'/>
         <div className='my-4 p-8'>
          
      <DataTable name='brands' columns={columns} resourceTitle='Brands'/>
  
      </div>
      </div>
    )
  
  
}
