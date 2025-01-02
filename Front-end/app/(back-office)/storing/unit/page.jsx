import DataTable from '@/Components/dashboard/DataTable'
import TabelNavBar from '@/Components/TabelNavBar'
import React from 'react'

export default async function Units() {
  const columns=['UnitName','UnitAbreviation']
  
  return (
    <div>
              <TabelNavBar link='/storing/unit/new' title='Unit'/>
       <div className='my-4 p-8'>
    <DataTable name='unit' resourceTitle={'unit'} columns={columns}/>

    </div>
    </div>
  )
}
