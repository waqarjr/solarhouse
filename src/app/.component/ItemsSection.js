'use client'
import React from 'react'
import { useState,useEffect } from 'react';
import { ChevronDown, } from 'lucide-react';
import api from '../lib/api';
import PriceSlidebar from "@/app/.component/PriceSlidebar";
import useStoreData from '../lib/useStoreData';
import { useRouter } from 'next/navigation';

const ItemsSection = () => {
      
    const [category , setCategory] = useState(true);
    const [price , setPrice] = useState(true);
    const [tag, setTags] = useState(true);
    const [apiCategories , setApiCategories] = useState([]);
    const [apiTags , setApiTags] = useState([]);
    const { minPrice, maxPrice, showProduct ,select ,filter, setFilter} =  useStoreData();
    const router = useRouter();        
    useEffect(()=>{
      
      console.log(minPrice,maxPrice,filter,showProduct ,select);
      console.log(`/?product-cata=${filter}&min-price=${minPrice}&max-price=${maxPrice}&per_page=${showProduct}&orderby=${select}`);
    },[minPrice,maxPrice,filter,showProduct ,select])
    const getApiCategories = async ()=>{
      try{
        const response = await api.get("/products/categories?per_page=100");
      setApiCategories(response.data)
      }catch (e){
        console.log(e.message);
      }
    }
    const getApiTags = async ()=>{
      try{
          const response = await api.get("/products/tags?per_page=100");
      setApiTags(response.data);
      }catch(e){
        console.log(e.message);
      }
    }

    useEffect(()=>{
      getApiCategories();
      getApiTags(); 
    },[])



  return (<>
  <div className='grid [&>*]:border-gray-100 ' >
      {/* Category */}
        <div className='grid my-1 py-2 border-b-2 cursor-pointer ' onClick={()=> setCategory(!category)} >
            <div className='flex items-center justify-between' >
              <p className='font-semibold text-[20px] text-gray-900' >Category</p>
              <ChevronDown className={`text-[14px] text-gray-400 ${category ? "rotate-0" :"rotate-180"} transition-all duration-150 `}  />
            </div>
        </div>
        <ul className={`grid gap-2  [&>li:hover]:text-black overflow-hidden transition-all duration-500 ease-out ${category ? "max-h-96 opacity-100 [&>*]:px-3 my-2" : "h-0 opacity-0"}`}>
          {apiCategories.map((value)=>(
            <li key={value.id} onClick={()=>setFilter(value.id)}  className='flex items-center  justify-between text-gray-600 cursor-pointer' >
            {/* <Link href="" className='flex items-center' > */}
              <ChevronDown size={15} className='text-[5px] -rotate-90'/>
              <p>{value.name}</p>
            {/* </Link> */}
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
          <PriceSlidebar />
        </div>
        {/* Tag */}
        <div className='grid my-1 py-2 border-b-2 cursor-pointer ' onClick={()=> setTags(!tag)} >
            <div className='flex items-center justify-between' >
              <p className='font-semibold text-[20px] text-gray-900' >Tag</p>
              <ChevronDown className={`text-[14px] text-gray-400 ${tag ? "rotate-0" :"rotate-180"} transition-all duration-150 `}  />
            </div>
        </div>
        <div className={` [&>*]:hover:text-black transition-all duration-200 ease-in-out ${tag ? "max-h-96 opacity-100 ":"h-0 opacity-0"}`} >
          {apiTags.map((value)=>(
            <button key={value.id} className="m-1 border-2 rounded-3xl border-gray-300 px-3 py-1 text-center text-gray-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 duration-150 cursor-pointer">
              {value.name}
            </button>
          ))}
       </div>
    </div>
  </>)
}

export default ItemsSection