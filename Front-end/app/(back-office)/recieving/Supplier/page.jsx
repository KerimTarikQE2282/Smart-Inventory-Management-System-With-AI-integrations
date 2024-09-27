import DataTable from '@/Components/dashboard/DataTable'
import TabelNavBar from '@/Components/TabelNavBar'
import { getData } from '@/actions/storeActions/StoreGeneralCrudRequests/getData'
import React from 'react'

export default async function Suppliers() {
const columns=['name','phone','email','PaymentTerms']
  const Suppliers=await getData('Supplier')
  console.log(Suppliers)
 
  return (
    <div>
    {/* { header } */}
  <TabelNavBar link='/recieving/Supplier/new/' title='Suppliers'/>
    {/* { Table  } */}
    <div className='my-4 p-8'>
    <DataTable Data={ Suppliers} resourceTitle={'Supplier'} columns={columns}/>

    </div>
     
  </div>
  )
}
