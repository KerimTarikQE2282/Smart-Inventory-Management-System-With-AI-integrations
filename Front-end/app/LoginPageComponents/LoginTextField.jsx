'use client';
import React from 'react';

export default function LoginTextField({
  label,
  name,
  defaultValue = '',
  width = 'w-full', // You can pass something like 'max-w-sm' or 'w-1/2'
  type = 'text',
  isrequired = true,
  register,
  errors,
}) {
  return (
    <div className={`${width} px-2`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 mb-2"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          {...register(name, { required: isrequired })}
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          autoComplete={name}
          className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          placeholder={`Type the ${label}`}
        />
        {errors[name] && (
          <span className="text-sm text-red-600">
            {`${label} is required`}
          </span>
        )}
      </div>
    </div>
  );
}
