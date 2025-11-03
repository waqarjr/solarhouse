'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import { LayoutDashboard, Package, Download, MapPin, User, LogOut,Lock } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import axios from 'axios';
import * as Yup from "yup";
import { useFormik,} from 'formik';
import useStoreData from '@/app/lib/useStoreData';
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";


export default function Layout({ children }) {
  const {valid, setUser, clearUser, } = useStoreData();
  
  const [invalidLogin , setInvalidLogin] = useState(false);
  const [loading , setLoading] = useState(true);
  const router = useRouter();
  const pathName = usePathname();

  
const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href:"/my-account" },
    { icon: Package, label: "Orders",href:"/my-account/orders" },
    { icon: Download, label: "Downloads", href:"/my-account/downloads" },
    { icon: MapPin, label: "Addresses", href:"/my-account/edit-address" },
    { icon: User, label: "Account details", href:"/my-account/edit-account" },
  ];


const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password : Yup.string().required(),
});
const initialValues = {
  email : "",
  password : "",
}

const formik = useFormik({ 
  initialValues : initialValues,
  validationSchema : validationSchema,
  onSubmit: async (values)=>{
        try{ 
          setLoading(true);
          const responce = await axios.post("/api/auth/login",values)
          if(responce.data.valid) setUser(responce.data.message);
          else clearUser();
      }catch (e){
        console.log(e.message);
        setInvalidLogin(true);
      } finally {
        setLoading(false)
      }
  }
})
const handRegis = useFormik({
  initialValues : { regis :"",},
  validationSchema :  Yup.object({ regis : Yup.string().required(),}),
  onSubmit : async(values,)=>{
   const password = Math.floor(Math.random()*1000000).toString();
    const newValue = {...values ,...{username  : values.regis.split("@")[0] , password : password}}
    const response = await axios.post("/api/auth/signup",newValue);
    if(response.data.valid) router.push("/my-account");
  }
})



  const fetchData = async()=>{
    try{
      setLoading(true);
    const response  = await axios.post('/api/auth/verify');
    if(response.data.valid) setUser(response.data.message);
      else clearUser();
    } catch {
      clearUser();
    }finally{
      setLoading(false);
    }

  }

  useEffect(()=>{
    fetchData();     
  },[])

if(loading) return (<>
  <div className="flex items-center justify-center min-h-[600px] bg-gray-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-10 w-10 bg-gray-300 rounded-full mb-4"></div>
        <div className="h-4 w-40 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
</>)

// logout 
const logout = async ()=>{
Swal.fire({
  title: "Do you want to logout your account?",
  showCancelButton: true,
  confirmButtonText: "Yes",
}).then( async (result) => {
  if (result.isConfirmed) {
    try{
      setLoading(true);
      const responce =  await axios.post('/api/auth/logout')
      if(responce.data.valid) clearUser();
      router.push('/my-account');
      Swal.fire("Logout successfully !", "", "success");
    }catch(error){
      Swal.fire("fail to logout !", "", "error");
    } finally {
      setLoading(false);
    }
  } 
});
  
}

// Dashboard
if(valid) 
{
  return (<>
  <Header/>
<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[20%_auto]">
  {/* Sidebar */}
  <aside className="block md:block">
    <nav className="p-4">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            href={item.href}
            key={item.label}
            className={`flex items-center justify-start gap-3 border-b border-gray-200 py-4 px-2 my-2 cursor-pointer transition-colors 
              ${pathName === item.href ? "text-blue-500" : "text-gray-700 hover:text-blue-500"}`}>
            <Icon className="w-6 h-6" />
            <p className="text-base font-medium">{item.label}</p>
          </Link>
        );
      })}
      <button
        onClick={logout}
        className="w-full flex items-center justify-start gap-3 border-b border-gray-200 py-4 px-2 my-2 cursor-pointer text-gray-700 hover:text-red-500 transition-colors"
      >
        <LogOut className="w-6 h-6" />
        <p className="text-base font-medium">Log Out</p>
      </button>
    </nav>
  </aside>

  {/* Main Content */}
  <main className="p-4 md:p-8">
    {children}
  </main>
</div>

  </>)
}


// for handle false in after get true 
const handleChange = (e)=>{
    if (invalidLogin) setInvalidLogin(false); 
  formik.handleChange(e);
}

const handlePassword  = (e)=>{
    if (invalidLogin) setInvalidLogin(false); 
  formik.handleChange(e);
}


// login , signup
return (<>
<Header/>
<div className=" flex items-center justify-center bg-white px-4">
  { pathName === "/my-account"  ? 
  (<>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl bg-white  p-8 md:p-10">

    <div className="grid gap-6">
      <div className="text-black text-center">
        <h3 className="font-semibold text-3xl">Login</h3>
      </div>

      <div className="flex items-center justify-center">
        <form onSubmit={formik.handleSubmit} className="w-full max-w-sm md:max-w-md [&>*]:my-4">
          <input type="text" placeholder="Email" name="email" autoComplete="email" value={formik.values.email} onChange={handleChange} onBlur={formik.handleBlur}
            className={`w-full px-4 py-3 border text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition
              ${formik.errors.email && formik.touched.email ? "border-red-400" : "border-gray-300"}
            `}
          />

          <input type="password" autoComplete="current-password" placeholder="Password" name="password" value={formik.values.password}onChange={handlePassword} onBlur={formik.handleBlur}
            className={`w-full px-4 py-3 border text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition
              ${formik.errors.password && formik.touched.password ? "border-red-400" : "border-gray-300"}
            `}
          />
          {invalidLogin && <p className='text-center text-red-500' >Invalid Username Or Password</p>}
          <div className="flex gap-3 items-center">
            <input type="checkbox" />
            <label className="font-bold text-black">Remember me</label>
          </div>

          <button type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Login
          </button>
        </form>
      </div>

      <Link href="/my-account/lost-password" className="text-center">
        <p className="text-black inline-block border-b-2 border-black hover:opacity-80">
          Lost your password?
        </p>
      </Link>
    </div>

    <div className="grid gap-6">
      <div className="text-black text-center">
        <h3 className="text-3xl font-semibold">Register</h3>
      </div>

      <div className="flex items-center justify-center">
        <form onSubmit={handRegis.handleSubmit} className="w-full max-w-sm md:max-w-md [&>*]:my-4">
          <input type="text" placeholder="Email or username" name="regis" value={handRegis.values.regis} onChange={handRegis.handleChange} onBlur={handRegis.handleBlur}
            className={`w-full px-4 py-3 border text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition
              ${handRegis.errors.regis && handRegis.touched.regis ? "border-red-400" : "border-gray-300"}
            `}
          />

          <p className="text-gray-600 text-sm">
            A password will be sent to your email address.
          </p>

          <p className="text-gray-600 text-sm">
            Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{" "}
            <span className="text-black border-b-2 border-black hover:cursor-pointer">privacy policy.</span>
          </p>

          <button type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
  </>) : (<>{children}</>) }
</div>
</>)

}