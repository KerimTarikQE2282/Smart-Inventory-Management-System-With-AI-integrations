
import { Plus, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function TabelNavBar({link='',title=''}) {
  return (
    <div className='flex justify-between items-center bg-white py-5 px-16'>
    <button className='text-2xl'>
      All {title}
    </button>
    <div className='flex items-center space-x-10'>
    {/*new*/}
    <Link href={link} className="p-1 bg-blue-600 rounded-md flex items-center space-x-2 px-3 ">
        <Plus className="text-white w-4 h-4" />
        <span className='text-white'>New</span>
      </Link>
    {/*Layout button*/}
    <a href='/dashboard/inventory' >
        <X className='text-slate-700'/>
        </a>
    </div>
  </div>
  )
}
