import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const values = [
  {
    heading: "Solar Panel",
    p: "Explore top-quality solar panels built for maximum efficiency, durability, and savings—perfect for homes, businesses, and off-grid solutions.",
    image: "/banner.png",
    link: "/product-category/solar-inverter"
  },
  {
    heading: "Solar Inverter",
    p: "Efficient solar inverters that convert sunlight into usable power, ensuring smooth energy flow and maximum performance for your solar system.",
    image: "/banner1.png",
    link: "/product-category/solar-panels",
  },
  {
    heading: "VFD",
    p: "Enhance motor control with reliable Variable Frequency Drives, improving energy efficiency, performance.",
    image: "/banner3.png",
    link: "/product-category/battery"
  },
  {
    heading: "Voltage Protector",
    p: "Protect your appliances from voltage spikes and fluctuations with smart voltage protectors designed for safety, reliability.",
    image: "/banner4.png",
    link: "/product-category/va-protectors"
  }
];

const RowImage = () => {
  return (
    <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 my-6 px-4 sm:px-6 lg:px-4'>
      {values.map((value, id) => (
        <div 
          key={id} 
          className='relative h-[400px] sm:h-[420px] lg:h-[457px] w-full p-5 sm:p-6 bg-cover bg-center rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl'
          style={{ backgroundImage: `url(${value.image})` }}
        >
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>

          {/* Background zoom effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 -z-10"
            style={{ backgroundImage: `url(${value.image})` }}
          ></div>

          {/* Content */}
          <div className="relative z-10">
            <h2 className='text-xl sm:text-2xl font-semibold my-2 text-gray-900 group-hover:text-gray-800 transition-colors duration-300'>
              {value.heading}
            </h2>
            <p className='text-sm sm:text-base text-gray-800 leading-relaxed line-clamp-4 sm:line-clamp-none'>
              {value.p}
            </p>
          </div>

          {/* Button */}
          <div className="absolute right-0 bottom-0 bg-white rounded-tl-3xl sm:rounded-tl-4xl px-4 sm:px-5 py-3 sm:py-4 z-20 group-hover:bg-blue-50 transition-all duration-300">
            <Link href={value.link}>
              <button className="px-4 sm:px-5 py-2 bg-blue-500 text-white hover:bg-gray-800 cursor-pointer rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm sm:text-base font-medium">
                Shop Now 
                <ArrowRight className='inline-block transition-transform duration-300 group-hover:translate-x-1' size={18} />
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RowImage;