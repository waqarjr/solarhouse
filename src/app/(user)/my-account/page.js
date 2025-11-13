'use client'
import Link from 'next/link'
import React from 'react'
import useStoreData from '@/app/lib/useStoreData'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter();
  const {user,clearUser} = useStoreData();
 const logout = async ()=>{
    Swal.fire({
      title: "Do you want to logout your account?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then( async (result) => {
      if (result.isConfirmed) {
        try{
          const responce =  await axios.post('/api/auth/logout')
          if(responce.data.valid) clearUser() ;
            router.push('/my-account');
          Swal.fire("Logout successfully !", "", "success");
        }catch(error){
          Swal.fire("fail to logout !", "", "error");
        }
      } 
});
  
}

  return (
    <>
      <main className="flex-1 ">
          <div className="mb-8">
            <p className="text-gray-600 text-sm mb-6">
              Hello <span className="font-medium">{user.name || "solar house"} </span> 
              ( not {user.name || "solar house"}? &nbsp;
              <button onClick={logout} className="text-blue-600 hover:underline font-medium">
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

export default Page