"use client"
import FixedHeader from '@/Components/dashboard/FixedHeader'

import {  User,ArrowDownUp, BadgeDollarSign, Bookmark, CheckCheck,  CircleOff, ReceiptIcon, ReceiptRussianRuble,   } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Inventory() {
 
  const ItemComponents=[
    {
      title: "All Customers",
      icon: <User strokeWidth=".5px" className='w-36 h-36' color='#f25944' />,
      phrase: "Create instances of Customers to track .",
      Buttontext: "View All Customers",
      link: "/selling/customer",
      linkTitle: 'Item Groups',  // Adjusted to match the title
      enabled: true
  },
  {
    title: "Sales Order",
    icon: <ArrowDownUp strokeWidth=".5px" className='w-36 h-36' color='#eab308' />,
    phrase: "Create instances of Customers to track .",
    Buttontext: "New Item Group",
    link: "/dashboard/inventory/itemGroups",
    linkTitle: 'View All Sales Orders',  // Adjusted to match the title
    enabled: true
},



{
    title: "Credits",
    icon: <Bookmark strokeWidth=".5px" className='w-36 h-36' color='#f25944' />,
    phrase: "Create instances of Customers to track .",
    Buttontext: "New Item Group",
    link: "/dashboard/inventory/itemGroups",
    linkTitle: 'View All Credits',  // Adjusted to match the title
    enabled: true
}

  
  ]

  const AllItemComponents=ItemComponents.map((item)=>{
    return(
      <div className='shadow-md bg-white flex flex-col items-center justify-center gap-4 py-5 px-5 rounded-sm' key={item.title}>
      <h2 className='text-lg font-bold'>{item.title}</h2>

      <div >
        {item.icon}
      </div>
      <p className='line-clamp-1'>
        {item.phrase}

      </p>
      {item.enabled?
 (<Link href={item.link} className="py-2 bg-blue-600 rounded-md inline-flex items-center space-x-2 px-3 ">
       
        <span className='text-white'>{item.Buttontext}</span>
       
      </Link>):
       (<button className="py-2 bg-blue-600 rounded-md inline-flex items-center space-x-2 px-3 text-white ">
        Enable
        
        </button>)
         }
      </div>
    )
  })

  return (
    <div>
      <FixedHeader title={"Selling"}/>
      <div className='grid grid-cols-1 lg:grid-cols-3 py-16 px-28 gap-8'>
     
      
      {AllItemComponents}
      {/* second box */}

      
    </div>
    </div>
  )
}

export default Inventory
