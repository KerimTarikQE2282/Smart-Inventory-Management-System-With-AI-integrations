"use client"
import DataTable from './Components/table'
import TabelNavBar from '@/Components/TabelNavBar'
import React from 'react'


export default  function Brands() {
  const columns=['PurchaseOrderId','createdAt','updatedAt'];
 

    return (
      <div>
          <TabelNavBar link='/recieving/purchases/new' title='Purchase Order'/>
         <div className='my-4 p-8'>
          
      <DataTable name='PO' columns={columns} resourceTitle='PO'/>
  
      </div>
      </div>
    )
  
  
}
