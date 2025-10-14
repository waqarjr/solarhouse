'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function SlidePerView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) setSlidesPerView(4); // lg
      else if (window.innerWidth >= 768) setSlidesPerView(3); // md
      else if (window.innerWidth >= 640) setSlidesPerView(2); // sm
      else setSlidesPerView(1);
    };

    updateSlidesPerView(); // Run once on mount
    window.addEventListener('resize', updateSlidesPerView);

    setMounted(true); // mark client ready

    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const slides = [
    { id: 1, title: 'Premium Product 1', price: '$299', rating: 4.8, image: 'bg-gradient-to-br from-pink-400 to-purple-500' },
    { id: 2, title: 'Premium Product 2', price: '$399', rating: 4.9, image: 'bg-gradient-to-br from-blue-400 to-cyan-500' },
    { id: 3, title: 'Premium Product 3', price: '$199', rating: 4.7, image: 'bg-gradient-to-br from-green-400 to-emerald-500' },
    { id: 4, title: 'Premium Product 4', price: '$499', rating: 5.0, image: 'bg-gradient-to-br from-orange-400 to-red-500' },
    { id: 5, title: 'Premium Product 5', price: '$349', rating: 4.6, image: 'bg-gradient-to-br from-indigo-400 to-purple-500' },
    { id: 6, title: 'Premium Product 6', price: '$279', rating: 4.8, image: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
    { id: 7, title: 'Premium Product 7', price: '$599', rating: 4.9, image: 'bg-gradient-to-br from-teal-400 to-blue-500' },
    { id: 8, title: 'Premium Product 8', price: '$449', rating: 4.7, image: 'bg-gradient-to-br from-rose-400 to-pink-500' }
  ];

  const maxIndex = Math.max(0, slides.length - slidesPerView);
  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  const nextSlide = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center p-4 sm:p-8 bg-blue-400">
      <div className="w-full max-w-7xl bg-green-300">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">Shop by Categories</h1>
        </div>

        {/* Carousel */}
        <div className="relative px-12 sm:px-16">
          {/* Prev Button */}
          <button onClick={prevSlide} disabled={!canGoPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
              canGoPrev ? 'bg-white text-gray-900 hover:bg-gray-100 hover:scale-110 shadow-lg'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50' }`}
            aria-label="Previous slides">
            <ChevronLeft size={24} />
          </button>

          {/* Slides */}
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}>
              {slides.map((slide) => (
                <div key={slide.id} className="flex-shrink-0 px-2 sm:px-3" style={{ width: `${100 / slidesPerView}%` }}>
                  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                    {/* Image */}
                    <div className={`h-48 sm:h-56 ${slide.image} flex items-center justify-center`}>
                     
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg text-center sm:text-xl font-bold text-white mb-2 truncate">{slide.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
              canGoNext
                ? 'bg-white text-gray-900 hover:bg-gray-100 hover:scale-110 shadow-lg'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'
            }`}
            aria-label="Next slides"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'bg-blue-500 w-8 h-2'
                    : 'bg-gray-600 hover:bg-gray-500 w-2 h-2'
                }`}
                aria-label={`Go to slide group ${index + 1}`}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
