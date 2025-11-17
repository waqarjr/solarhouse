'use client'
import { Heart, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import useStoreData from "@/app/lib/useStoreData";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/app/lib/cartUtils';
import {  toggleWishlist as toggleWishlistItem,   getWishlistIds } from '@/app/lib/wishlistUtils';

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

const NewArival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const { toggleCart, toggleWishlist } = useStoreData();
  const router = useRouter();

  const alertSwal = (icons, data) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    Toast.fire({
      icon: icons,
      title: data,
    });
  };

  useEffect(() => {
    const wishlistIds = getWishlistIds();
    setWishlistItems(wishlistIds);
  }, []);

  const isInWishlist = (id) => {
    return wishlistItems.includes(id);
  };

  const handleAddToCart = (productId) => {
    const result = addToCart(productId);
    
    if (result.success) {
      toggleCart();
      alertSwal("success", result.message);
    } else {
      alertSwal("error", result.message);
    }
  };

  const handleWishlistToggle = (productId) => {
    const result = toggleWishlistItem(productId);
    
    if (result.success) {
      setWishlistItems(result.wishlistItems.map(item => item.id));
      toggleWishlist();
      
      if (result.isAdded) {
        alertSwal("success", "Product added to wishlist successfully");
      } else {
        alertSwal("error", "Product removed from wishlist");
      }
    } else {
      alertSwal("error", result.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/products", {
          params: { per_page: 8, orderby: 'date', order: 'desc' }
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

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
            products.map((product) => (
              <div key={product.id} className="h-[300px] md:h-[400px] w-full group relative overflow-hidden rounded-md cursor-pointer transition-all duration-300 hover:shadow-sm">
                <div className="relative h-[60%] md:h-[70%] w-full overflow-hidden">
                  <Image
                    onClick={() => router.push(`/product/${product.slug}`)}
                    unoptimized
                    src={product?.images[0]?.src || "/image1.jpg"}
                    alt={product?.images[0]?.alt || product?.name || "product image"}
                    priority
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button
                      onClick={() => handleWishlistToggle(product.id)}
                      className={`${isInWishlist(product.id) ? 'bg-red-500' : 'bg-white hover:bg-red-500'} cursor-pointer p-2.5 rounded-full shadow-md transform hover:scale-105 transition-all duration-300`}
                      aria-label="Add to wishlist"
                    >
                      <Heart size={18} className={`${isInWishlist(product.id) ? 'text-white fill-current' : ' group-hover:text-red-500'} transition-colors`} />
                    </button>

                    <button className="bg-white hover:bg-gray-700 cursor-pointer p-2.5 rounded-full shadow-md transform hover:scale-105 transition-all duration-300" aria-label="Quick view">
                      <Search size={18} className="text-gray-700 hover:text-white transition-colors" />
                    </button>
                  </div>

                  <div className="absolute bg-white hover:bg-blue-400 rounded-tl-2xl bottom-0 p-2 pb-3 right-0 pr-3 opacity-0 translate-y-5 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    <button
                      className="bg-black hover:bg-gray-900 text-white p-2 rounded-full shadow cursor-pointer transition-colors"
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product.id); }}
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>

                <div className="px-2 py-2 md:py-4">
                  <h3 className="text-sm md:text-lg font-semibold text-gray-700 leading-normal hover:text-blue-500 transition-colors line-clamp-2">
                    {product?.name || "Products"}
                  </h3>
                  <p className="text-xs md:text-base text-gray-600 font-medium mt-1">
                    RS {product?.price || "0"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NewArival;