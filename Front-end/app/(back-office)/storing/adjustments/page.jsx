'use client'
import { useForm } from "react-hook-form";
import React from 'react';
import DataTable from "./Components/DataTable";
import TabelNavBar from "@/Components/TabelNavBar";
import { MinusCircle, PlusCircle, Truck } from "lucide-react";



export default  function NewAdjustments({items,WareHouses}) {
  const [displayedForm,setDisplayedForm]=React.useState("add")
  const tabs=[
    {
      title:'View Newly Added Stock',
      icon:<PlusCircle className='w-4 h-4 mr-2' />,
      form:"add"
    },
    {
      title:'View All Stock individually',
      icon:<MinusCircle className='w-4 h-4 mr-2'/>,
      form:'transfer'
    }
  ]
  const columns=['item','StoredAt','createdAt','carton'];

  const mytabs=tabs.map((tab)=>{
    return(
    <li className="me-2" key={tab.title}>
    <button href="#" className={tab.form===displayedForm ? 'inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group':'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group'} onClick={()=>setDisplayedForm(tab.form)}>
            {tab.icon}
        {tab.title}
    </button>
</li>)
  })
 
  return (
    <div>
      {/* { header } */}
      <TabelNavBar link='/storing/adjustments/new' title='Adjustments'/>
      <div >
      <div className="border-b border-gray-200 dark:border-gray-700 w-full max-w-4xl px-4 py-2 bg-white border   dark:bg-gray-800  mx-auto my-3 shadow-lg rounded-md">
    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
       
        {mytabs}

       
       
    </ul>
</div>
      </div >
      {
        displayedForm=="add"?
        <div className="w-[55vw] ml-[15.5vw]">
        <DataTable name='WareHouseAdjustments/NewItems'  columns={columns}/>
        </div>
        :
        <div className="w-[55vw] ml-[15.5vw]">

      <DataTable name='WareHouseAdjustments/AllStock'columns={columns}/> 
      </div>

      }

    </div>
  )
}
