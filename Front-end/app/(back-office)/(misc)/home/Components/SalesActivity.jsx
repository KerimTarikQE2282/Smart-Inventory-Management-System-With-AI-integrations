import React from 'react'
import { Check, CheckCircle, CheckCircle2 } from 'lucide-react'

function SalesActivity() {
    const SalesActivities=[
        {
            Quantity:"10",
            Measure:"Qty",
            Action:"To be packed",
            icon:"CheckCircle2",
            href:"#",
            color:"text-blue-500"
        },
        {
            Quantity:"8",
            Measure:"pkgs",
            Action:"To be Shipped",
            icon:"CheckCircle2",
               href:"#",
            color:"text-red-500"
        },
        {
            Quantity:"5",
            Measure:"pkgs",
            Action:"To be Delivered",
            icon:"CheckCircle2",
               href:"#",
            color:"text-green-500"
        },
        {
            Quantity:"12",
            Measure:"Qty",
            Action:"To be Invoiced",
            icon:"CheckCircle2",
               href:"#",
            color:"text-yellow-500"
        }
    
    ]
    const AllSalesActivities=SalesActivities.map((sale)=>{
       return( <div className='shadow w-[12vw] h-[20vh]  rounded-lg bg-white border border-slate-200 hover:border-blue-500 pt-10 p-2 cursor-pointer flex items-center flex-col gap-3 transition duration-500 ease-in-out' key={sale.Quantity}>
          <h4 className={` text-4xl ${sale.color}`}> {sale.Quantity}</h4>
            <small className='text-slate-500'>{sale.Measure}</small>
            <div className='flex items-center space-x-2 text-slate-500'>
            <CheckCircle2 className='w-5 h-5' /> <span className='uppercase'>{sale.Action}</span>
            </div>
          </div>)
    })
  return (
    <div>
       <div className='flex'>
      {/* sales activity */}
      <div className='col-span-8 border-r border-slate-300 pr-[5vw]'>
        <h2 className='mb-6 text-xl'>Sales Activity</h2>
        <div className='flex flex-row gap-5'>
          {/* Render all sales activities here */}
          {AllSalesActivities}
        </div>
      </div>
      </div>
    </div>
  )
}

export default SalesActivity
