import { UploadDropzone } from '@uploadthing/react';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

export default function ImageInput({label,imageURL="",setImageUrl,endPoint="imageUploader",className='col-span-full'}) {
 
  return (
    <div className={className}>
    <div className="flex justify-between items-center mb-4">
      <label
        htmlFor="course-image"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label} Image
      </label>
      {imageURL && (
        <button
          onClick={() => setImageUrl("")}
          type="button"
          className="flex space-x-2  bg-slate-900 rounded-md shadow text-white  py-2 px-4 " 
          
        >
          <Pencil className="w-5 h-5" />
          <span>Change Image</span>
        </button>
      )}
    </div>
    {imageURL ? (
      <Image
        src={imageURL}
        alt="Item image"
        width={1000}
        height={667}
        className="w-full h-64 object-cover"
      />
    ) : (
      <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        // Do something with the response
        setImageUrl(res[0].url);
        console.log(res[0].url);
        alert("Upload Completed");
      }}
      onUploadError={(error) => {
        // Do something with the error.
        console.log(`ERROR! ${error.message}`);
      }}
        />
    )}
  </div>
  )
}
