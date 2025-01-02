"use client"
import DataTable from '@/Components/dashboard/DataTable'
import TabelNavBar from '@/Components/TabelNavBar'
import React from 'react'


export default  function Brands() {
  const columns=['orderDate','orderTotal','paymentMethod','customer'];
 

    return (
      <div>
          <TabelNavBar link='/selling/credits/new' title='Credits'/>
         <div className='my-4 p-8'>
          
      <DataTable name='GeneralSales' columns={columns} resourceTitle='AllGeneralSales'/>
  
      </div>
      </div>
    )
  
  
}
