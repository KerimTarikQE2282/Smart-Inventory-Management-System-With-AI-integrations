import Link from 'next/link'
import LoginForm from './LoginPageComponents/LoginForm'
import LoginSidebar from './LoginPageComponents/LoginSidebar'

export default function Home() {
  
  return (
   
   <div className='lg:flex  lg:flex-row  '>
     <LoginSidebar/>
    <LoginForm/>
   
     
     
   </div>

   // <Link href="/home">home dashboard</Link>
 
  )
}
