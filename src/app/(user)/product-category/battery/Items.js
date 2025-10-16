'use client'
import React from 'react'
import { useState,useEffect } from 'react';
import { ChevronDown, } from 'lucide-react';
import axios from 'axios';
const Items = () => {
        
    const [category , setCategory] = useState(true);
    const [price , setPrice] = useState(true);
    const [ChangePrice , setChangePrice] = useState(60000)
    const [tag, setTags] = useState(true);
    const rangeStyling = "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500  [&::-moz-range-thumb]:h-4  [&::-moz-range-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:hover:bg-blue-600 "
    const [apiCategories , setApiCategories] = useState([]);
    const [apiTags , setApiTags] = useState([]);
    
    const getApiCategories = async ()=>{
      try{
        const response = await axios.get(
        "https://solarhouse.pk/wp-json/wc/v3/products/categories?parent=0",
        {
          auth: {
            username: "ck_99f7a958b70ea5326b2620d11d1ab448903842f5", 
            password: "cs_507c77fdcf49ed4b19fd444c23649a09dabffa97" 
          }
        }
      );
      setApiCategories(response.data)
      }catch (e){
        console.log(e.message);
      }
    }
    const getApiTags = async ()=>{
      try{
          const response = await axios.get(
        "https://solarhouse.pk/wp-json/wc/v3/products/tags?per_page=100",
        {
          auth: {
            username: "ck_99f7a958b70ea5326b2620d11d1ab448903842f5", 
            password: "cs_507c77fdcf49ed4b19fd444c23649a09dabffa97" 
          }
        }
      );
      const retriveData = response.data.filter(tag => tag.count === 0)
      setApiTags(retriveData );
      }catch(e){
        console.log(e.message);
      }
    }
  useEffect(()=>{
    getApiCategories();
    getApiTags();
  },[])
  return (<>
  <div className='grid [&>*]:border-gray-100  ' >
      {/* Category */}
        <div className='grid my-1 py-2 border-b-2 cursor-pointer ' onClick={()=> setCategory(!category)} >
            <div className='flex items-center justify-between' >
              <p className='font-semibold text-[20px] text-gray-900' >Category</p>
              <ChevronDown className={`text-[14px] text-gray-400 ${category ? "rotate-0" :"rotate-180"} transition-all duration-150 `}  />
            </div>
        </div>
        <ul className={`grid gap-2  [&>li:hover]:text-black overflow-hidden transition-all duration-500 ease-out ${category ? "max-h-96 opacity-100 [&>*]:px-3 my-2" : "h-0 opacity-0"}`}>
          {apiCategories.map((value)=>(
            <li key={value.id} className='flex items-center  justify-between text-gray-600 cursor-pointer' >
            <div className='flex items-center' >
              <ChevronDown size={15} className='text-[5px] -rotate-90'/>
              <p>{value.name}</p>
            </div>
            <span>({value.count})</span>
          </li>
          ))}
       </ul>
       {/* Price */}
        <div className='grid my-1 py-2 border-b-2 cursor-pointer ' onClick={()=> setPrice(!price)} >
            <div className='flex items-center justify-between' >
              <p className='font-semibold text-[20px] text-gray-900' >Price</p>
              <ChevronDown className={`text-[14px] text-gray-400 ${price ? "rotate-0" :"rotate-180"} transition-all duration-150 `}  />
            </div>
        </div>
        <div className={`flex flex-col  overflow-hidden transition-all duration-200 ease-in-out  ${price ? "max-h-96 opacity-100 px-2 py-4":"h-0 opacity-0"}`}>
          <input type='range' value={ChangePrice} min={160} max={60000} onChange={(e) => setChangePrice(e.target.value)} className={rangeStyling} />
          <div >
            <p className="text-gray-700 py-1">Min Price: <span className="text-blue-500">160</span></p>
            <p className="text-gray-700 py-1">Selected Price: <span className="text-blue-500">{ChangePrice}</span></p>
          </div>
        </div>
        {/* Tag */}
        <div className='grid my-1 py-2 border-b-2 cursor-pointer ' onClick={()=> setTags(!tag)} >
            <div className='flex items-center justify-between' >
              <p className='font-semibold text-[20px] text-gray-900' >Tag</p>
              <ChevronDown className={`text-[14px] text-gray-400 ${tag ? "rotate-0" :"rotate-180"} transition-all duration-150 `}  />
            </div>
        </div>
        <div className={`[&>*]:hover:text-black transition-all duration-200 ease-in-out ${tag ? "max-h-96 opacity-100 ":"h-0 opacity-0"}`} >
          {apiTags.map((value)=>(
            <button key={value.id} className="m-1 border-2 rounded-3xl border-gray-300 px-3 py-1 text-center text-gray-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 duration-150 cursor-pointer">
              {value.name}
            </button>
          ))}
       </div>
    </div>
  </>)}

export default Items