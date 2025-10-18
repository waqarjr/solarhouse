import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <main className="flex-1 ">
          <div className="mb-8">
            <p className="text-gray-600 text-sm mb-6">
              Hello <span className="font-medium">waqarjr03 </span> 
              ( not waqarjr03? &nbsp;
              <button className="text-blue-600 hover:underline font-medium">
                Log out
              </button>
              )
            </p>
          </div>

          {/* Dashboard Content */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-700 leading-relaxed">
              From your account dashboard you can view your{" "}
              <Link href="/my-account/orders" className="text-gray-900 font-semibold hover:text-blue-600 transition-colors border-b-[1px] border-gray-300">
                recent orders
              </Link>
              , manage your{" "}
              <Link href="/my-account/edit-address" className="text-gray-900 font-semibold hover:text-blue-600 transition-colors border-b-[1px] border-gray-300">
                shipping and billing addresses
              </Link>
              , and{" "}
              <Link href="/my-account/edit-account" className="text-gray-900 font-semibold hover:text-blue-600 transition-colors ">
                edit your password and account details
              </Link>
              .
            </p>
          </div>
      </main>
    </>
)
}

export default page