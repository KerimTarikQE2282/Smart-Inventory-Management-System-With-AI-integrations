"use client"
import { Bell, ChevronDown, History, LayoutGrid, LogOut, Plus, Settings, User2, Users2 } from 'lucide-react'
import React from 'react'
import Search_bar from './Search_bar'
import Image from 'next/image'
import image from '../../Resources/image.png'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import {  useRouter } from 'next/navigation'
function header({user}) {
  const router=useRouter()

  const User = {} || JSON?.parse(global?.window?.localStorage.getItem('INVENTORY_USER') || '{}');
  console.log("🚀 ==> file: Header.jsx:13 ==> header ==> User:", User);

  const handleLogout=()=>{
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!"
    }).then(async (result) => {
      if (result.isConfirmed) {
          global.window.localStorage.removeItem('INVENTORY_USER');
          router.replace('/');

        //  router.refresh();
        await Swal.fire({
          text: "Logged out succesfully",
          icon: "success"
        });
       
      }
    });
  }
   

  return (
    <div className="bg-[#f8f7fe] h-12 flex items-center justify-between px-8 border-b border-gray-200 ">
   
    <div className="flex items-center gap-3">
      <button className='hidden lg:block'>
        <History className="w-5 h-5" />
      </button>
      <Search_bar />
    </div>
  

    <div className="flex items-center ml-auto gap-4">
      <div className="flex items-center border-r border-gray-300 pr-2">
        <button className="p-1 bg-blue-600 rounded-lg">
          <Plus className="text-white w-4 h-4" />
        </button>
      </div>
  
      <div className="flex items-center border-r  border-gray-300 pr-2 gap-2">
        <button className="p-1 bg-slate-100 rounded-lg">
          <Users2 className="text-slate-900 w-4 h-4" />
        </button>
        <button className="p-1 bg-slate-100 rounded-lg">
          <Bell className="text-slate-900 w-4 h-4" />
        </button>
        <button className="p-1 bg-slate-100 rounded-lg">
          <Settings className="text-slate-900 w-4 h-4" />
        </button>
      </div>
  
      <div className="flex items-center gap-2 ml-2">
        <button className="flex items-center">
          {User?.username}
         
        </button>
        <Image src={image || User?.profilePicture} alt="" className="rounded-full w-10 h-10 ml-5 border border-slate-900" />
        <button className="  rounded-lg flex flex-row   py-1 px-4" onClick={handleLogout}>
       <LogOut/>  <span>Log Out</span> 
        </button>
      </div>
    </div>
  </div>
  
      
    
  )
}
const mapStateToProps=(state)=>  ({
user:state.auth.user  
})
export default connect(mapStateToProps)(header)
