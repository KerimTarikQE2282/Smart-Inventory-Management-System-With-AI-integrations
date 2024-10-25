"use client"

import { ShoppingCart, Home, BrainCircuit } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import InventorySideBarComponent from './InventorySideBarComponent'
import SalesSideBarComponent from './SalesSideBarComponent'
import PurchaseSideBarComponent from './PurchaseSideBarComponent'
import AISideBarComponent from './AiSideBarComponent'
import UserManagement from './UserManagement'
import { usePathname } from 'next/navigation'

function Sidebar() {
  const pathname = usePathname();
  const location = pathname.split("/")[1];

  // State to hold user data
  const [User, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Use useEffect to ensure localStorage is accessed on the client side
  useEffect(() => {
    const storedUser = JSON.parse(global?.window?.localStorage.getItem('INVENTORY_USER') || '{}');
    setUser(storedUser);
    setIsMounted(true); // Mark component as mounted
  }, []); // Only run once on mount

  if (!isMounted) {
    // Don't render the component until it is mounted (to avoid server-client mismatch)
    return null;
  }

  return (
    <div className='flex-col w-60 min-h-screen bg-slate-900 text-white justify-between fixed sm:flex mr-0'>
      {/* Top part */}
      <div className='flex-col'>
        {/* Logo */}
        <Link href={"#"} className='flex space-x-2 bg-slate-950 items-center py-3 px-2'>
          <ShoppingCart />
          <span className='font-semibold text-l'>Inventory</span>
        </Link>
        {/* Links */}
        <div className='flex flex-col gap-3 px-3 py-6'>
          <Link href={"/home/overview"} className={location === "home" ? 'flex items-center space-x-2 bg-blue-500 p-2 rounded-md' : 'flex items-center space-x-2 p-2 rounded-md'}>
            <Home className='w-4 h-4' />
            <span>Home</span>
          </Link>

          {User && (User.role === "admin" || User.role === "warehouse_personnel") && (
            <InventorySideBarComponent location={location} />
          )}

          {User && (User.role === "admin" || User.role === "sales_personnel") && (
            <SalesSideBarComponent location={location} />
          )}
           {User && (User.role === "admin" || User.role === "sales_personnel") && (
            <PurchaseSideBarComponent location={location} />
          )}
          {User && User.role === "admin" && (
            <UserManagement location={location} />
          )}

          <Link href={"#"} className='flex items-center space-x-2 p-2'>
            {User && User.role === "admin" && (
            <AISideBarComponent location={location} />
            )}
          </Link>
        </div>
      </div>

      {/* Bottom part */}
      <div className='flex-col'>
        <button className='flex flex-col bg-slate-950 justify-end w-full items-center'>
          <div className='flex space-x-2 items-center py-3 px-2'></div>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
