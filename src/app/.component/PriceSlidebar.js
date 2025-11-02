'use client'
import { useState, useEffect } from "react";
import useStoreData from "../lib/useStoreData";

export default function PriceSlidebar({ onClose }) {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice } = useStoreData();
  const [minValue, setMinValue] = useState(minPrice || 160);
  const [maxValue, setMaxValue] = useState(maxPrice || 60000);
  useEffect(() => {
    setMinValue(minPrice || minValue);
    setMaxValue(maxPrice || maxValue);
  }, [minPrice, maxPrice]);

  const min = minPrice || 160;
  const max = maxPrice || 60000;
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 500);
    setMinValue(value);
    setMinPrice(value);
  };
  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 500);
    setMaxValue(value);
    setMaxPrice(value);
  };
  return (
    <div className="flex flex-col overflow-hidden transition-all duration-200 ease-in-out max-h-96 opacity-100 px-2 py-4">
      <div className="relative w-full flex items-center justify-center pointer-events-none">
        <div className="absolute h-2 bg-gray-200 rounded-full w-full" />
        <div className="absolute h-2 bg-blue-500 rounded-full" style={{ left: `${((minValue - min) / (max - min)) * 100}%`, right: `${100 - ((maxValue - min) / (max - min)) * 100}%` }} />
        <input type="range" min={min} max={max} value={maxValue} onChange={handleMinChange} className="absolute w-full appearance-none bg-transparent pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500" />
        <input type="range" min={min} max={max} value={minValue} onChange={handleMaxChange} className="absolute w-full appearance-none bg-transparent pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500" />
      </div>
      <div className="mt-3">
        <p className="text-gray-700 py-1">Min Price: <span className="text-blue-500 font-semibold">{minValue}</span></p>
        <p className="text-gray-700 py-1">Max Price: <span className="text-blue-500 font-semibold">{maxValue}</span></p>
        <div className="mt-3 flex gap-2">
          <button onClick={() => { setMinPrice(minValue); setMaxPrice(maxValue); if (onClose) onClose(); }} className="px-4 py-2 bg-blue-500 text-white rounded">Apply</button>
          <button onClick={() => { setMinPrice(defaultValues.minPrice); setMaxPrice(defaultValues.maxPrice); if (onClose) onClose(); }} className="px-4 py-2 bg-gray-200 rounded">Reset</button>
        </div>
      </div>
    </div>
  );
}
