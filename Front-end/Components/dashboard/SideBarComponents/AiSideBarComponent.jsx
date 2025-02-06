import { BaggageClaim, Box, Boxes, BrainCircuit, Building2, ChevronDown, ChevronRight, Codesandbox, Contact, Edit, Factory, PlusCircle, Ruler, Store, Wallpaper, Warehouse } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/Components/ui/collapsible"
function InventorySideBarComponent(props) {
    const [inventoryOpen,setInventoryopen]=React.useState(false)
    
    const inventoryLinks=[
      {
        name:"Quantity Sold Forcaster",
        link:"/AI/Regression/RegressionSingle",
        icon:<Wallpaper className='w-4 h-4'/>
      },
      {
        name:"Associated Items Sold",
        link:"/AI/Apriori",
        icon:<Wallpaper className='w-4 h-4'/>
      },
      {
        name:"Most Sold Items",
        link:"/AI/eclat",
        icon:<Wallpaper className='w-4 h-4'/>
      },
     
      // {
      //   name:"Composite items",
      //   link:"/dashboard/inventory",
      //   icon:<Codesandbox className='w-4 h-4'/>
      // },
     
    ]
    const InventoryList=inventoryLinks.map((link)=>{
        return(
            <Link href={link.link} key={link.name} className='flex items-center  hover:bg-slate-900 transition-all duration-500 ease-in-out pl-8 pr-2 py-2.5 ml-5 rounded-lg text-sm ' > 
               {link.icon}
              <span>{link.name}</span>
             
              
              </Link>
        );
      })
      const changeChevron=()=>{
        setInventoryopen(!inventoryOpen)
      }
  return (
   <div>
      <Collapsible >
      <CollapsibleTrigger  className={props.location=="Ai"?'flex items-center space-x-2 p-2 bg-blue-500 rounded-md':'flex items-center space-x-2 p-2 '} onClick={changeChevron} >
      <BrainCircuit className='w-4 h-4' />
        
        <span> AI</span>
        { inventoryOpen ? <ChevronDown className='relative  left-[4vw] w-4 h-4'/>: < ChevronRight className='relative  left-[4vw] w-4 h-4'/>}
         </CollapsibleTrigger>
        <CollapsibleContent >
        
        
        <div style={{ position: "relative", left: "1vw" }}> {InventoryList}</div>
        {/* <Link>Item Groups</Link>
         <Link>Inventory Adjustments</Link> */}
       </CollapsibleContent>
        </Collapsible>
        </div>
    
  )
}

export default InventorySideBarComponent
