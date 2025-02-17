'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

function page() {
  const Path=usePathname()
  console.log("🚀 ==> page ==> Path:", Path);
  
  return (
    <div>home</div>
  )
}

export default page
