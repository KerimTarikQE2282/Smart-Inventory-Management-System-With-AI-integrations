import React from 'react'
import Header from '@/Components/dashboard/Header'
import Sidebar from '@/Components/dashboard/SideBarComponents/Sidebar'
export default function Layout({children}) {
  return (
    <div className='flex'>
     <Sidebar className='bg-slate-900'/>
     
      <main className=' ml-0 sm:block w-full bg-slate-100 min-h-screen'> 
        <Header/>
        {children}</main>
     
    </div>
  )
}
