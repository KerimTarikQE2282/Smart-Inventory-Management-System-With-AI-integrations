import React from 'react'
import HomeNav from './Components/HomeNav'

function layout({children}) {
  return (
    <div >
        <HomeNav/>
        <div className='ml-[3vw] mt-[2vh]'>
      {children}
      </div>
    </div>
  )
}

export default layout
