import { BaggageClaim, Box, Boxes, Building2, ChevronDown, ChevronRight, Codesandbox, Contact, Edit, Factory, PlusCircle, Ruler, Store, Wallpaper, Warehouse } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/Components/ui/collapsible"
function InventorySideBarComponent() {
    const [inventoryOpen,setInventoryopen]=React.useState(false)
    
    const inventoryLinks=[
      {
        name:"All",
        link:"/what wjksanjkasnjkdnasjknxdjkas/",
        icon:<Wallpaper className='w-4 h-4'/>
      },
      {
        name:"Items",
        link:"/storing/items",
        icon:<Box className='w-4 h-4'/>
      },
      {
        name:"Categories",
        link:"/storing/Categories/",
        icon:<Boxes className='w-4 h-4'/>
      },
      {
        name:"Brands",
        link:"/storing/Brands/",
        icon:<Building2 className='w-4 h-4'/>
      },
      {
        name:"Units",
        link:"/storing/unit/",
        icon:<Ruler className='w-4 h-4'/>
      },
      {
        name:"Ware House",
        link:"/storing/WareHouse/",
        icon:<Warehouse className='w-4 h-4'/>
      },
      {
        name:"Inventory Adjustments",
        link:"/storing/adjustments/",
        icon:<Edit className='w-4 h-4'/>
      },
      {
        name:"Stores",
        link:"/storing/stores",
        icon:<Store className='w-4 h-4'/>
      },
      // {
      //   name:"Composite items",
      //   link:"/dashboard/inventory",
      //   icon:<Codesandbox className='w-4 h-4'/>
      // },
     
    ]
    const InventoryList=inventoryLinks.map((link)=>{
        return(
            <Link href={link.link} key={link.name} className='flex items-center justify-between hover:bg-slate-900 transition-all duration-500 ease-in-out pl-8 pr-2 py-2.5 ml-5 rounded-lg text-sm ' > 
              
              <span>{link.name}</span>
              {link.icon}
              
              </Link>
        );
      })
      const changeChevron=()=>{
        setInventoryopen(!inventoryOpen)
      }
  return (
   <div>
      <Collapsible >
      <CollapsibleTrigger  className='flex items-center space-x-2 p-2' onClick={changeChevron} >
        <BaggageClaim className='w-4 h-4'/>
        
        <span> Inventory</span>
        { inventoryOpen ? <ChevronDown className='relative  left-[4vw] w-4 h-4'/>: < ChevronRight className='relative  left-[4vw] w-4 h-4'/>}
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

export default InventorySideBarComponent
