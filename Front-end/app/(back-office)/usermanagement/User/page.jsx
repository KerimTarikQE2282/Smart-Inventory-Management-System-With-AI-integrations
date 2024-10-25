"use client"
import DataTable from '../Components/DataTable'
import TabelNavBar from '@/Components/TabelNavBar'
import React from 'react'


export default  function Brands() {
  const columns=['username','status','role','email'];
 

    return (
      <div>
          <TabelNavBar link='/usermanagement/user/new' title='user'/>
         <div className='my-4 p-8'>
          
      <DataTable name='user' columns={columns} resourceTitle='User'/>
  
      </div>
      </div>
    )
  
  
}
