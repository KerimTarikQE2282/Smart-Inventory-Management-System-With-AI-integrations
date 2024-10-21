import { ArrowDownUp, BadgeDollarSign, BaggageClaim, Bookmark, CheckCheck, ChevronDown, ChevronRight, CircleOff, Container, Factory, Layers3, NotebookTabsIcon, Package, PlusCircle, ReceiptIcon, ReceiptRussianRuble, ShoppingCart, User, Wallpaper } from 'lucide-react';
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
        link:"/recieving",
        icon:<Wallpaper className='w-4 h-4'/>
      },
   
      {
        name:"Supplier",
        link:"/recieving/Supplier/",
        icon:<Factory className='w-4 h-4'/>
      },
      {
        name:"Purchase Order",
        link:"/recieving/purchases/",
        icon:<NotebookTabsIcon className='w-4 h-4'/>
      }
    ]
    const InventoryList=inventoryLinks.map((link)=>{
        return(
            <Link href={link.link} key={link.name} className='flex  hover:bg-slate-900 transition-all duration-500 ease-in-out pl-8 pr-2 py-2.5 ml-5 rounded-lg text-sm ' > 
              {link.icon}
              <span>{link.name}</span>
               
              
              </Link>
        );
      })
  return (
    <div>
      <Collapsible>
      <CollapsibleTrigger  className={props.location=="recieving" ? 'flex items-center space-x-2 p-2 bg-blue-500 rounded-md':'flex items-center space-x-2 p-2 '} onClick={()=>setInventoryopen(!inventoryOpen)}>
        <ShoppingCart className='w-4 h-4'/>
        
        <span> Purchase</span>
        { inventoryOpen ? <ChevronDown className='relative  left-[3.8vw] w-4 h-4'/>: < ChevronRight className='relative left-[3.8vw]  w-4 h-4'/>}
         </CollapsibleTrigger>
        <CollapsibleContent >
        
        <div style={{ position: "relative", left: "1.5vw" }}> {InventoryList}</div>

       
        {/* <Link>Item Groups</Link>
         <Link>Inventory Adjustments</Link> */}
       </CollapsibleContent>
        </Collapsible>





    </div>
  )
}

export default SalesSideBarComponent
