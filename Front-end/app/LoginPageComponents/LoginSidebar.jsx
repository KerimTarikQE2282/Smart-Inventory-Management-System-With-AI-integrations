import Image from 'next/image'
import React from 'react'
import image from '../../Resources/LoginImage.png'
export default function LoginSidebar() {
  return (
    <div className='w-[55vw] lg:h-[100vh]'>
<Image
  src={image}
  alt='loginSideBar'
 
  className="relative lg:left-32 top-24 lg:w-full w-[80vw] left-[19vw] h-auto"
/>
    </div>
  )
}
