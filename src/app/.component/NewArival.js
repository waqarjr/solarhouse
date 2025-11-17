'use client'
import { Heart, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import useStoreData from "@/app/lib/useStoreData";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/app/lib/cartUtils';
import { 
  toggleWishlist as toggleWishlistItem, 
  getWishlistIds 
} from '@/app/lib/wishlistUtils';

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
              <div key={product.id} className="h-auto w-full group shadow-md relative overflow-hidden rounded-md cursor-pointer transition-all duration-300">
                <div className="relative w-full h-[200px] sm:h-[220px] lg:h-[256px] overflow-hidden">
                  <Image onClick={() => router.push(`/product/${product.slug}`)} unoptimized src={product?.images[0]?.src || "/image1.jpg"} alt={product?.images[0]?.alt || product?.name || "product image"} priority fill className="object-cover group-hover:scale-105 transition-transform duration-500" />

                  {/* Hover Icons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button onClick={() => handleWishlistToggle(product.id)} className={`${isInWishlist(product.id) ? 'bg-red-500' : 'bg-white hover:bg-red-500'} cursor-pointer p-2 rounded-full shadow opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 group`}>
                      <Heart size={18} className={`${isInWishlist(product.id) ? 'text-white bg-red-500 fill-current' : 'group-hover:text-red-500 '}`} />
                    </button>
                    <button className="bg-white hover:bg-gray-700 cursor-pointer p-2 rounded-full shadow opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <Search size={18} className="text-gray-700 hover:text-white" />
                    </button>
                  </div>

                  {/* Cart Button */}
                  <div onClick={() => handleAddToCart(product.id)} className="absolute bg-blue-600 rounded-tl-2xl bottom-0 p-2 pb-3 right-0 pr-3 opacity-0 translate-y-5 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="bg-black text-white p-2 rounded-full shadow cursor-pointer">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="px-2 py-4 h-auto">
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
  );
}

export default NewArival;