'use client'
import React from 'react'

export default function NonIdSelectComponent({ name, label, register, error, className, options=[] }) {
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
            <option key={option } value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error.message}</p>}
      </div>
    );
  }
  
