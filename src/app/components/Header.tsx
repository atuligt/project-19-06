"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React from 'react'

type Tprops = {
  token?: boolean

}

const Header = (props: Tprops) => {
    

    if(!props.token){
      console.log("hello")
    }

    const pathname = usePathname()
    console.log('Pathname:', pathname);

    const router = useRouter();

    const handleLogout = ()=>{
      console.log("delete")
      router.push("/login");
       localStorage.removeItem("token")
    }

  return (
    <header>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-4 dark:bg-gray-800">
      <div className="text-right">
        {
          pathname == "/dashboard" ?
          <button className="font-extrabold text-[#9f9a9a]" onClick={handleLogout}>Logout</button>
          :
          <>
            <Link className="text-[#9f9a9a] mx-5 font-extrabold	" href="/login">Login</Link>
            <Link className="text-[#9f9a9a] mx-5 font-extrabold	" href="/register">Register</Link>
          </>
        
        }
       
       
      </div>      
    </nav>
</header>
  )
}

export default Header