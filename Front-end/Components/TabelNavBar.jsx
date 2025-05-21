'use client'
import { Plus, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function TabelNavBar({ link = '', title = '' }) {
  const router = useRouter()

  return (
    <div className='flex justify-between items-center bg-white py-5 px-6 lg:px-16'>
      <button className='lg:text-2xl'>
        All {title}
      </button>
      <div className='flex items-center space-x-10'>
        {/* new */}
        <Link href={link} className="p-1 bg-blue-600 rounded-md flex items-center space-x-2 px-3">
          <Plus className="text-white w-4 h-4" />
          <span className='text-white'>New</span>
        </Link>
        {/* Layout button */}
        <div onClick={() => { router.back() }} className="cursor-pointer">
          <X className='text-slate-700' />
        </div>
      </div>
    </div>
  )
}
