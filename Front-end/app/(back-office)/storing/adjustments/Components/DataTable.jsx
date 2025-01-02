"use client"
import { Columns, Pencil, Trash } from 'lucide-react'
import React from 'react'
import { useGetData } from '@/hooks/useGetData'
import Loader from '@/Components/dashboard/Loader'
import 'react-loading-skeleton/dist/skeleton.css'

export default function DataTable({name,columns=[''],resourceTitle}) {

  const {isLoading,data,isError,error,isFetching}=useGetData(name);
  console.log("🚀 ==> file: DataTable.jsx:11 ==> DataTable ==> data:", data);

  const Data=data?.data

  
  if(isLoading){
    return (
      <>
   <Loader/>
</>
  )
  }
else{
  return (
  
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
       <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
           <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
               <tr  >
               {
                   columns.map((title) => {
                       return (
                           title !== 'id' ? (<th className="px-6 py-4">{title}</th>) : null
                       )
                   })
                 }
         
              
               </tr>
           </thead>
           <tbody>
   
       {Data?.map((mydata)=>{
           return(
           <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 " key={mydata.title}>
               
                  {
                   // columns.map((title) => {
                   //     return (
                   //         title !== 'id' ? (<td className="px-14 py-4 ">{mydata[title]}</td>) : null
                   //     )
                   // }
                   
                   //)
                   columns.map((title, i) => (
                     <td key={i} className="px-6 py-4">
                       {title.includes(".") ? (
                         // If the column name contains a dot, it's a nested object
                         // Access the nested key using reduce
                         title.split(".").reduce((obj, key) => obj[key], mydata)
                       ) : title === "createdAt" ||
                       title === "updatedAt" ? (
                         // Convert date columns to a more readable format
                         new Date(mydata[title]).toLocaleDateString()
                       ) : title === "imageUrl" ? (
                         // Special handling for imageUrl to render an image
                         <img
                           src={mydata[title]}
                           alt={`Image for ${resourceTitle}`}
                           className="w-10 h-10 object-cover rounded-full"
                         />
                       ) : (
                         // Otherwise, display the value as is
                         mydata[title]
                       )}
                     </td>
                   ))}
                    
                  
                  {/* <td className=" py-4 flex gap-10  ">
                       <Link href={`/storing/${resourceTitle}/update/${mydata._id}`} className='font-medium text-blue item-center space-x-2 text-blue-500'><Pencil className='text'/></Link>
                      
                   </td>
                   <td>
                  <DeleteBtn resourceTitle={resourceTitle} id={mydata?._id}/>
                   </td> */}
               </tr>
           )
       })
   
   
       }
   
               
               
           </tbody>
       </table>
   </div>
   
     
   
   
   )
}
  
}
