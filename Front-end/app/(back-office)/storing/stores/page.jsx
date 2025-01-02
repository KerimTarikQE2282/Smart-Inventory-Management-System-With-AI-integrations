import DataTable from './Components/Table'
import TabelNavBar from '@/Components/TabelNavBar'
import React from 'react'

export default async function Stores() {
  const columns=['StoreName','StoreLocation',"StoreDescription"]
  
  return (
    <div>
              <TabelNavBar link='/storing/stores/new' title='Stores'/>
       <div className='my-4 p-8'>
    <DataTable name='stores' resourceTitle={'stores'} columns={columns}/>

    </div>
    </div>
  )
}
