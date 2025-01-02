import { SearchIcon } from 'lucide-react'
import React from 'react'

function Search_bar() {
  return (
    <div>
      <form className=' lg:block ml-5'>
      <label htmlFor="simple-search" className="sr-only">Search</label>
<div className="relative lg:w-[12vw] w-[26vw] hover:w-[15vw] focus:w-[15vw] transition-all duration-1000 ease-in-out ">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon className='w-4 h-4 text-gray-500 dark:text-gray-400'/>
            
        </div>
        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 px-2 py-1.5  " placeholder="Search in customers .." required />
    </div>

      </form>
    </div>
  )
}

export default Search_bar
