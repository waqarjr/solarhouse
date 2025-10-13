import React from 'react'
import Link from 'next/link'
const page = () => {
  return (<>
  <p>Create page </p>
  <button className='px-6 py-2 bg-amber-300 rounded text-white cursor-pointer' >
    <Link href='/admin/products' >Products</Link>
  </button>
  </>)
}

export default page