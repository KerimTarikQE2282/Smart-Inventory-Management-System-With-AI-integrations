'use client'
import React from 'react'

export default function SelectComponent({ name, label, register, error, className, options=[] }) {
console.log("🚀 ==> file: SelectComponent.jsx:5 ==> SelectComponent ==> options:", options);




    return (
      <div>
        <label 
          htmlFor={name} 
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select a {label}
        </label>
        <select 
          id={name} 
          {...register(name)} 
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        >
         
          {options.map(option => (
            <option key={option.title ||  option.UnitName || option.BrandName || option.WareHouseName || option.UnitName || option.ReferenceNumber || option.name || option.WareHouseName || option.StoreName ||option.customerName} value={option.id || option._id}>
              {option.title ||  option.UnitName || option.BrandName || option.WareHouseName || option.UnitName || option.ReferenceNumber || option.name ||  option.StoreName ||option.customerName}
            </option>
          ))}
        </select>
        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error.message}</p>}
      </div>
    );
  }
  
