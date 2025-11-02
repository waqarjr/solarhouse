"use client"
import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      image: '/banner-1.jpg'
    },
    {
      id: 2,
      image: '/solar-invertor-banner.jpg'
    },
    {
      id: 3,
      image: '/banner-1.jpg'
    },
    {
      id: 4,
      image: '/solar-invertor-banner.jpg'
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <div className="p-2 md:p-4">
      <div className="w-full">
        {/* Carousel Container */}
        <div className="relative h-[300px] md:h-[500px] lg:h-[600px] rounded-md overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          {/* Slides */}
          {slides.map((slide, index) => (
            <div key={slide.id} className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 translate-x-0 z-10' : index < currentSlide ? 'opacity-0 -translate-x-full z-0' : 'opacity-0 translate-x-full z-0'}`}>
              <div className="w-full h-full bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${slide.image})` }}>
              </div>
            </div>
          ))}
    
          {/* Previous Button */}
          <button onClick={prevSlide} className="absolute cursor-pointer left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-200 hover:scale-110 z-20" aria-label="Previous slide">
            <ChevronLeft size={20} className='text-black md:w-6 md:h-6' />
          </button>

          {/* Next Button */}
          <button onClick={nextSlide} className="absolute cursor-pointer right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-200 hover:scale-110 z-20" aria-label="Next slide">
            <ChevronRight size={20} className='text-black md:w-6 md:h-6' />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`transition-all duration-300 rounded-full ${index === currentSlide ? 'bg-white w-6 md:w-8 h-2 md:h-3' : 'bg-white/50 hover:bg-white/75 w-2 md:w-3 h-2 md:h-3'}`} aria-label={`Go to slide ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;