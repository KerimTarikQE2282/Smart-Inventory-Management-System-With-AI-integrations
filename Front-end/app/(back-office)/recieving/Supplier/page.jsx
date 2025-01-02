"use client"
import DataTable from '../Componenets/DataTable'
import TabelNavBar from '@/Components/TabelNavBar'
import React from 'react'


export default  function Brands() {
  const columns=['name','phone','email','PaymentTerms']
 

    return (
      <div>
          <TabelNavBar link='/recieving/Supplier/new' title='Suppliers'/>
         <div className='my-4 p-8'>
          
      <DataTable name='supplier' columns={columns} resourceTitle='Supplier'/>
  
      </div>
      </div>
    )
  
  
}
