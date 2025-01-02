"use client"
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import {ReactQueryDevtools} from 'react-query/devtools'

export default function ReactQueryProvider({children}) {
    const queryClient=new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
   {children}

   </QueryClientProvider>
  )
}
