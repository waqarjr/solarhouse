'use client'
import { useEffect, useState } from "react"
import { X,User} from "lucide-react"
import * as Yup from "yup";
import { useFormik,} from 'formik';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Account = () => {

const [openCart ,setOpenCart] = useState(false);
const [register , setRegister] = useState(true);
const [token, setToken] = useState(true);
const router = useRouter();


const validationSchema = Yup.object({
    username: Yup.string().email().required(),
    password : Yup.string().required(),
});
const initialValues = {
  username : "",
  password : "",
}
const formik = useFormik({ 
  initialValues : initialValues,
  validationSchema : validationSchema,
  onSubmit: async (values)=>{
        try{ 
          const responce = await axios.post("/api/auth/login",values)
          setToken(responce.data.valid);
          localStorage.setItem("isopen",true)
      }catch (e){
        console.log(e.message);
      } 
  }
})
 
const handRegis = useFormik({
  initialValues : { regis :"",},
  validationSchema :  Yup.object({ regis : Yup.string().required(),}),
  onSubmit : (values,)=>{
    console.log(values);
  }
})

const logout = async ()=>{
  try{
    setToken(false);
    const responce =  await axios.post('/api/auth/logout')
    if(responce.data.valid) {
      router.push('/');
    }
  }catch(error){
    console.error(error.message);
  }
}

useEffect(()=>{
  const value = localStorage.getItem("isopen");
  if(value != null && value != undefined && value != false) {
    setToken(true);
  } else {
    setToken(false);
  }
},[])

return (<>
  <div className="relative group">
      <button className="flex items-center justify-center gap-3 hover:text-blue-500 cursor-pointer transition-colors" onClick={() => setOpenCart(!openCart)}>
        <User />
      </button>
      { token ? (<>
          <ul className="absolute top-10 -left-10 w-[150px] text-black bg-white rounded-md text-center
                    translate-y-2 opacity-0 invisible
                    group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible
                    transition-all duration-300 ease-in-out
                    shadow-lg group-hover:shadow-2xl
                    [&>*]:rounded-md [&>*]:hover:bg-gray-200 [&>*]:p-2 [&>*]:cursor-pointer [&>*]:transition-colors">
        <li>
          <Link href="/my-account" >Dashboard </Link>
        </li>
        <li>
          <Link href="/my-account/orders/" >Orders</Link>
        </li>
        <li>
          <Link href='/my-account/downloads/' >Downloads</Link>
        </li>
        <li>
          <Link href="/my-account/edit-address/">Addresses</Link>
        </li>
        <li>
          <Link href="/my-account/edit-account/" >Account details</Link>
        </li>
        <li onClick={()=>{logout()}} className="text-red-600 hover:!bg-red-100">Log out</li>
      </ul>
      </>) : (<>
        {openCart && (
      <div className="fixed inset-0 bg-gray-50/50  z-40 cursor-default" onClick={() => setOpenCart(false)}/>
    )}
    
    <div className={`fixed cursor-default top-0 right-0 h-full w-[500px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${ openCart ? 'translate-x-0' : 'translate-x-full'}`}>
      {register ? (
      <div className="p-4 grid grid-cols-1 ">
        <div className=" text-black p-4 flex items-center justify-between ">
          <h3 className="text-lg font-semibold flex items-center gap-2 hover:text-blue-500">
              <User className="w-5 h-5" />
              Login
          </h3>
          <button className="hover:bg-white/20 rounded-full p-1 transition-colors cursor-pointer hover:text-blue-500" onClick={()=> setOpenCart(!openCart)}>
              <X className="w-5 h-5 hover:rotate-180" />
          </button>
        </div>
        <div className="flex items-center justify-center g-amber-200 h-[350px] " >
          <form onSubmit={formik.handleSubmit} className="[&>*]:my-4" >  
                <input type="text" placeholder="Email" name="username" autoComplete="username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 border text-black  rounded-md focus:ring-2 focus:ring-blue-500 focus:border-t   ransparent outline-none transition
                  ${formik.errors.username && formik.touched.username ? "border-red-400" : "border-gray-300"}
                  `}/>
                <input type="password" autoComplete="current-password" placeholder="Password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 border text-black  rounded-md focus:ring-2 focus:ring-blue-500 focus:border-t   ransparent outline-none transition
                  ${formik.errors.password && formik.touched.password ? "border-red-400" : "border-gray-300"}
                  `}/>
                <div className="flex gap-3" >
                  <input type="checkbox"/>
                  <label className="font-bold text-black ">Remember me</label>
                </div>  
                <button  type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" >
                  Login
                </button>
          </form>
        </div>  
        <div>
          <p className="text-black w-[150px] border-b-2 border-black mx-4 my-1" >Lost your password ?</p>
          <p className="text-center text-black my-1">Not a member? 
          &nbsp;<span className="text-black border-b-2 border-black hover:cursor-pointer " onClick={()=>{setRegister(!register)}} >Register</span>
          </p>
        </div>
      </div>) :(
        <div className="p-4 grid grid-cols-1 ">
        <div className=" text-black p-4 flex items-center justify-between ">
          <h3 className="text-lg font-semibold flex items-center gap-2 hover:text-blue-500">
              <User className="w-5 h-5" />
              Register
          </h3>
          <button className="hover:bg-white/20 rounded-full p-1 transition-colors cursor-pointer hover:text-blue-500" onClick={()=> setOpenCart(!openCart)}>
              <X className="w-5 h-5 hover:rotate-180" />
          </button>
        </div>
        <div className="flex items-center justify-center g-amber-200 h-[350px] " >
          <form onSubmit={handRegis.handleSubmit} className="[&>*]:my-4" >  
                <input type="text" placeholder="Email or username" name="regis" value={handRegis.values.regis} onChange={handRegis.handleChange} onBlur={handRegis.handleBlur}
                  className={`w-full px-4 py-3 border text-black  rounded-md focus:ring-2 focus:ring-blue-500 focus:border-t   ransparent outline-none transition
                  ${handRegis.errors.regis && handRegis.touched.regis ? "border-red-400" : "border-gray-300"}
                  `}/>
                <p className="text-gray-600" >
                  A password will be sent to your email address.
                </p>
                <p className="text-gray-600" >
                  Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our
                  &nbsp;<span className="text-black border-b-2 border-black hover:cursor-pointer " >privacy policy.</span>
                </p>
    
                <button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" >
                  Register
                </button>
          </form>
        </div>  
        <div>
          <p className="text-center my-1 text-gray-900">Already a member? 
          &nbsp;<span className="text-black border-b-2 border-black hover:cursor-pointer " onClick={()=>{setRegister(!register)}} >Login</span>
          </p>
        </div>
      </div>
      )}
    </div>
      </>)}


  </div>
</>)
}

export default Account;