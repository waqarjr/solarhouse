import { useState } from "react";

export default function PriceRange() {
  const [minValue, setMinValue] = useState(160);
  const [maxValue, setMaxValue] = useState(60000);

  const min = 160;
  const max = 60000;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 500); // prevent overlap
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 500); // prevent overlap
    setMaxValue(value);
  };

  return (
    <div className="flex flex-col overflow-hidden transition-all duration-200 ease-in-out max-h-96 opacity-100 px-2 py-4">
      {/* Range container */}
      <div className="relative w-full flex items-center justify-center pointer-events-none">
        {/* Track */}
        <div className="absolute h-2 bg-gray-200 rounded-full w-full" />

        {/* Active (selected) range */}
        <div
          className="absolute h-2 bg-blue-500 rounded-full"
          style={{
            left: `${((minValue - min) / (max - min)) * 100}%`,
            right: `${100 - ((maxValue - min) / (max - min)) * 100}%`,
          }}
        />

        {/* Min handle */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-auto
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-blue-500
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-md
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500"
        />

        {/* Max handle */}
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-auto
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-blue-500
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-md
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500"
        />
      </div>

      {/* Values */}
      <div className="mt-3">
        <p className="text-gray-700 py-1">
          Min Price: <span className="text-blue-500 font-semibold">{minValue}</span>
        </p>
        <p className="text-gray-700 py-1">
          Max Price: <span className="text-blue-500 font-semibold">{maxValue}</span>
        </p>
      </div>
    </div>
  );
}
