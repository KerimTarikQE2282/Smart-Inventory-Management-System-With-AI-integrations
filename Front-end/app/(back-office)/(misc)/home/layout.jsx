import React from 'react'
import HomeNav from './Components/HomeNav'

function layout({children}) {
  return (
    <div >
        <HomeNav/>
      {children}
    </div>
  )
}

export default layout
