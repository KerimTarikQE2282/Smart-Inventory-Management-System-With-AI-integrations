"use client"
import DataTable from './Components/Table'
import TabelNavBar from '@/Components/TabelNavBar'
import React from 'react'

export default function WareHouse() {
  const columns=['WareHouseName','WareHouseLocation','WareHouseType']




  return (
    <div>
    <TabelNavBar link='/storing/WareHouse/new' title='WareHouse'/>
       <div className='my-4 p-8'>
    <DataTable name={'WareHouse'} resourceTitle={'WareHouse'}  columns={columns}/>

    </div>
    </div>
  )
}
