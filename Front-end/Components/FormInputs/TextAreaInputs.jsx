import React from 'react'

export default function TextAreaInputs({ label, name, width, type = "text", isrequired = true, register, errors,defaultValue='' }) {
  return (
    <div className="sm:col-span-2">
    <label
      htmlFor="description"
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label} Description
    </label>
    <div className="mt-2">
      <textarea
        {...register(name, { required: true })}
        id="description"
        name={name}
        rows={3}
        defaultValue={defaultValue}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //defaultValue={defaultValue}
      />
      {errors[name] && (
        <span className="text-sm text-red-600 ">
          {label} Description is required
        </span>
      )}
    </div>
  </div>
  )
}
