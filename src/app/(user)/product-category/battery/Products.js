'use client'
import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { ChevronDown,Heart , Search, ShoppingCart } from 'lucide-react';
import useStoreData from '@/app/lib/useStoreData';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 

const Products = () => {
  const [totalProducts, setTotalProducts] = useState("");
  const [products , setProducts] = useState([]);
  const [showProduct , setShowProdct] = useState("12");
  const [changeDiv,setChangeDiv] = useState(false);
  const [select , setSelect] = useState('date,desc');

  const {toggleCart} = useStoreData();    
  const router = useRouter();
  const getData = async ()=>{
    try{
      const response = await axios.get(
      `https://solarhouse.pk/wp-json/wc/v3/products?category=75&orderby=${select.split(",")[0]}&order=${select.split(",")[1]}&per_page=${showProduct}&page=1`,
      {
        auth: {
          username: "ck_99f7a958b70ea5326b2620d11d1ab448903842f5", 
          password: "cs_507c77fdcf49ed4b19fd444c23649a09dabffa97" 
        }
      }
    );
    setTotalProducts(response.headers["x-wp-total"]); 
    setProducts(response.data)
    }catch (e){
      console.log(e.message);
    }
    }

    useEffect(()=>{
      getData();
    },[showProduct,select])

  return (
        <div className='flex flex-col' >
          {/* header */}
          <div className='my-1 py-1 grid grid-cols-2 items-center justify-evenly ' >
              <p className='text-gray-800 text-[15px] ml-9' >Showing 1-{showProduct} of {totalProducts} results</p>
              <div className='flex items-center justify-end gap-4 mx-2' >
                {/* products per page */}
                  <p className='[&>*]:p-1 gap-2 flex items-center justify-center' >Show 
                    <span className={`${showProduct === "12" ? " border-black border-b-2 " :""} cursor-pointer hover:text-blue-500`} onClick={()=>setShowProdct("12")} >12</span>
                    <span className={`${showProduct === "15" ? " border-black border-b-2 " :""} cursor-pointer hover:text-blue-500`} onClick={ ()=>setShowProdct("15")} >15</span> 
                    <span className={`${showProduct === "30" ? " border-black border-b-2 " :""} cursor-pointer hover:text-blue-500`} onClick={ ()=> setShowProdct("30")} >30</span>
                  </p>
                  {/* slection */}
                  <div className="relative inline-flex items-center">
                    <select onChange={(e)=>setSelect(e.target.value)} className="appearance-none flex items-center justify-center px-4 py-2 pr-8 rounded-3xl border-2 border-gray-200 text-gray-700 font-semibold bg-white cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-200">
                      <option value="date,desc">Default Sorting</option>
                      <option value="popularity,desc">Sort by popluarity</option>
                      <option value="rating,desc">Sort by average rating</option>
                      <option value="price,desc">Price: high to low</option>
                      <option value="price,asc">price : low to high</option>
                    </select>

                    <ChevronDown className="absolute right-3 text-gray-500 pointer-events-none group-hover:text-blue-500 transition duration-200" />
                  </div> 
                  {/* change Div */}
                  <div onClick={()=>setChangeDiv(false)}  className={` ${changeDiv ? "border-gray-200" : "bg-blue-500 stroke-white border-blue-500"} px-2 py-3 rounded-full  border-1   stroke-black hover:cursor-pointer`} >
                    <svg width="30" height="20" viewBox="0 0 50 48" fill="none" >
                      <path d="M25 1H1V22H25V1Z" strokeWidth="3"/>
                      <path d="M52 1H28V22H52V1Z" strokeWidth="3"/>
                      <path d="M52 26H28V47H52V26Z" strokeWidth="3"/>
                      <path d="M25 26H1V47H25V26Z" strokeWidth="3"/>
                    </svg>
                  </div>
                  <div onClick={()=>setChangeDiv(true)} className={`${changeDiv ? "bg-blue-500 stroke-white border-blue-500" :"border-gray-200"}  px-2 py-3 rounded-full border-1 stroke-black  hover:cursor-pointer`} >
                    <svg width="30" height="20" viewBox="0 0 50 48" fill="none" >
                      <path d="M19 1H1V17H19V1Z" strokeWidth="3"/>
                      <path d="M19 23H1V39H19V23Z" strokeWidth="3"/>
                      <path d="M31 4H50M31 15H50" strokeWidth="3"/>
                      <path d="M31 28H50M31 39H50" strokeWidth="3"/>
                    </svg>
                  </div>
              </div>
          </div>
          {/* Products */}
            <div className={` ${changeDiv ? "grid-cols-1 my-1" :"grid-cols-3 gap-8 my-6"} grid mx-4 `}>
                  {products.map( value =>(
                    <div key={value.id} className={`${changeDiv ? "grid grid-cols-[35%_auto] gap-4 my-3  h-[300px]" :"h-[400px] w-[300px] "} group  relative overflow-hidden rounded-md cursor-pointer  transition-all duration-300`}>
                      <div className={`${changeDiv? "flex  items-center justify-center " :"relative"}h-[70%]   w-full overflow-hidden`}>

                        <Image onClick={()=>{router.push(`/product/${value.slug}`)}} unoptimized  src={value.images[0]?.src || "/image1.jpg" } alt={value.images[0]?.alt || "products image"}  priority  width={256} height={0}
                        className={` ${changeDiv ? "rounded-2xl " :""} object-cover w-full h-full  group-hover:scale-105 transition-transform duration-500`}/>
 
                        <div className="absolute   top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <button className="bg-white hover:bg-red-500  cursor-pointer p-2 rounded-full shadow opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ">
                            <Heart size={18} className="text-red-500 hover:text-white " />
                          </button>
                          <button className="bg-white hover:bg-gray-700 cursor-pointer p-2 rounded-full shadow opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ">
                            <Search size={18} className="text-gray-700 hover:text-white" />
                          </button>
                        </div>
                        <div onClick={toggleCart} className="absolute bg-blue-600 rounded-tl-2xl bottom-0 p-2 pb-3 right-0 pr-3 opacity-0 translate-y-5 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <button className="bg-black text-white p-2 rounded-full shadow cursor-pointer" onClick={()=> {cartData(value.id)}}>
                            <ShoppingCart size={18}  />
                          </button>
                        </div>
                      </div>
                      <div className="px-2 py-4 ">
                        <h3 className=" font-semibold text-gray-700 leading-nomal hover:text-blue-500 line-clamp-2">{value.name || "Products"}</h3>
                        <p className="text-gray-600 text-[14px]  mt-1">RS {value.price ||"0"}</p>
                      </div>
                  </div>
                  ))}
            </div>
    </div>
  )
}

export default Products