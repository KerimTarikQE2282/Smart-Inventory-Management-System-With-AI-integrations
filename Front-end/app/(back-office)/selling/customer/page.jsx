"use client"
import DataTable from '../Componenets/DataTable'
import TabelNavBar from '@/Components/TabelNavBar'
import React from 'react'


export default  function Brands() {
  const columns=['customerName','phone1','address1','registeredBy'];
 

    return (
      <div>
          <TabelNavBar link='/selling/customer/new' title='Customer'/>
         <div className='my-4 p-8'>
          
      <DataTable name='Customer' columns={columns} resourceTitle='customer'/>
  
      </div>
      </div>
    )
  
  
}
