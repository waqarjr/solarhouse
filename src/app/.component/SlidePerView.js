'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function SlidePerView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    { id: 1, title: 'Inverters', image: '/inverter.png' },
    { id: 2, title: 'Solar Panels', image: '/solarpanels.jpg' },
    { id: 3, title: 'Lithium Batteries', image: '/solar-batteries.webp' },
    { id: 4, title: 'VP Protectors', image: '/vaprotectors.webp' },
  ];

  // Create infinite loop by duplicating slides
  const extendedSlides = [...slides, ...slides, ...slides];
  const startIndex = slides.length;

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) setSlidesPerView(3); 
      else if (window.innerWidth >= 640) setSlidesPerView(2);
      else setSlidesPerView(1);
    };

    updateSlidesPerView(); 
    window.addEventListener('resize', updateSlidesPerView);
    setMounted(true);
    setCurrentIndex(startIndex);

    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, [startIndex]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    if (currentIndex >= startIndex + slides.length) {
      setCurrentIndex(startIndex);
    } else if (currentIndex < startIndex) {
      setCurrentIndex(startIndex + slides.length - 1);
    }
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(startIndex + index);
  };

  if (!mounted) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 sm:p-8 bg-gray-50">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Shop by Categories</h1>
        </div>

        <div className="relative px-12 sm:px-16">
          <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 bg-white text-gray-900 hover:bg-gray-100 hover:scale-110 shadow-lg" aria-label="Previous slides">
            <ChevronLeft size={24} />
          </button>

          <div className="overflow-hidden">
            <div className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`} style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }} onTransitionEnd={handleTransitionEnd}>
              {extendedSlides.map((slide, index) => (
                <div key={`${slide.id}-${index}`} className="flex-shrink-0 px-2 sm:px-3" style={{ width: `${100 / slidesPerView}%` }}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group border border-gray-200">
                    <div className="relative h-48 sm:h-56  flex items-center justify-center overflow-hidden">
                      <Image src={slide.image} alt={slide.title} width={300} height={300} className="object-contain w-full h-full p-4 group-hover:scale-110 transition-transform duration-300" unoptimized />
                    </div>

                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg text-center sm:text-xl font-bold text-gray-800 mb-2">{slide.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 bg-white text-gray-900  hover:scale-110 shadow-lg" aria-label="Next slides">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="flex gap-2">
            {slides.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`transition-all duration-300 rounded-full ${(currentIndex - startIndex) % slides.length === index ? 'bg-blue-500 w-8 h-2' : 'bg-gray-400 hover:bg-gray-500 w-2 h-2'}`} aria-label={`Go to slide ${index + 1}`} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}