'use client'
import * as Yup from "yup";
import { useFormik} from 'formik';
import React from 'react'


 
const page = () => {
  
  const handRegis = useFormik({
    initialValues : { regis :"",},
    validationSchema :  Yup.object({ regis : Yup.string().email().required(),}),
    onSubmit : async(values,)=>{
      console.log(values);""
    //  const password = Math.floor(Math.random()*1000000).toString();
    //   const newValue = {...values ,...{username  : values.regis.split("@")[0] , password : password}}
    //   const response = await axios.post("/api/auth/signup",newValue);
    //   if(response.data.valid) router.push("/my-account");
    }
  })


  return (
 <div className='w-full max-w-[400px] mx-auto min-h-[400px] grid grid-cols-1 place-items-center p-6 rounded-lg '>
  <div className='w-full flex flex-col items-center justify-center gap-10'>
    <div className='w-full'>
      <p className='text-center text-gray-700 text-sm md:text-base leading-relaxed'>
        Lost your password? Please enter your username or email address. You will receive a link to create a new password via email
      </p>
    </div>
    <div className='w-full'>
      <form onSubmit={handRegis.handleSubmit} className="w-full space-y-4">
        <input type="text"   placeholder="Email or username"  name="regis"  value={handRegis.values.regis}  onChange={handRegis.handleChange}  onBlur={handRegis.handleBlur}
          className={`w-full px-4 py-3 border text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition
            ${handRegis.errors.regis && handRegis.touched.regis ? "border-red-400" : "border-gray-300"}
          `}
        />
        <button type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Reset Password
        </button>
      </form>
    </div>
  </div>
</div>
  )
}

export default page