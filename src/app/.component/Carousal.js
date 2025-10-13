"use client"
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Carousal = ()=> {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Mountain Adventure',
      description: 'Explore breathtaking mountain landscapes',
      bg: 'bg-gradient-to-br from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Ocean Paradise',
      description: 'Discover pristine beaches and crystal waters',
      bg: 'bg-gradient-to-br from-cyan-500 to-blue-600'
    },
    {
      id: 3,
      title: 'Desert Sunset',
      description: 'Experience the magic of golden sands',
      bg: 'bg-gradient-to-br from-orange-500 to-red-600'
    },
    {
      id: 4,
      title: 'Forest Escape',
      description: 'Immerse yourself in nature\'s serenity',
      bg: 'bg-gradient-to-br from-green-500 to-emerald-600'
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

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Carousel Container */}
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <div className={`w-full h-full ${slide.bg} flex items-center justify-center`}>
                <div className="text-center text-white px-8">
                  <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-xl opacity-90">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'bg-white w-8 h-3'
                    : 'bg-white/50 hover:bg-white/75 w-3 h-3'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Info Text */}
        <div className="text-center mt-8 text-gray-400">
          <p className="text-sm">
            Slide {currentSlide + 1} of {slides.length}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Carousal;