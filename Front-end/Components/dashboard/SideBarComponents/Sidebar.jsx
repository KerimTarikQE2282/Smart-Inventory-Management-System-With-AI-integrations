"use client"

import { BaggageClaim, BarChart4, Blocks, BrainCircuit, ChevronDown, ChevronLeft, ChevronRight, File, FilesIcon, Flag, FolderClosed, Home, Plus, PlusCircle, ShoppingBasket, ShoppingCart, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/ui/collapsible"
import SalesSideBarComponent from './SalesSideBarComponent'
import InventorySideBarComponent from './InventorySideBarComponent'
import PurchaseSideBarComponent from './PurchaseSideBarComponent'
import UserManagement from './UserManagement'
import { usePathname } from 'next/navigation'

function Sidebar() {
  const pathname=usePathname();
  const location=pathname.split("/")[1];
  const User =  JSON?.parse(global?.window?.localStorage.getItem('INVENTORY_USER') || '{}');

  

  

  return (
 
       <div className='  flex-col w-60 min-h-screen bg-slate-900  text-white justify-between fixed  sm:flex mr-0' > 
       {
        /*top part*/
       }
       
       <div className='flex-col '>
       {
        /*Logo*/
       }
       <Link href={"#"} className='flex space-x-2 bg-slate-950 items-center py-3 px-2'>
        <ShoppingCart/>
        <span className='font-semibold text-l '>Inventory</span>
       </Link>
       {
        /*Links*/
       }
       <nav className='flex flex-col gap-3 px-3 py-6'>
        <Link href={"/home/overview"} className={location=="home" ? 'flex items-center space-x-2 bg-blue-500  p-2 rounded-md':'flex items-center space-x-2   p-2 rounded-md'}>
        <Home className='w-4 h-4'/>
       <span> Home</span> 
       </Link>
       
   { (req.user.role=="admin"||req.user.role=="warehouse_personnel") &&  <InventorySideBarComponent location={location}/>}
      
       
        


{/*                            */}
{ (req.user.role=="admin" || req.user.role=="sales_personnel") &&       <SalesSideBarComponent location={location}/> }       
    
{req.user.role=="admin"  &&  <UserManagement location={location}/>}

       <Link href={"#"} className='flex items-center space-x-2 p-2'>
{req.user.role=="admin"  &&      <>  <BrainCircuit className='w-4 h-4'/>  <span> AI</span> </>
}      
       </Link>

       <Link href={"#"} className='flex items-center space-x-2 p-2'>
{ req.user.role=="admin"  &&      <> <BarChart4 className='w-4 h-4'/><span> Reports</span> </> 
}       
       </Link>

       <Link href={"#"} className='flex items-center space-x-2 p-2'>
{ req.user.role=="admin"  &&      <> <FolderClosed className='w-4 h-4'/>  <span> Documents</span> </> 
}      
       </Link>

       </nav>
       </div>
       
      {
        /*bottom  part*/
       }
    <div className='flex-col '>
       <button className='flex flex-col bg-slate-950 justify-end w-full items-center'>
        
       <div className='flex space-x-2  items-center py-3 px-2'>
     
       </div>
       </button>
       </div>
         {
        /*Subscription Card*/
       }
         {
        /*footer icon*/
       }
       
       </div>
    
  )
}

export default Sidebar
