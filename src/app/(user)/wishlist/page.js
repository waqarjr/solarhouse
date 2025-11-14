'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight, Trash2, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useStoreData from '@/app/lib/useStoreData';
import WishlistSkeleton from "./WishlistSkeleton ";
import api from '@/app/lib/api';
import Swal from 'sweetalert2';

const WishlistPage = () => {
  const { wishlist, toggleWishlist, toggleCart } = useStoreData();
  const [wish , setWish] = useState([]);
  const [emptyWishlist, setEmptyWishlist] = useState(false);
  const [loading, setLoading] = useState(true);

  const alertSwal = ()=>{
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    Toast.fire({
      icon: `success`,
      title: `product added to cart successfully`,
    });
  }


  useEffect(() => {
    const getData = async (string) => {
      try {
        const response = await api.get(`/products?include=${string}`);
        setWish(response.data);
      } catch (e) {
        console.error(e.message);
        setEmptyWishlist(true);
      } finally {
        setLoading(false);
      }
    };

    const storageData = localStorage.getItem("wishlist");
    console.log(storageData);
    if (storageData) {
      const jsonObject = JSON.parse(storageData);
      const idData = jsonObject.map((v) => v.id);
      if (!idData.length) {
        setEmptyWishlist(true);
        setLoading(false);
        return;
      }

      const string = idData.join(",");
      getData(string);
    } else {
      setEmptyWishlist(true);
      setLoading(false);
    }
  }, [wishlist]);

  const removeFromWishlist = (id) => {
    const existingData = JSON.parse(localStorage.getItem("wishlist"));
    const filter = existingData.filter((v) => v.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(filter));
    setWish(filter);
    toggleWishlist();
  };


  const addToCart = (id) => {
    // Add to cart logic
    if (localStorage.getItem("name")) {
      const existingData = JSON.parse(localStorage.getItem("name"));
      const filter = existingData.filter((v) => v.id === id);
      if (filter.length) {
        filter[0].qty = filter[0]["qty"] + 1;
        localStorage.setItem("name", JSON.stringify(existingData));
        removeFromWishlist(id);
        toggleCart();
        alertSwal();
      } else {
        const updatedData = [...existingData, { id: id, qty: 1 }];
        localStorage.setItem("name", JSON.stringify(updatedData));
        removeFromWishlist(id);
        toggleCart();
        alertSwal();
      }
    } else {
      const existingData = [];
      const updatedData = [...existingData, { id: id, qty: 1 }];
      localStorage.setItem("name", JSON.stringify(updatedData));
      removeFromWishlist(id);
      toggleCart();
      alertSwal();
    }

  };

  if (loading) {
    return <WishlistSkeleton />;
  }

  if (emptyWishlist) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 sm:mb-6">
            <Link href="/"><span className="hover:text-gray-900 cursor-pointer">Home</span></Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Wishlist</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Wishlist</h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-pink-500 rounded-lg shadow-sm p-8 sm:p-12 lg:p-16">
            <div className="flex flex-col items-center justify-center text-center gap-6 sm:gap-8">
              <Heart className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-white stroke-[1.5]" />
              <p className="text-white text-base sm:text-lg md:text-xl font-light">
                Your wishlist is currently empty.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center my-6 sm:my-8">
            <Link href="/shop">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-md transition-colors duration-200 text-sm sm:text-base">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 sm:mb-6">
            <Link href="/"><span className="hover:text-gray-900 cursor-pointer">Home</span></Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Wishlist</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Wishlist</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="w-full">
          {/* Table Header - Hidden on mobile and tablet */}
          <div className="hidden lg:grid lg:grid-cols-12 bg-gray-200 gap-4 rounded-t-lg px-6 py-4 font-semibold text-gray-700">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Price</div>
            <div className="col-span-2 text-center">Action</div>
            <div className="col-span-1 text-center">Remove</div>
          </div>

          {/* Wishlist Items */}
          <div className="space-y-4 lg:space-y-0">
            {wish.map((item, id) => (
              <div key={id} className="bg-white rounded-lg lg:rounded-t-none lg:rounded-b-lg shadow-sm border border-gray-200 lg:border-t-0">
                <div className="p-4 sm:p-5 lg:p-6">
                  {/* Mobile & Tablet Layout */}
                  <div className="lg:hidden space-y-4">
                    <div className="flex gap-3 sm:gap-4">
                      <Image src={item?.images?.[0]?.src || "/placeholder.jpg"} 
                        alt={item?.name || "Product"} width={80} height={80} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg bg-gray-100 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-lg sm:text-xl font-bold text-gray-900">
                          Rs {item.price}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t">
                      <button   onClick={() => addToCart(item.id)}  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                        Add to Cart
                      </button>
                      
                      <button onClick={() => removeFromWishlist(item.id)}  className="text-red-600 hover:text-red-700 p-2.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                        <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
                    <div className="col-span-6 flex gap-4">
                      <Image  src={item?.images?.[0]?.src || "/placeholder.jpg"} alt={item?.name || "Product"} 
                        width={96}  height={96}  className="w-24 h-24 object-cover rounded-lg bg-gray-100 flex-shrink-0"  />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-base line-clamp-2">
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    <div className="col-span-3 text-center">
                      <span className="font-bold text-gray-900 text-lg">Rs {item.price}</span>
                    </div>

                    <div className="col-span-2 flex justify-center">
                      <button  onClick={() => addToCart(item.id)} 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                    </div>

                    <div className="col-span-1 flex justify-center">
                      <button onClick={() => removeFromWishlist(item.id)} 
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;