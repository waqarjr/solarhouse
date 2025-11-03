'use client'
import { useState, useEffect } from "react";
import useSolarStore from "./useSolarStore";

export default function PriceRange() {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice, minVal, maxVal } = useSolarStore();
  
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  useEffect(() => {
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
  }, [minPrice, maxPrice]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), localMaxPrice - 1000);
    setLocalMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), localMinPrice + 1000);
    setLocalMaxPrice(value);
  };

  const handleMouseUp = () => {
    setMinPrice(localMinPrice);
    setMaxPrice(localMaxPrice);
  };

  return (
    <div className="flex flex-col overflow-hidden transition-all duration-200 ease-in-out max-h-96 opacity-100 px-2 py-4">
      <div className="relative w-full flex items-center justify-center pointer-events-none mb-8">
        <div className="absolute h-2 bg-gray-200 rounded-full w-full" />
        <div className="absolute h-2 bg-blue-500 rounded-full" style={{ left: `${((localMinPrice - minVal) / (maxVal - minVal)) * 100}%`, right: `${100 - ((localMaxPrice - minVal) / (maxVal - minVal)) * 100}%` }} />

        <input type="range" min={minVal} max={maxVal} value={localMinPrice} onChange={handleMinChange} onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp} className="absolute w-full appearance-none bg-transparent pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer" />

        <input type="range" min={minVal} max={maxVal} value={localMaxPrice} onChange={handleMaxChange} onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp} className="absolute w-full appearance-none bg-transparent pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer" />
      </div>

      <div className="mt-3">
        <p className="text-gray-700 py-1">Min Price: <span className="text-blue-500 font-semibold">Rs {localMinPrice}</span></p>
        <p className="text-gray-700 py-1">Max Price: <span className="text-blue-500 font-semibold">Rs {localMaxPrice}</span></p>
      </div>
    </div>
  );
}