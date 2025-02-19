
import React from 'react'
import DataTable from '../Components/DataTable'
function page() {
  const columns=['orderNumber','customer','orderTotal','paymentMethod'];
 

  return (
    <div>
       <div className='my-4 p-8'>
        
    <DataTable name='GeneralSales/TodaySales' columns={columns} />

    </div>
    </div>
  )
}

export default page
