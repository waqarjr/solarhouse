"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from 'formik';
import Payment from "@/app/.component/Payment";
import useStoreData from '@/app/lib/useStoreData';
import Swal from 'sweetalert2';
import CheckoutSkeleton from './CheckoutSkeleton';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/app/lib/api';

export default function CheckoutForm() {
  const router = useRouter();
  const [value, setValue] = useState([]);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipping, setShipping] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [finalLoading, setFinalLoading] = useState(false);
  const [loading, setLoading] = useState(true);
    
  const { payment  , cart } = useStoreData();
  const getData = async (string) => {
    if (!string) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.get(`/products?include=${string}`);
      setData(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    const storageData = localStorage.getItem("name");
    if (!storageData) {
      setLoading(false);
      return;
    }
    const jsonObject = JSON.parse(storageData);
    if (jsonObject.length === 0) {
      setLoading(false);
      return;
    }
    const idData = jsonObject.map((value) => value.id);
     if (idData.length === 0) {
      setData([]);
      return;
    }
    const string = idData.join(',');
    getData(string);          
    console.log("toggle change");

  }, [cart]);

  useEffect(() => {
    const storageData = localStorage.getItem("name");
    if (!storageData || data.length === 0) return;

    const jsonObject = JSON.parse(storageData);
    const merged = data.map((item) => {
      const match = jsonObject.find((q) => q.id === item.id);
      return { ...item, ...match };
    });
    const total = merged.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);
    setTotalPrice(total);
    setValue(merged);
  }, [data]);

  const sweetAlert = (valid, resetForm) => {
    if (valid) {
      Swal.fire({
        icon: "success",
        title: "Successful",
        text: "Your order has been placed successfully",
      });
      localStorage.removeItem("name");
      setValue([]);
      setTotalPrice(0);
      resetForm();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Would you like to try again?",
      });
    }
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    streetAddress: Yup.string().required("Street address is required"),
    townCity: Yup.string().required("Town/City is required"),
    state: Yup.string().required("State is required"),
    postcode: Yup.string().required("Postcode is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });

  const validationShipping = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    streetAddress: Yup.string().required("Street address is required"),
    townCity: Yup.string().required("Town/City is required"),
    state: Yup.string().required("State is required"),
    postcode: Yup.string().required("Postcode is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      townCity: "",
      state: "",
      postcode: "",
      phone: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (value.length === 0) return;

      try {
        setFinalLoading(true);
        const newValue = { ...values, products: value, payment: payment, orderNote: orderNote };

        if (shipping) {
          const shippingErrors = await formikShipping.validateForm();

          if (Object.keys(shippingErrors).length > 0) {
            formikShipping.setTouched(
              Object.keys(formikShipping.initialValues).reduce(
                (acc, key) => ({ ...acc, [key]: true }),
                {}
              )
            );
            setFinalLoading(false);
            return;
          }
          const response = await axios.post('/api/checkout', { billing: newValue, shipping: formikShipping.values });
          sweetAlert(response.data.valid, resetForm);
        } else {
          const response = await axios.post('/api/checkout', { billing: newValue, payment: payment });
          sweetAlert(response.data.valid, resetForm);
        }
      } catch (error) {
        console.log(error.message, error.response?.status);
        setFinalLoading(false);
      } finally {
        setFinalLoading(false);
      }
    },
  });

  const formikShipping = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      townCity: "",
      state: "",
      postcode: "",
    },
    validationSchema: validationShipping,
  });

  if (loading) return <CheckoutSkeleton />;

  if (finalLoading) return (
    <div className='flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 min-h-screen w-full'>
      <div className="text-center space-y-6">
        <div className="flex flex-row gap-2 justify-center">
          <div className="w-5 h-5 rounded-full bg-blue-600 animate-bounce"></div>
          <div className="w-5 h-5 rounded-full bg-blue-600 animate-bounce [animation-delay:.2s]"></div>
          <div className="w-5 h-5 rounded-full bg-blue-600 animate-bounce [animation-delay:.4s]"></div>
        </div>
        <p className="text-gray-600 font-medium">Processing your order...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col gap-8">
              <h2 className="text-2xl font-bold text-gray-900">BILLING DETAILS</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First name <span className="text-red-500">*</span></label>
                    <input type="text" id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formik.touched.firstName && formik.errors.firstName ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last name <span className="text-red-500">*</span></label>
                    <input type="text" id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formik.touched.lastName && formik.errors.lastName ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
                  </div>
                </div>

                <div>
                  <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-2">Street address <span className="text-red-500">*</span></label>
                  <input type="text" id="streetAddress" name="streetAddress" value={formik.values.streetAddress} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formik.touched.streetAddress && formik.errors.streetAddress ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
                </div>

                <div>
                  <label htmlFor="townCity" className="block text-sm font-medium text-gray-700 mb-2">Town / City <span className="text-red-500">*</span></label>
                  <input type="text" id="townCity" name="townCity" value={formik.values.townCity} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formik.touched.townCity && formik.errors.townCity ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State / Country <span className="text-red-500">*</span></label>
                  <select id="state" name="state" value={formik.values.state} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formik.touched.state && formik.errors.state ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}>
                    <option value="">Select State / Country</option>
                    <option value="Azad Kashmir">Azad Kashmir</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="FATA">FATA</option>
                    <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                    <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                    <option value="Punjab">Punjab</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-2">Postcode / ZIP <span className="text-red-500">*</span></label>
                  <input type="text" id="postcode" name="postcode" value={formik.values.postcode} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formik.touched.postcode && formik.errors.postcode ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
                  <input type="text" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email address <span className="text-red-500">*</span></label>
                  <input type="text" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
                </div>
              </div>

              <div>
                <label><input type="checkbox" onChange={(e) => setShipping(e.target.checked)} />&nbsp; Ship to a different address?</label>
                <div className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${shipping ? "max-h-[1000px] opacity-100 px-2 py-4" : "max-h-0 opacity-0"}`}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="shippingFirstName" className="block text-sm font-medium text-gray-700 mb-2">First name <span className="text-red-500">*</span></label>
                        <input type="text" id="shippingFirstName" name="firstName" value={formikShipping.values.firstName} onChange={formikShipping.handleChange} onBlur={formikShipping.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formikShipping.touched.firstName && formikShipping.errors.firstName ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
                      </div>
                      <div>
                        <label htmlFor="shippingLastName" className="block text-sm font-medium text-gray-700 mb-2">Last name <span className="text-red-500">*</span></label>
                        <input type="text" id="shippingLastName" name="lastName" value={formikShipping.values.lastName} onChange={formikShipping.handleChange} onBlur={formikShipping.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formikShipping.touched.lastName && formikShipping.errors.lastName ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="shippingStreetAddress" className="block text-sm font-medium text-gray-700 mb-2">Street address <span className="text-red-500">*</span></label>
                      <input type="text" id="shippingStreetAddress" name="streetAddress" value={formikShipping.values.streetAddress} onChange={formikShipping.handleChange} onBlur={formikShipping.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formikShipping.touched.streetAddress && formikShipping.errors.streetAddress ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
                    </div>

                    <div>
                      <label htmlFor="shippingTownCity" className="block text-sm font-medium text-gray-700 mb-2">Town / City <span className="text-red-500">*</span></label>
                      <input type="text" id="shippingTownCity" name="townCity" value={formikShipping.values.townCity} onChange={formikShipping.handleChange} onBlur={formikShipping.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formikShipping.touched.townCity && formikShipping.errors.townCity ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
                    </div>

                    <div>
                      <label htmlFor="shippingState" className="block text-sm font-medium text-gray-700 mb-2">State / Country <span className="text-red-500">*</span></label>
                      <select id="shippingState" name="state" value={formikShipping.values.state} onChange={formikShipping.handleChange} onBlur={formikShipping.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formikShipping.touched.state && formikShipping.errors.state ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}>
                        <option value="">Select State / Country</option>
                        <option value="Azad Kashmir">Azad Kashmir</option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="FATA">FATA</option>
                        <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                        <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                        <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                        <option value="Punjab">Punjab</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="shippingPostcode" className="block text-sm font-medium text-gray-700 mb-2">Postcode / ZIP <span className="text-red-500">*</span></label>
                      <input type="text" id="shippingPostcode" name="postcode" value={formikShipping.values.postcode} onChange={formikShipping.handleChange} onBlur={formikShipping.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formikShipping.touched.postcode && formikShipping.errors.postcode ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="orderNote" className="block text-sm font-medium text-gray-700 mb-2">Order notes (optional)</label>
                <textarea id="orderNote" placeholder='Please enter your order note here' value={orderNote} onChange={(e) => setOrderNote(e.target.value)} className='border-2 border-gray-200 w-full focus:border-blue-500 focus:ring-0 focus:outline-none p-2 rounded-md' rows={4} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">YOUR ORDER</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-sm font-semibold text-gray-700">Product</span>
                  <span className="text-sm font-semibold text-gray-700">Subtotal</span>
                </div>

                {value.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium mb-4">No products found</p>
                    <button type="button" onClick={() => router.push('/shop')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition">Go to Shop</button>
                  </div>
                ) : (
                  <>
                    {value.map(item => (
                      <div key={item.id} className="flex justify-between items-start py-4 border-b border-gray-200">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{item?.name} × {item?.qty}</p>
                        </div>
                        <div className="text-sm font-medium text-gray-900 ml-4">Rs {item?.price * item?.qty}</div>
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

                    <Payment />

                    <button type="submit" disabled={value.length === 0} className={`w-full mt-6 font-semibold py-4 px-6 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${value.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-[1.02]'}`}>Place Order</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}