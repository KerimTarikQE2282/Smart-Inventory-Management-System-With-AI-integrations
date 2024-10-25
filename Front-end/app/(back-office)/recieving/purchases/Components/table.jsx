"use client"; // Ensure you're in client-side rendering mode
import { Columns, Pencil, Trash, Upload } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import DeleteBtn from '@/app/(back-office)/GeneralComponents/DeleteBtn';
import { useGetData } from '@/hooks/useGetData';
import Loader from '@/Components/dashboard/Loader';     
import 'react-loading-skeleton/dist/skeleton.css';
import exportFromJSON from 'export-from-json';
import { useRouter } from 'next/navigation'; // Correct import for router

export default function DataTable({ name, columns = [''], resourceTitle }) {
  const { isLoading, data, isError, error, isFetching } = useGetData(name);
  const router = useRouter(); // Correct initialization of router

  const Data = data?.data?.[name];
  console.log("🚀 ==> file: DataTable.jsx:15 ==> DataTable ==> Data:", typeof Data);
  console.log("🚀 ==> file: DataTable.jsx:15 ==> DataTable ==> Data:", Data);

  const exportJson = () => {
    const fileName = 'name_data';
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data: Data, fileName, exportType });
  };

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  } else {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
 <button href={"/dashboard/inventory/items/new"} className="p-1 bg-blue-600 rounded-md flex items-center space-x-2 px-3 mb-5" onClick={exportJson}>
            <Upload className="text-white w-4 h-4" />
            <span className='text-white'>Export</span>
          </button>        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((title) => {
                return title !== 'id' ? (
                  <th className="px-6 py-4" key={title}>{title}</th>
                ) : null;
              })}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Data?.map((mydata) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={mydata._id}>
                  {columns.map((title, i) => (
                    <td
                      key={i}
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => router.replace(`/recieving/purchases/details/${mydata._id}`)} // Fix route.replace() to router.replace()
                    >
                      {title.includes(".") ? (
                        // Nested object handling
                        title.split(".").reduce((obj, key) => obj[key], mydata)
                      ) : title === "createdAt" || title === "updatedAt" ? (
                        // Convert date columns to a readable format
                        new Date(mydata[title]).toLocaleDateString()
                      ) : title === "imageUrl" ? (
                        // Handle image URLs
                        <img
                          src={mydata[title]}
                          alt={`Image for ${resourceTitle}`}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      ) : (
                        // Display the value normally
                        mydata[title]
                      )}
                    </td>
                  ))}
                  <td className="py-4 flex gap-10">
                    <Link href={`/recieving/${resourceTitle}/update/${mydata._id}`} className="font-medium text-blue-500">
                      <Pencil className="text" />
                    </Link>
                  </td>
                  <td>
                    <DeleteBtn resourceTitle={resourceTitle} id={mydata?._id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
