"use client"
import { Home } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

function HomeNav() {
    const [User,setUser]=useState();
    useEffect(()=>{
        if(typeof  window!="undefined"){
            const user =  JSON?.parse(global?.window?.localStorage.getItem('INVENTORY_USER') || '{}');
            setUser(user)
        }
    },[])
    console.log("🚀 ==> file: HomeNav.jsx:10 ==> HomeNav ==> User:", User);

    const pathname = usePathname()
console.log(pathname)
    const navLinks=[
        {
            title:"DashBoard",
            href:'/home',
    }
    ,
    {
        title:"Sales Activity",
        href:'/home/SalesActivity',
},
{
    title:"Sales Overview",
    href:'/home/SalesOverview',
}
,
{
    title:"Warehouse Inventory Summary",
    href:'/home/WareHouseInventorySummary',
}
,
{
    title:"Store Inventory Summary",
    href:'/home/StoreInventorySummary',
}
]
const DisplayNavLinks=navLinks.map((link)=>{
    return(
        <a href={link.href} key={link.title} className={`py-3 border-b-4 ${pathname === link.href ? 'border-blue-600' : ''}`}>{link.title}</a>
    )
})


  return (
    <div className='h-40   p-5   border-b border-slate-300'>
    <div className='flex space-x-3 '>
        <div className='flex w-12 h-12 rounded-lg bg-white items-center justify-center'>
        
        </div>
        <div className='flex flex-col'>
            <p className='font-semibold text-slate-900 '>Welcome, {User?.username}</p>
            <span className='text-sm'>{User?.fullName}</span>
       
        </div>
        
    </div>
    <nav className='sticky  mt-[4.3vh] ml-5 flex gap-10'>
    {DisplayNavLinks}
    </nav>
    </div>
  )
}

export default HomeNav
