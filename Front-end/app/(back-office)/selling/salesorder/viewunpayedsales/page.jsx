"use client"
import UnPayedDataTable from '../Components/UnPayedDataTable'
import TabelNavBar from '@/Components/TabelNavBar'
import React from 'react'


export default  function Brands() {
  const columns=['orderNumber','orderDate','orderTotal','paymentMethod','customer'];
 

    return (
      <div>
          <TabelNavBar link='/selling/credits/new' title='Credits'/>
         <div className='my-4 p-8'>
          
      <UnPayedDataTable endpoint='GeneralSales/unpayed' name='GeneralSales' columns={columns} resourceTitle='AllGeneralSales'/>
  
      </div>
      </div>
    )
  
  
}
