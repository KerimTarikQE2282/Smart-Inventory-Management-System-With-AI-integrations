"use client"
import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

function HomeNav() {

    const User =  JSON?.parse(global?.window?.localStorage.getItem('INVENTORY_USER') || '{}');
    console.log("🚀 ==> file: HomeNav.jsx:10 ==> HomeNav ==> User:", User);

    const pathname = usePathname()
console.log(pathname)
    const navLinks=[
        {
            title:"DashBoard",
            href:'/dashboard/home/overview',
    },
    {
        title:"Getting Started",
        href:'/dashboard/home/getting-started',
},{
    title:"Recent Updates",
    href:'/dashboard/home/updates',
},
{
    title:"Announcements",
    href:'/dashboard/home/announcements',
}
]
const DisplayNavLinks=navLinks.map((link)=>{
    return(
        <Link href={link.href} key={link.title} className={`py-3 border-b-4 ${pathname === link.href ? 'border-blue-600' : ''}`}>{link.title}</Link>
    )
})


  return (
    <div className='h-40   p-5   border-b border-slate-300'>
    <div className='flex space-x-3 '>
        <div className='flex w-12 h-12 rounded-lg bg-white items-center justify-center'>
        <Home/>
        </div>
        <div className='flex-col'>
            <p className='font-semibold text-slate-900 '>Welcome, {User?.username}</p>
            <span className='text-sm'>{User.fullName}</span>
       
        </div>
        
    </div>
    <nav className='sticky  mt-[4.3vh] flex gap-10'>
    {DisplayNavLinks}
    </nav>
    </div>
  )
}

export default HomeNav
