'use client'
import { Provider } from "react-redux"
import ReactQueryProvider from "./ReactQueryProviders"
import Store from '../lib/store'
export default function StoreProvider({children}) {
return (
    <ReactQueryProvider>
    <Provider store={Store}>{children}</Provider>
    </ReactQueryProvider>
  )
}
