"use client"
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik,} from 'formik';

export default function CheckoutForm() {
  
  const [value, setValue] = useState([]);
  const [data ,setData ] = useState([])
  const [totalPrice ,setTotalPrice] = useState(0);

const getData = async (string)=>{
    if (!string) return;
    try{
        const response = await axios.get(
        `https://solarhouse.pk/wp-json/wc/v3/products?include=${string}`,
        {
          auth: {
            username: "ck_99f7a958b70ea5326b2620d11d1ab448903842f5", 
            password: "cs_507c77fdcf49ed4b19fd444c23649a09dabffa97" 
          }
        }
      );
      setData(response.data);
      }catch (e){
        console.log(e.message);
      } 
}
  
useEffect(()=>{
  const storageData = localStorage.getItem("name");
  const jsonObject= JSON.parse(storageData);
  const idData = jsonObject.map((value)=> {return  value.id});
  const string = idData.join(',');
  getData(string);
},[])

useEffect(() => {
  const storageData = localStorage.getItem("name");
  if (!storageData || data.length === 0) return;

  const jsonObject = JSON.parse(storageData);

  const merged = data.map((item) => {
    const match = jsonObject.find((q) => q.id === item.id);
    return { ...item, ...match };
  });
  const total = merged.reduce( (sum, item) => sum + Number(item.price) * Number(item.qty),0);
  setTotalPrice(total);
  setValue(merged);
}, [data]);  


const validationSchema = Yup.object({
    firstName: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
    streetAddress: Yup.string().required("streetAddress is required"),
    townCity: Yup.string().required("townCity is required"),
    state: Yup.string().required("state is required"),
    phone : Yup.string().required("phone is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
});
const initialValues = {
  firstName:"",
  lastName:"",
  streetAddress:"",
  townCity:"",
  state:"",
  phone:"",
  email: "",
};

const formik = useFormik({
  initialValues : initialValues,
  validationSchema : validationSchema,
  onSubmit: (values,{resetForm})=>{
    console.log({...values,"cartvalue":value});
    resetForm();
    localStorage.removeItem("name"); 
  }
})


  return (

        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <form onSubmit={formik.handleSubmit} >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Billing Details Section */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">BILLING DETAILS</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First name <span className="text-red-500">*</span>
                        </label>
                        <input type="text" id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"/>
                          {formik.touched.firstName && formik.errors.firstName && (<span className="text-red-700" > {formik.errors.firstName} </span>)}
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last name
                        </label>
                        <input type="text" id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"/>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-2">
                        Street address <span className="text-red-500">*</span>
                      </label>
                      <input type="text" id="streetAddress" name="streetAddress" value={formik.values.streetAddress} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"/>
                      {formik.touched.streetAddress && formik.errors.streetAddress && (<span className="text-red-700" > {formik.errors.streetAddress} </span>)}
                    </div>

                    <div>
                      <label htmlFor="townCity" className="block text-sm font-medium text-gray-700 mb-2">
                        Town / City <span className="text-red-500">*</span>
                      </label>
                      <input type="text" id="townCity" name="townCity" value={formik.values.townCity} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"/>
                        {formik.touched.townCity && formik.errors.townCity && (<span className="text-red-700" > {formik.errors.townCity} </span>)}
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State / Country <span className="text-red-500">*</span>
                      </label>
                      <input type="text" id="state" name="state" value={formik.values.state} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"/>
                        {formik.touched.state && formik.errors.state && (<span className="text-red-700" > {formik.errors.state} </span>)}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input type="text" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"/>
                        {formik.touched.phone && formik.errors.phone && (<span className="text-red-700" > {formik.errors.phone} </span>)}

                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email address <span className="text-red-500">*</span>
                      </label>
                      <input type="text" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"/>
                        {formik.touched.email && formik.errors.email && (<span className="text-red-700" > {formik.errors.email}</span>)}
                    </div>
                  </div>
                </div>

                {/* Your Order Section */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">YOUR ORDER</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-700">Product</span>
                      <span className="text-sm font-semibold text-gray-700">Subtotal</span>
                    </div>

                    {value.map( value =>(
                      <div key={value.id} className="flex justify-between items-start py-4 border-b border-gray-200">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            {value?.name} × {value?.qty}
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-900 ml-4">
                          Rs {value?.price * value?.qty}
                        </div>
                    </div>
                    ))}

                    <div className="flex justify-between items-center py-4 border-b border-gray-200">
                      <span className="text-sm text-gray-700">Subtotal</span>
                      <span className="text-sm font-medium text-gray-900">Rs {totalPrice}</span>
                    </div>

                    <div className="flex justify-between items-center py-4 bg-gray-50 px-4 rounded-md">
                      <span className="text-base font-bold text-gray-900">Total</span>
                      <span className="text-base font-bold text-gray-900">Rs {totalPrice}</span>
                    </div>

                    <button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
  );
}