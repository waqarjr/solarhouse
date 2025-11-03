'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ChevronDown, Heart, Search, ShoppingCart } from 'lucide-react';
import useSolarStore from './useSolarStore';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductGridSkeleton from './ProductGridSkeleton';

const Products = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);
  const [changeDiv, setChangeDiv] = useState(false);
  const [loading, setLoading] = useState(true);

  const { showProduct, setShowProduct, select, setSelect, minVal, maxVal } = useSolarStore();
  const { toggleCart } = useSolarStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const cartData = (id) => {
    if (localStorage.getItem("name")) {
      const existingData = JSON.parse(localStorage.getItem("name"));
      const filter = existingData.filter((v) => v.id === id);
      if (filter.length) {
        filter[0].qty = filter[0]["qty"] + 1;
        localStorage.setItem("name", JSON.stringify(existingData));
      } else {
        const updatedData = [...existingData, { id: id, qty: 1 }];
        localStorage.setItem("name", JSON.stringify(updatedData));
      }
    } else {
      const existingData = [];
      const updatedData = [...existingData, { id: id, qty: 1 }];
      localStorage.setItem("name", JSON.stringify(updatedData));
    }
  };

  const defaultValues = {
    minPrice: minVal,
    maxPrice: maxVal,
    filter: null,
    showProduct: "12",
    select: "date,desc",
  };

  useEffect(() => {
    const productCata = searchParams.get("product-cata") || defaultValues.filter;
    const min_price = searchParams.get("min-price") || defaultValues.minPrice;
    const max_price = searchParams.get("max-price") || defaultValues.maxPrice;
    const per_page = searchParams.get("per_page") || defaultValues.showProduct;
    const orderby = searchParams.get("orderby") || "date";
    const order = searchParams.get("order") || "desc";

    const fetchFilteredProducts = async () => {
      try {
        const categoryParam = productCata ? `&category=${productCata}` : "";
        const query = `https://solarhouse.pk/wp-json/wc/v3/products?parent=74${categoryParam}&min_price=${min_price}&max_price=${max_price}&per_page=${per_page}&orderby=${orderby}&order=${order}`;
        const response = await axios.get(query, {
          auth: {
            username: "ck_99f7a958b70ea5326b2620d11d1ab448903842f5",
            password: "cs_507c77fdcf49ed4b19fd444c23649a09dabffa97"
          }
        });
        setProducts(response.data);
        setTotalProducts(response.headers["x-wp-total"] || response.data.length);
      } catch (e) {
        console.error("Error fetching filtered products:", e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [searchParams]);

  if (loading) return <ProductGridSkeleton />;

  return (
    <div className='flex flex-col'>
      {/* Header */}
      <div className='my-1 py-1 grid grid-cols-1 md:grid-cols-2 items-center gap-4'>
        <p className='text-gray-800 text-[15px] md:ml-9'>Showing 1-{Math.min(showProduct, totalProducts)} of {totalProducts} results</p>
        <div className='flex items-center justify-end gap-2 md:gap-4 mx-2'>
          <p className='[&>*]:p-1 gap-2 flex items-center justify-center text-sm md:text-base'>
            Show
            <span className={`${showProduct === "12" ? "border-black border-b-2" : ""} cursor-pointer hover:text-blue-500`} onClick={() => setShowProduct("12")}>12</span>
            <span className={`${showProduct === "15" ? "border-black border-b-2" : ""} cursor-pointer hover:text-blue-500`} onClick={() => setShowProduct("15")}>15</span>
            <span className={`${showProduct === "30" ? "border-black border-b-2" : ""} cursor-pointer hover:text-blue-500`} onClick={() => setShowProduct("30")}>30</span>
          </p>

          <div className="relative inline-flex items-center">
            <select onChange={(e) => setSelect(e.target.value)} className="appearance-none flex items-center justify-center px-3 md:px-4 py-2 pr-8 rounded-3xl border-2 border-gray-200 text-gray-700 font-semibold bg-white cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-200 text-sm md:text-base">
              <option value="date,desc">Default Sorting</option>
              <option value="popularity,desc">Sort by popularity</option>
              <option value="rating,desc">Sort by average rating</option>
              <option value="price,desc">Price: high to low</option>
              <option value="price,asc">Price: low to high</option>
            </select>
            <ChevronDown className="absolute right-3 text-gray-500 pointer-events-none group-hover:text-blue-500 transition duration-200" />
          </div>

          {/* Change Div - Hidden on Mobile */}
          <div onClick={() => setChangeDiv(false)} className={`hidden md:block ${changeDiv ? "border-gray-200" : "bg-blue-500 stroke-white border-blue-500"} px-2 py-3 rounded-full border-1 stroke-black hover:cursor-pointer`}>
            <svg width="30" height="20" viewBox="0 0 50 48" fill="none">
              <path d="M25 1H1V22H25V1Z" strokeWidth="3" />
              <path d="M52 1H28V22H52V1Z" strokeWidth="3" />
              <path d="M52 26H28V47H52V26Z" strokeWidth="3" />
              <path d="M25 26H1V47H25V26Z" strokeWidth="3" />
            </svg>
          </div>
          <div onClick={() => setChangeDiv(true)} className={`hidden md:block ${changeDiv ? "bg-blue-500 stroke-white border-blue-500" : "border-gray-200"} px-2 py-3 rounded-full border-1 stroke-black hover:cursor-pointer`}>
            <svg width="30" height="20" viewBox="0 0 50 48" fill="none">
              <path d="M19 1H1V17H19V1Z" strokeWidth="3" />
              <path d="M19 23H1V39H19V23Z" strokeWidth="3" />
              <path d="M31 4H50M31 15H50" strokeWidth="3" />
              <path d="M31 28H50M31 39H50" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`${changeDiv ? "hidden md:grid md:grid-cols-1 my-1" : "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8 my-6"} mx-2 md:mx-4`}>
        {products.map(value => (
          <div key={value.id} className={`${changeDiv ? "grid grid-cols-[30%_auto] gap-4 my-3 h-[250px] md:h-[300px]" : "h-[300px] md:h-[400px] w-full"} group relative overflow-hidden rounded-md cursor-pointer transition-all duration-300 hover:shadow-sm`}>
            <div className={`${changeDiv ? "flex items-center justify-center h-full" : "relative h-[60%] md:h-[70%]"} w-full overflow-hidden`}>
              <Image onClick={() => { router.push(`/product/${value.slug}`) }} unoptimized src={value.images[0]?.src || "/image1.jpg"} alt={value.images[0]?.alt || "products image"} priority width={256} height={0} className={`${changeDiv ? "rounded-2xl" : ""} object-cover w-full h-full group-hover:scale-105 transition-transform duration-500`} />

              <div className={`${changeDiv ? "hidden md:flex" : "flex"} absolute top-3 right-3 flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500`}>
                <button className="bg-white hover:bg-red-500 cursor-pointer p-2.5 rounded-full shadow-md transform hover:scale-105 transition-all duration-300" aria-label="Add to wishlist">
                  <Heart size={18} className="text-red-500 hover:text-white transition-colors" />
                </button>
                <button className="bg-white hover:bg-gray-700 cursor-pointer p-2.5 rounded-full shadow-md transform hover:scale-105 transition-all duration-300" aria-label="Quick view">
                  <Search size={18} className="text-gray-700 hover:text-white transition-colors" />
                </button>
              </div>

              <div onClick={toggleCart} className={`${changeDiv ? "hidden md:block" : "block"} absolute bg-white hover:bg-blue-400 rounded-tl-2xl bottom-0 p-2 pb-3 right-0 pr-3 opacity-0 translate-y-5 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200`}>
                <button className="bg-black hover:bg-gray-900 text-white p-2 rounded-full shadow cursor-pointer transition-colors" onClick={() => cartData(value.id)} aria-label="Add to cart">
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>

            <div className={`${changeDiv ? "flex flex-col justify-center" : ""} px-2 py-2 md:py-4`}>
              <h3 className={`${changeDiv ? "text-sm md:text-lg" : "text-sm md:text-lg"} font-semibold text-gray-700 leading-normal hover:text-blue-500 transition-colors line-clamp-2 cursor-pointer`}>{value.name || "Products"}</h3>
              <p className={`${changeDiv ? "text-xs md:text-base" : "text-xs md:text-base"} text-gray-600 font-medium mt-1`}>RS {value.price || "0"}</p>

              {changeDiv && (
                <button onClick={(e) => { e.stopPropagation(); toggleCart(); cartData(value.id); }} className="md:hidden mt-3 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors">
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products