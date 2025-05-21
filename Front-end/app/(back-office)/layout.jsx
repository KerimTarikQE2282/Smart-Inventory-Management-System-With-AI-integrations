'use client'
import React from 'react'
import Header from '@/Components/dashboard/Header'
import Sidebar from '@/Components/dashboard/SideBarComponents/Sidebar'
import { Menu } from 'lucide-react'
import { X } from 'lucide-react';


export default function Layout({ children }) {
  const [visibleSidebar, setVisibleSidebar] = React.useState(false)

  const ChangeSidebarVisiblility = () => {
    setVisibleSidebar(prev => !prev)
  }

  return (
    <div className='flex' suppressHydrationWarning={true}>
      {/* Desktop Sidebar */}
      <div className='hidden lg:block mr-[9vw]'>
        <Sidebar className='bg-slate-900' />
      </div>

      {/* Mobile Sidebar */}
      {visibleSidebar && (
        <div className="lg:hidden fixed top-0 left-0 w-64 h-full bg-slate-900 z-40">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <main className='w-full bg-slate-100 min-h-screen relative'>
        {/* Mobile Menu Button */}
        <div 
          className="lg:hidden absolute top-4 left-4 z-50 cursor-pointer "
          onClick={ChangeSidebarVisiblility}
        >
          {   visibleSidebar ?  
          <X className='text-white'/>   
           
            :
             <Menu   />

          }
        </div>

        <Header />
        {children}
      </main>
    </div>
  )
}
