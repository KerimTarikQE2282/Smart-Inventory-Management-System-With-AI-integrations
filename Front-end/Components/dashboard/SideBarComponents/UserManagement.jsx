import { ArrowDownUp, BadgeDollarSign, BaggageClaim, Bookmark, CheckCheck, ChevronDown, ChevronRight, CircleOff, Container, Factory, Layers3, NotebookTabsIcon, Package, Plus, PlusCircle, ReceiptIcon, ReceiptRussianRuble, ShoppingCart, User, User2, Wallpaper } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/Components/ui/collapsible"
function SalesSideBarComponent(props) {
    const [inventoryOpen,setInventoryopen]=React.useState(false)

    const inventoryLinks=[
      {
        name:"All",
        link:"/usermanagement",
        icon:<Wallpaper className='w-4 h-4'/>
      },
      {
        name:"Add User",
        link:"/usermanagement/User/new",
        icon:<Plus className='w-4 h-4'/>
      },
   
      
    ]
    const InventoryList=inventoryLinks.map((link)=>{
        return(
            <Link href={link.link} key={link.name} className='flex ml-10 space-x-2 p-2   hover:bg-slate-900 transition-all duration-800 ease-in-out  rounded-lg text-sm ' > 
              {link.icon}
              <span>{link.name}</span>
               
              
              </Link>
        );
      })
  return (
    <div>
      <Collapsible>
      <CollapsibleTrigger className={props.location=="usermanagement" ? 'flex items-center space-x-2 p-2 bg-blue-500 rounded-md':'flex items-center space-x-2 p-2 '} onClick={()=>setInventoryopen(!inventoryOpen)}>
        <User2 className='w-4 h-4'/>
        
        <span className="whitespace-nowrap"> User's </span>
        { inventoryOpen ? <ChevronDown className='relative  left-[0.6vw] w-4 h-4'/>: < ChevronRight className='relative left-[0.6vw]  w-4 h-4'/>}
         </CollapsibleTrigger>
        <CollapsibleContent >
        
        <div style={{ position: "relative", left: "1vw" }}>
        {InventoryList}
        </div>
      
       </CollapsibleContent>
        </Collapsible>





    </div>
  )
}

export default SalesSideBarComponent
