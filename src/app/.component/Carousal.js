"use client"
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Carousal = ()=> {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/banner-1.jpg'
    },
    {
      id: 2,
      image: 'solar-invertor-banner.jpg'
    },
    {
      id: 3,
      image: '/banner-1.jpg'
    },
    {
      id: 4,
      image: 'solar-invertor-banner.jpg'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(()=>{
    setInterval(()=>{
      nextSlide();
    },5000)
  },[])

  return (
    <div className="p-4">
      <div className="w-full">
        {/* Carousel Container */}
        <div className="relative h-[600px] rounded-md overflow-hidden ">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div key={slide.id} className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                index === currentSlide ? 'opacity-100 translate-x-0': index < currentSlide ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
              }`}>
              <div className={`w-full h-full bg-cover bg-center  flex items-center justify-center`} style={{ backgroundImage: `url(${slide.image})` }} >
              </div>
            </div>
          ))}
    
          {/* Previous Button */}
          <button onClick={prevSlide}
            className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Previous slide">
            <ChevronLeft size={24} className='text-black'  />
          </button>

          {/* Next Button */}
          <button onClick={nextSlide}
            className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Next slide">
            <ChevronRight size={24} className='text-black' />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide ? 'bg-white w-8 h-3' : 'bg-white/50 hover:bg-white/75 w-3 h-3' }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Carousal;