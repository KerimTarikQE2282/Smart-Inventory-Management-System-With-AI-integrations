import { ArrowDownUp, BadgeDollarSign, BaggageClaim, Bookmark, CheckCheck, ChevronDown, ChevronRight, CircleOff, Container, Factory, Layers3, NotebookTabsIcon, Package, Plus, PlusCircle, ReceiptIcon, ReceiptRussianRuble, ShoppingCart, User, User2, Wallpaper } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/Components/ui/collapsible"
function SalesSideBarComponent() {
    const [inventoryOpen,setInventoryopen]=React.useState(false)

    const inventoryLinks=[
      {
        name:"All",
        link:"/usermanagement",
        icon:<Wallpaper className='w-4 h-4'/>
      },
      {
        name:"Add User",
        link:"/usermanagement/adduser",
        icon:<Plus className='w-4 h-4'/>
      },
   
      
    ]
    const InventoryList=inventoryLinks.map((link)=>{
        return(
            <Link href={link.link} key={link.name} className='flex items-center justify-between hover:bg-slate-900 transition-all duration-500 ease-in-out pl-8 pr-2 py-2.5 ml-5 rounded-lg text-sm ' > 
              
              <span>{link.name}</span>
               {link.icon}
              
              </Link>
        );
      })
  return (
    <div>
      <Collapsible>
      <CollapsibleTrigger  className='flex items-center space-x-2 p-2 ' onClick={()=>setInventoryopen(!inventoryOpen)}>
        <User2 className='w-4 h-4'/>
        
        <span className="whitespace-nowrap"> User's </span>
        { inventoryOpen ? <ChevronDown className='relative  left-[0.6vw] w-4 h-4'/>: < ChevronRight className='relative left-[0.6vw]  w-4 h-4'/>}
         </CollapsibleTrigger>
        <CollapsibleContent >
        
        
        {InventoryList}
        {/* <Link>Item Groups</Link>
         <Link>Inventory Adjustments</Link> */}
       </CollapsibleContent>
        </Collapsible>





    </div>
  )
}

export default SalesSideBarComponent
