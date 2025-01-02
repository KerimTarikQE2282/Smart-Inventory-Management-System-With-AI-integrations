import { Toaster } from "react-hot-toast"
import "../styles/globals.scss"
import { Inter } from 'next/font/google'
import StoreProvider from "./StoreProvider"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Smart Inventory System completed',
  description: '',
}

export default function RootLayout({ children }) {
  return (

    <html lang="en">
          <StoreProvider>

      <head>
      {/* <link rel="icon" href={favicon} /> */}
      </head>
      <body className={inter.className} suppressHydrationWarning>
      <Toaster
      position="top-center"
      reverseOrder={false}
      />
    {children}
        </body>
        </StoreProvider>
    </html>

  
  
  )
}
