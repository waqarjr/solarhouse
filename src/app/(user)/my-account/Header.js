import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
const Header = () => {
  const pathName = usePathname();
  
  return (
    <div className="max-w-7xl grid grid-cols-[30%_auto] mx-auto  my-8 " >
    <div className=" flex flex-col  justify-center gap-5 " >
        <p className="text-[14px] flex gap-2" >
            <Link href="/" >Home</Link> / {
              pathName.split('/').length === 3 ? (<>
              <Link href="/my-account" >My account</Link> / <span className="text-gray-900 " >{pathName.split('/')[2]}</span>
              </>) :<span className="text-gray-600" >My account</span>
            }        
          </p>
        <h1 className="text-[45px] text-black font-bold" >My account</h1>
    </div>
    <div>
    </div>
  </div>
  )
}

export default Header