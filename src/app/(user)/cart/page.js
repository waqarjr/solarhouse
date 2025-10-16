"use client"
import React, { useState,useEffect } from 'react';
import { ChevronRight, Trash2 } from 'lucide-react';
import axios from 'axios';
import useStoreData from "@/app/lib/useStoreData";
import { useRouter } from 'next/navigation';

const  Page = ()=> {
  const {cart,toggleCart} = useStoreData();
  const [value, setValue] = useState([]);
  const [data ,setData ] = useState([])
  const [totalPrice ,setTotalPrice] = useState(0);
  const router = useRouter();

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
        console.error(e.message);
      } 
}
  
useEffect(()=>{
  if( localStorage.getItem("name")){
    const storageData = localStorage.getItem("name");
    const jsonObject= JSON.parse(storageData);
    const idData = jsonObject.map((value)=> {return  value.id});
    const string = idData.join(','); 
    getData(string);
  }
},[cart])

  useEffect(() => {
    const storageData = localStorage.getItem("name");
    if (!storageData || data.length === 0) return;

    const jsonObject = JSON.parse(storageData);

    const merged = data.map((item) => {
      const match = jsonObject.find((q) => q.id === item.id);
      return { ...item, ...match };
    });
    const total = merged.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.qty),
      0
    );
    setTotalPrice(total);
    setValue(merged);
  }, [data]);  

  const changeQuantity = (quantity,id)=>{
      if(localStorage.getItem("name")) {
        const existingData = JSON.parse(localStorage.getItem("name"));
        const filter =  existingData.filter((v)=> v.id === id);
        if(filter.length) { 
          filter[0].qty = quantity;
          localStorage.setItem("name", JSON.stringify(existingData));
        }
        else {
          const updatedData = [...existingData, {id : id , qty: quantity}];
          localStorage.setItem("name", JSON.stringify(updatedData));
        }
      } else {
        const existingData =  [];
        const updatedData = [...existingData, {id : id , qty: quantity}];
        localStorage.setItem("name", JSON.stringify(updatedData));
      }  
      toggleCart();
  }


  const remove = (id)=>{
      const storageData = localStorage.getItem("name");
      if (!storageData) return;
      const jsonObject= JSON.parse(storageData);
      const fil = jsonObject.filter(val => val.id !== id);
      const string = JSON.stringify(fil);
      localStorage.setItem("name",string);
      toggleCart();
  }

  return (
    <div className="min-h-screen ">
      {/* Breadcrumb */}
      <div className="bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <span className="hover:text-gray-900 cursor-pointer">Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Cart</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Cart</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 ">
            {/* Table Header - Hidden on mobile */}
            <div className="hidden md:grid md:grid-cols-13 bg-gray-200 gap-4   rounded-t-lg px-6 py-4  font-semibold text-gray-700">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
              <div className="col-span-2 text-right">Delete</div>
            </div>

            {/* Cart Item */}
            {value.map((value,id)=>(
              <div key={id} className="bg-white  md:rounded-t-none shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-13 gap-4 md:gap-4 p-4 md:p-6 border-b md:border-b-0">
                {/* Product Info */}
                <div className="md:col-span-5 flex gap-4">
                  <img  src={value?.images[0]?.src || "image1.jpg"} 
                    alt="Ausxol Inverter"  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg bg-gray-100"/>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1">
                      {value.name}
                    </h3>
                    
                  </div>
                </div>

                {/* Price - Mobile */}
                <div className="md:hidden flex justify-between items-center">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold text-gray-900">Rs {value.price }</span>
                </div>

                {/* Price - Desktop */}
                <div className="hidden md:col-span-2 md:flex items-center justify-center">
                  <span className="font-semibold text-gray-900">Rs {value.price }</span>
                </div>

                {/* Quantity */}
                <div className="md:col-span-2 flex md:justify-center items-center">
                  <div className="flex items-center">
                    <span className="md:hidden text-gray-600 mr-4">Quantity:</span>
                    <input type="number" value={value.qty }  onChange={(e) => changeQuantity(e.target.value,value.id)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1" />
                  </div>
                </div>

                {/* Subtotal */}
                <div className="md:col-span-3 flex md:justify-end items-center">
                  <div className="flex justify-between md:justify-center justify-around-end w-full">
                    <span className="md:hidden text-gray-600">Subtotal:</span>
                    <span className="font-bold text-gray-900 text-lg">Rs {value.price * value.qty}</span>
                  </div>
                </div>
                <div className='flex justify-end items-center' >
                  <button onClick={()=>remove(value.id)} className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 mt-2 cursor-pointer">
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div> 
              </div>
            </div>
            ))}
          </div>

          {/* Cart Totals Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cart totals</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-700 font-medium">Subtotal</span>
                  <span className="text-xl font-bold text-gray-900">Rs {totalPrice}</span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-700 font-medium">Total</span>
                  <span className="text-2xl font-bold text-gray-900">Rs {totalPrice}</span>
                </div>
              </div>

              <button onClick={()=> router.replace("/checkout")}
              className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Page;