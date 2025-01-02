import Image from 'next/image'
import React from 'react'
import image from '../../Resources/LoginImage.png'
export default function LoginSidebar() {
  return (
    <div className='w-[55vw] h-[100vh]'>
      <Image src={image} alt='loginSideBar' width={1000} height={667}  className='relative left-32 top-24'/>
    </div>
  )
}
