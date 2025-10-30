'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import api from '@/app/lib/api';
import { useRouter } from 'next/navigation';

export default function ProductSlider() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [loading , setLoading ] = useState(true);
  const router = useRouter();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/products`);
        setProducts(response.data || []);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle responsive slides per view
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) setSlidesPerView(4); // lg
      else if (window.innerWidth >= 768) setSlidesPerView(3); // md
      else if (window.innerWidth >= 640) setSlidesPerView(2); // sm
      else setSlidesPerView(1);
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    setMounted(true);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const maxIndex = Math.max(0, products.length - slidesPerView);
  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  const nextSlide = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const toggleCart = () => {};
  const cartData = (id) => console.log('Add to cart:', id);

  if (loading) {
    return (<>
        <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 animate-pulse">
            <div className="h-8 sm:h-10 bg-gray-300 rounded-md w-64 sm:w-80 mx-auto mb-2"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
            <div key={i} className="group relative overflow-hidden rounded-md cursor-pointer h-[350px] sm:h-[400px] w-full bg-white animate-pulse shadow-sm"
            >
                <div className="relative h-[70%] w-full overflow-hidden bg-gray-200" />

                <div className="px-3 py-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
            ))}
        </div>
        </div>
    </>);
}

  return (
    <div className="flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-7xl relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">Featured Products</h1>
        </div>

        <button onClick={prevSlide} disabled={!canGoPrev} className={`absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
          canGoPrev ? 'bg-white text-gray-900 hover:bg-gray-100 hover:scale-110 shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'}`}
          aria-label="Previous slides">
          <ChevronLeft size={24} />
        </button>

        <div className="overflow-hidden">
          <div  className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}>
            {products.map((value) => (
              <div key={value.id} className="flex-shrink-0 px-2 sm:px-3" style={{ width: `${100 / slidesPerView}%` }} >
                <div className="group relative overflow-hidden rounded-md cursor-pointer transition-all duration-300 hover:shadow-sm h-[350px] sm:h-[400px] w-full max-w-[300px] mx-auto bg-white">
                  
                  <div className="relative h-[70%] w-full overflow-hidden">
                    <Image onClick={() => router.push(`/product/${value.slug}`)}
                      unoptimized src={value.images?.[0]?.src || '/image1.jpg'} alt={value.images?.[0]?.alt || 'product image'} priority width={256} height={0} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"/>
                    
                    <div className="flex absolute top-3 right-3 flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <button className="bg-white hover:bg-red-500 cursor-pointer p-2.5 rounded-full shadow-md transform hover:scale-105 transition-all duration-300"
                        aria-label="Add to wishlist" >
                        <Heart size={18} className="text-red-500 hover:text-white transition-colors" />
                      </button>
                      <button className="bg-white hover:bg-gray-700 cursor-pointer p-2.5 rounded-full shadow-md transform hover:scale-105 transition-all duration-300"
                        aria-label="Quick view">
                        <Search size={18} className="text-gray-700 hover:text-white transition-colors" />
                      </button>
                    </div>

                    <div onClick={toggleCart}className="absolute bg-white hover:bg-blue-400 rounded-tl-2xl bottom-0 p-2 pb-3 right-0 pr-3 opacity-0 translate-y-5 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <button className="bg-black hover:bg-gray-900 text-white p-2 rounded-full shadow cursor-pointer transition-colors"
                        onClick={() => cartData(value.id)} aria-label="Add to cart">
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="px-2 py-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-700 leading-normal hover:text-blue-500 transition-colors line-clamp-2 cursor-pointer"
                      onClick={() => router.push(`/product/${value.slug}`)}>
                      {value.name || 'Product'}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 font-medium mt-1">
                      RS {value.price || '0'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={nextSlide} disabled={!canGoNext} className={`absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
            canGoNext ? 'bg-white text-gray-900 hover:bg-gray-100 hover:scale-110 shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
          }`} aria-label="Next slides">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
