import { AlignJustify, HelpCircle, LayoutGrid, List, ListChecksIcon, ListIcon, MoreHorizontal, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function FixedHeader(props) {
  return (
    <div className='flex justify-between items-center bg-white py-5 px-4'>
      <button className='text-2xl' style={{ marginLeft: '5vw' }}>
        {`All ${props.title}  Data`}
      </button>
      <div className='flex items-center space-x-10'>
      {/*new*/}
      <Link href={"/dashboard/inventory/items/new"} className="p-1 bg-blue-600 rounded-md flex items-center space-x-2 px-3 ">
          <Plus className="text-white w-4 h-4" />
          <span className='text-white'>New</span>
        </Link>
      {/*Layout button*/}
      <div className='flex  rounded-md overflow-hidden '>
      <button className='bg-gray-300 p-2 border-r border-gray-400 '><AlignJustify className='w-5 h-5 text-slate-600'/></button>
      <button className='bg-gray-200 p-2'><LayoutGrid className='w-5 h-5 text-slate-600'/></button>
      </div>
      {/*More*/}
     
      <button className='bg-gray-100 p-2 rounded-md'><MoreHorizontal/></button>
      
      
      {/*Help*/}
    <button  className='bg-orange-500 p-2 rounded-md'><HelpCircle className='w-6 h-6 text-white'/></button>

      </div>
    </div>
  )
}

export default FixedHeader
