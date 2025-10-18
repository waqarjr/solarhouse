import React from 'react'
import Link from 'next/link'
import { OctagonAlert } from 'lucide-react'
const page = () => {
  return (
    <div className='h-[50px] w-full bg-blue-400 text-white flex gap-2 items-center justify-center' >
        <OctagonAlert  />
        <p className='inline-block'>No order has been made yet.&nbsp;
          <Link href="/shop" className=" font-semibold  transition-colors border-b-[1px] border-gray-300">
              Browse Products
            </Link>
        </p>
    </div>
  )
}

export default page