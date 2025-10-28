'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import { LayoutDashboard, Package, Download, MapPin, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import axios from 'axios';
import * as Yup from "yup";
import { useFormik,} from 'formik';

export default function Layout({ children }) {
  
  const pathName = usePathname();
  const [valid , setValid] = useState(false);
  const [invalidLogin , setInvalidLogin] = useState(false);
  const [data ,setData ] = useState();
  
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href:"/my-account" },
    { icon: Package, label: "Orders",href:"/my-account/orders" },
    { icon: Download, label: "Downloads", href:"/my-account/downloads" },
    { icon: MapPin, label: "Addresses", href:"/my-account/edit-address" },
    { icon: User, label: "Account details", href:"/my-account/edit-account" },
  ];

  const fetchData = async()=>{
   const response  = await axios.post('/api/auth/verify');
   setData(response.data);
    setValid(response.data.valid);
  }
  useEffect(()=>{
    fetchData();     
  },[])

console.log(data);

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
          const responce = await axios.post("/api/auth/login",values)
          console.log(responce.data)
          localStorage.setItem("isopen",true) 
      }catch (e){
        console.log(e.message);
        setInvalidLogin(true);
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

// for handle false in after get true 
const handleChange = (e)=>{
    if (invalidLogin) setInvalidLogin(false); 
  formik.handleChange(e);
}

const handlePassword  = (e)=>{
    if (invalidLogin) setInvalidLogin(false); 
  formik.handleChange(e);
}

// logout 
const logout = async ()=>{
  try{
    const responce =  await axios.post('/api/auth/logout')
    console.log(responce.data)
  }catch(error){
    console.error(error.message);
  }
}

// Dashboard
if(valid)
return (<>
<Header/>
<div className="min-h-screen grid grid-cols-[20%_auto]  max-w-7xl mx-auto">
          <aside className="">
            <nav className="p-4">
              {menuItems.map( item => {
                const Icon = item.icon;
                return (
                  <Link href={item.href} key={item.label} 
                  className={`flex items-center justify-start gap-3 border-b border-gray-200 py-4 px-2 my-2 cursor-pointer  hover:text-blue-500 transition-colors text-blue-500
                  ${pathName == item.href ? "text-blue-500" : "text-gray-700"}
                  `}>
                    <Icon className="w-6 h-6" />
                    <p className="text-base font-medium">{item.label}</p>
                  </Link>
                );
              })}
              <button onClick={logout} className="w-full flex items-center justify-start gap-3 border-b border-gray-200 py-4 px-2 my-2 cursor-pointer text-gray-700 hover:text-red-500 transition-colors">
                    <LogOut className="w-6 h-6" />
                    <p className="text-base font-medium">Log Out</p>
              </button>
            </nav>
          </aside>
          <main className="p-8">
            {children}
          </main>
</div>
</>)

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