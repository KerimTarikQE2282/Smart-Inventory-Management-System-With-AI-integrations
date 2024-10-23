"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import {  Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'
import axios from 'axios';

export default function DeleteBtn(props) {
  const router = useRouter();
    const {resourceTitle,id}=props
    console.log(resourceTitle,id)
    async function  handleDelete(){
        
      // const res=await fetch("localhost:3000/api/"+resourceTitle+"/"+id,{
      //   method:'DELETE'})
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
             await axios.delete(` http://localhost:3002/api/v1/${resourceTitle}/${id}`);
          //  router.refresh();
          await Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          location.reload();
         
        }
      });
    }
  return (
    
       <button href={''} className='font-medium text-blue item-center space-x-2 text-red-600 ' onClick={handleDelete}><Trash2 /></button>
    
  )
}









