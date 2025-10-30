'use client'
import { ChevronDown,Heart , Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import api from '../lib/api';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useStoreData from "@/app/lib/useStoreData";
import ProductGridSkeleton from "@/app/.component/ProductGridSkeleton";
const Products = () => {
    const {showProduct,setShowProduct,select,setSelect} = useStoreData();

    const [products , setProducts] = useState([])
    const [totalProducts, setTotalProducts] = useState()
    const router = useRouter();
    const {toggleCart} = useStoreData();    
    const [ changeDiv,setChangeDiv] = useState(false);


    const cartData = (id) => {
      if(localStorage.getItem("name")) {
        const existingData = JSON.parse(localStorage.getItem("name"));
        const filter =  existingData.filter((v)=> v.id === id);
        if(filter.length) { 
          filter[0].qty = filter[0]["qty"] + 1;
          localStorage.setItem("name", JSON.stringify(existingData));
        }
        else {
          const updatedData = [...existingData, {id : id , qty: 1}];
          localStorage.setItem("name", JSON.stringify(updatedData));
        }
      } else {
        const existingData =  [];
        const updatedData = [...existingData, {id : id , qty: 1}];
        localStorage.setItem("name", JSON.stringify(updatedData));
      }
    };
    
    const getData = async ()=>{
      try{
      const response = await api.get(`/products?orderby=${select.split(",")[0]}&order=${select.split(",")[1]}&per_page=${showProduct}&page=1`)      
      setTotalProducts(response.headers["x-wp-total"]); 
      setProducts(response.data)
      }catch (e){
        console.log(e.message);
      }
    }
  useEffect(()=>{
    getData();
  },[showProduct,select])

  // if(true ) return <ProductGridSkeleton/>

  return (<>  
  <div className='flex flex-col' >
        {/* header */}
        <div className='my-1 py-1 grid grid-cols-2 items-center justify-evenly ' >
            <p className='text-gray-800 text-[15px] ml-9' >Showing 1-{showProduct} of {totalProducts} results</p>
            <div className='flex items-center justify-end gap-4 mx-2' >
              {/* products per page */}
                <p className='[&>*]:p-1 gap-2 flex items-center justify-center' >Show 
                  <span className={`${showProduct === "12" ? " border-black border-b-2 " :""} cursor-pointer hover:text-blue-500`} onClick={()=>setShowProduct("12")} >12</span>
                   <span className={`${showProduct === "15" ? " border-black border-b-2 " :""} cursor-pointer hover:text-blue-500`} onClick={ ()=>setShowProduct("15")} >15</span> 
                   <span className={`${showProduct === "30" ? " border-black border-b-2 " :""} cursor-pointer hover:text-blue-500`} onClick={ ()=> setShowProduct("30")} >30</span>
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
        <div className={`${changeDiv ? "grid-cols-1 my-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 my-6"} grid mx-4`}>
          {products.map(value => (
            <div key={value.id} className={`${changeDiv ? "grid grid-cols-[35%_auto] sm:grid-cols-[30%_auto] gap-4 my-3 h-[200px] sm:h-[250px] md:h-[300px]" : "h-[350px] sm:h-[400px] w-full max-w-[300px] mx-auto"} group relative overflow-hidden rounded-md cursor-pointer transition-all duration-300 hover:shadow-sm`}>
              
              <div className={`${changeDiv ? "flex items-center justify-center" : "relative"} ${changeDiv ? "h-full" : "h-[70%]"} w-full overflow-hidden`}>
                <Image onClick={() => router.push(`/product/${value.slug}`)} unoptimized src={value.images[0]?.src || "/image1.jpg"} alt={value.images[0]?.alt || "products image"} priority width={256} height={0} className={`${changeDiv ? "rounded-2xl" : ""} object-cover w-full h-full group-hover:scale-105 transition-transform duration-500`} />

                <div className={`${changeDiv ? "hidden sm:flex" : "flex"} absolute top-3 right-3 flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500`}>
                  <button className="bg-white hover:bg-red-500 cursor-pointer p-2.5 rounded-full shadow-md transform hover:scale-105 transition-all duration-300" aria-label="Add to wishlist">
                    <Heart size={18} className="text-red-500 hover:text-white transition-colors" />
                  </button>
                  <button className="bg-white hover:bg-gray-700 cursor-pointer p-2.5 rounded-full shadow-md transform hover:scale-105 transition-all duration-300" aria-label="Quick view">
                    <Search size={18} className="text-gray-700 hover:text-white transition-colors" />
                  </button>
                </div>

                <div onClick={toggleCart} className={`${changeDiv ? "hidden sm:block" : "block"} absolute bg-white hover:bg-blue-400 rounded-tl-2xl bottom-0 p-2 pb-3 right-0 pr-3 opacity-0 translate-y-5 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200`}>
                  <button className="bg-black hover:bg-gray-900 text-white p-2 rounded-full shadow cursor-pointer transition-colors" onClick={() => cartData(value.id)} aria-label="Add to cart">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>

              <div className={`${changeDiv ? "flex flex-col justify-center" : ""} px-2 py-4`}>
                <h3 className={`${changeDiv ? "text-sm sm:text-base md:text-lg" : "text-base sm:text-lg"} font-semibold text-gray-700 leading-normal hover:text-blue-500 transition-colors line-clamp-2 cursor-pointer`}>
                  {value.name || "Products"}
                </h3>
                <p className={`${changeDiv ? "text-xs sm:text-sm md:text-base" : "text-sm sm:text-base"} text-gray-600 font-medium mt-1`}>
                  RS {value.price || "0"}
                </p>

                {changeDiv && (
                  <button onClick={(e) => { e.stopPropagation(); toggleCart(); cartData(value.id); }} className="sm:hidden mt-3 bg-white hover:bg-blue-400 text-white text-sm px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors">
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

  </div>
  </>)
}

export default Products