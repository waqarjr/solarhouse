'use client'
import { useState, useRef, useEffect } from 'react';
import useStoreData from '../lib/useStoreData';

export default function DualRangeSlider() {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice, minVal, maxVal, minGap } = useStoreData();

  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const [isLoading, setIsLoading] = useState(true);

  const rangeRef = useRef(null);

  // Check if API values are loaded
  useEffect(() => {
    if (minVal !== undefined && maxVal !== undefined && minPrice !== undefined && maxPrice !== undefined) {
      setLocalMin(minPrice);
      setLocalMax(maxPrice);
      setIsLoading(false);
    }
  }, [minVal, maxVal, minPrice, maxPrice]);

  // Update the active range bar position
  useEffect(() => {
    if (!isLoading && rangeRef.current) {
      const minPercent = ((localMin - minVal) / (maxVal - minVal)) * 100;
      const maxPercent = ((localMax - minVal) / (maxVal - minVal)) * 100;
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [localMin, localMax, minVal, maxVal, isLoading]);

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= localMax - minGap) {
      setLocalMin(value);
    }
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= localMin + minGap) {
      setLocalMax(value);
    }
  };

  const handleMouseUp = () => {
    setMinPrice(localMin);
    setMaxPrice(localMax);
  };

  const formatPrice = (price) => `Rs ${price.toLocaleString()}`;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">Loading price range...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full grid grid-cols-1 gap-5">
        <div className="relative h-8">
          {/* Slider Track Background */}
          <div className="absolute w-full h-2 bg-gray-200 rounded-lg top-1/2 -translate-y-1/2"></div>
          
          {/* Active Range Track */}
          <div
            ref={rangeRef}
            className="absolute h-2 bg-gradient-to-r from-blue-300 to-blue-600 rounded-lg top-1/2 -translate-y-1/2 transition-all duration-150"
          ></div>

          {/* Min Range Input */}
          <input
            type="range"
            min={minVal}
            max={maxVal}
            value={localMin}
            onChange={handleMinChange}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            className="absolute w-full h-0 bg-transparent rounded-lg appearance-none cursor-pointer pointer-events-none 
            [&::-webkit-slider-thumb]:pointer-events-auto 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-5 
            [&::-webkit-slider-thumb]:h-5 
            [&::-webkit-slider-thumb]:bg-blue-500 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:hover:bg-blue-600 
            [&::-webkit-slider-thumb]:cursor-pointer 
            [&::-webkit-slider-thumb]:shadow-lg 
            [&::-webkit-slider-thumb]:border-2 
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:pointer-events-auto 
            [&::-moz-range-thumb]:appearance-none 
            [&::-moz-range-thumb]:w-5 
            [&::-moz-range-thumb]:h-5 
            [&::-moz-range-thumb]:bg-blue-500 
            [&::-moz-range-thumb]:rounded-full 
            [&::-moz-range-thumb]:cursor-pointer 
            [&::-moz-range-thumb]:shadow-lg 
            [&::-moz-range-thumb]:border-2 
            [&::-moz-range-thumb]:border-white 
            [&::-moz-range-thumb]:border-none"
          />

          {/* Max Range Input */}
          <input
            type="range"
            min={minVal}
            max={maxVal}
            value={localMax}
            onChange={handleMaxChange}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            className="absolute w-full h-0 bg-transparent rounded-lg appearance-none cursor-pointer pointer-events-none 
            [&::-webkit-slider-thumb]:pointer-events-auto 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-5 
            [&::-webkit-slider-thumb]:h-5 
            [&::-webkit-slider-thumb]:bg-blue-500 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:hover:bg-blue-600 
            [&::-webkit-slider-thumb]:cursor-pointer 
            [&::-webkit-slider-thumb]:shadow-lg 
            [&::-webkit-slider-thumb]:border-2 
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:pointer-events-auto 
            [&::-moz-range-thumb]:appearance-none 
            [&::-moz-range-thumb]:w-5 
            [&::-moz-range-thumb]:h-5 
            [&::-moz-range-thumb]:bg-blue-500 
            [&::-moz-range-thumb]:rounded-full 
            [&::-moz-range-thumb]:cursor-pointer 
            [&::-moz-range-thumb]:shadow-lg 
            [&::-moz-range-thumb]:border-2 
            [&::-moz-range-thumb]:border-white 
            [&::-moz-range-thumb]:border-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Min Price:</p>
            <p className="font-semibold text-blue-600">{formatPrice(minPrice)}</p>
          </div>
          <div className="text-gray-400">━</div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Max Price:</p>
            <p className="font-semibold text-blue-600">{formatPrice(maxPrice)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}