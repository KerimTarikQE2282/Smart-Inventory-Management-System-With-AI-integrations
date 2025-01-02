'use client'
import { useForm } from "react-hook-form";
import React from 'react';
import FormHeader from '@/Components/dashboard/FormHeaders';
import TransferInventoryForm from "./TransferInventoryForm";
import { MinusCircle, PlusCircle, Truck } from "lucide-react";
import AddinventoryForm from "./AddInventoryForm";
import SendToShopFrom from "./SendToShopFrom";


export default  function NewAdjustments({items,WareHouses,stores}) {
  const [displayedForm,setDisplayedForm]=React.useState("add")
  const tabs=[
    {
      title:'Add Stock',
      icon:<PlusCircle className='w-4 h-4 mr-2' />,
      form:"add"
    },
    {
      title:'Transfer Stock',
      icon:<MinusCircle className='w-4 h-4 mr-2'/>,
      form:'transfer'
    },
    {
      title:'Send Goods to Shop',
      icon:<Truck className='w-4 h-4 mr-2'/>,
      form:'Shop'
    }
  ]

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
      <FormHeader title="Stock Transfer" link={'/dashboard/inventory/adjustments'} />
      <div >
      <div className="border-b border-gray-200 dark:border-gray-700 w-full max-w-4xl px-4 py-2 bg-white border   dark:bg-gray-800  mx-auto my-3 hadow-lg rounded-md">
    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
       
        {mytabs}

       
       
    </ul>
</div>
      </div>
      {
  displayedForm === "add" ? (
    <AddinventoryForm items={items} WareHouses={WareHouses} />
  ) : displayedForm === "transfer" ? (
    <TransferInventoryForm items={items} WareHouses={WareHouses} />
  ) : displayedForm === "Shop" ? (
    <SendToShopFrom items={items} WareHouses={WareHouses} stores={stores} />
  ) : null
}

    </div>
  )
}
