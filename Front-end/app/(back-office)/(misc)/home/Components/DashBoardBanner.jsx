"use client"
import { CreditCard, X } from 'lucide-react'
import React from 'react'

function DashBoardBanner() {
    const [Displayed,setDisplayed]=React.useState(false)
    const handleClick=()=>{
    setDisplayed(!Displayed)
    }
  return (
    <div className= {`grid grid-cols-12 items-center py-6 px-16 bg-white gap-4 relative ${ Displayed ? 'hidden' : ''} `} >
      
        {
            /*icon*/
        }
        <div className='col-span-2'>
        <CreditCard className='w-16 h-16 text-slate-500'/>
        </div>

       
        {
            /*Text*/
        }
        <div className='col-span-5'>
            <h2 className='font-bold text-xl'>Start accepting online Payments  </h2>
            <p>Businesses are moving towards online payments as theyre easy ,secure and fast. Try them for your busines today</p>
        </div>
        {
            /*Button*/
        }
        <div className='col-span-4'>
        <button className='py-2.5 px-4 uppercase bg-blue-500 text-white rounded-xl ml-[8vw]'>enable</button>
        </div>
      
        {
            /*Close button*/
        }
        <button onClick={handleClick} className='relative bottom-8 left-10'>
            <X className='text-slate-600'/> 

        </button>
      
    </div>
  )
}

export default DashBoardBanner
