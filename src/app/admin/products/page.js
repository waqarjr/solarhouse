import React from 'react'
import Link from 'next/link'

const page = () => {
  return (<>
    <button className='px-6 py-2 bg-amber-400 rounded  cursor-pointer text-white '>
            <Link href='/admin/products/create' >Create</Link>
    </button>
  </>)
}

export default page