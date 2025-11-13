'use client'
import {  Heart, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import useStoreData from "@/app/lib/useStoreData";
import Swal from 'sweetalert2';

// Skeleton Component
const ProductSkeleton = () => (
  <div className="h-[350px] w-full group shadow-xl relative overflow-hidden rounded-md animate-pulse">
    <div className="relative w-full h-[256px] bg-gray-300"></div>
    <div className="px-2 py-4 bg-gray-200 h-auto">
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2 mt-2"></div>
    </div>
  </div>
);

const alertSwal = ()=>{
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          Toast.fire({
            icon: "success",
            title: "Product added to cart successfully",
          });
          lastAction.current = null;
}
const NewArival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
    const { toggleCart } = useStoreData();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products", {
        params: {
          per_page: 8,
          orderby: 'date',
          order: 'desc'
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }


const cartData = (id) => {
    if (localStorage.getItem("name")) {
      const existingData = JSON.parse(localStorage.getItem("name"));
      const filter = existingData.filter((v) => v.id === id);
      if (filter.length) {
        filter[0].qty = filter[0]["qty"] + 1;
        localStorage.setItem("name", JSON.stringify(existingData));
        toggleCart();
        alertSwal();
      } else {
        const updatedData = [...existingData, { id: id, qty: 1 }];
        localStorage.setItem("name", JSON.stringify(updatedData));
        toggleCart();
        alertSwal();
      }
    } else {
      const existingData = [];
      const updatedData = [...existingData, { id: id, qty: 1 }];
      localStorage.setItem("name", JSON.stringify(updatedData));
      toggleCart();
      alertSwal();
    }
  };


  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="flex items-center justify-center p-4 sm:p-8 ">
      <div className="w-full max-w-7xl ">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">New Arrivals</h1>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 my-6">
          {loading ? (
            new Array(8).fill(null).map((_, id) => (
              <ProductSkeleton key={id} />
            ))
          ) : (
            // Show actual products
            products.map((product) => (
              <div key={product.id} 
                className="h-auto w-full group shadow-md relative overflow-hidden rounded-md cursor-pointer transition-all duration-300">
                <div className="relative w-full h-[200px] sm:h-[220px] lg:h-[256px] overflow-hidden">
                  <Image unoptimized src={product?.images[0]?.src || "/image1.jpg"}
                    alt={product?.images[0]?.alt || product?.name || "product image"}
                    priority fill className="object-cover group-hover:scale-105 transition-transform duration-500" />

                  {/* Hover Icons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="bg-white hover:bg-red-500 cursor-pointer p-2 rounded-full shadow opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <Heart size={18} className="text-red-500 hover:text-white" />
                    </button>
                    <button className="bg-white hover:bg-gray-700 cursor-pointer p-2 rounded-full shadow opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <Search size={18} className="text-gray-700 hover:text-white" />
                    </button>
                  </div>

                  {/* Cart Button */}
                  <div onClick={() => cartData(product.id)} className="absolute bg-blue-600 rounded-tl-2xl bottom-0 p-2 pb-3 right-0 pr-3 opacity-0 translate-y-5 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="bg-black text-white p-2 rounded-full shadow cursor-pointer">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="px-2 py-4  h-auto">
                  <h3 className="font-semibold text-gray-700 text-sm sm:text-base leading-normal hover:text-blue-500 line-clamp-2">
                    {product?.name || "Product Name"}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    RS {product?.price || "0"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default NewArival