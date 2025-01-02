import React from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
export default function Headers({title,link}) {
  return (
    <div className='flex items-center .justify-between bg-white py-5 px-16 flex-row justify-between'>
        <h2 className='text-2xl font-medium text-slate-800'>{title}</h2>
        <Link href='link'>
        <X className='text-slate-700'/>
        </Link>
      </div>
  )
}
