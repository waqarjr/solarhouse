'use client'
import { ChevronDown,Heart , Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import {useRouter} from 'next/navigation';

const NewArival = () => {
const [changeDiv , setChangeDiv] = useState(false)
    const router = useRouter();

  return (<>
    <div className=" flex items-center justify-center p-4 sm:p-8 bg-blue-400">
      <div className="w-full max-w-7xl bg-green-300">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">New Arrivals</h1>
        </div>

          <div className={`grid-cols-4 gap-8 my-6 grid  `}>
                {new Array(8).fill(null).map( (value,id) =>(
                  <div key={id} className={`"h-[350px] w-[300px]  group shadow-xl relative overflow-hidden rounded-md cursor-pointer  transition-all duration-300`}>
                    <div className={`relative w-full overflow-hidden`}>

                      <Image  unoptimized  src={value?.images[0]?.src || "/image1.jpg" } alt={value?.images[0]?.alt || "products image"}  priority  width={256} height={0}
                       className={` object-cover w-full h-full  group-hover:scale-105 transition-transform duration-500`}/>

                      <div className="absolute   top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <button className="bg-white hover:bg-red-500  cursor-pointer p-2 rounded-full shadow opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ">
                          <Heart size={18} className="text-red-500 hover:text-white " />
                        </button>
                        <button className="bg-white hover:bg-gray-700 cursor-pointer p-2 rounded-full shadow opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ">
                          <Search size={18} className="text-gray-700 hover:text-white" />
                        </button>
                      </div>
                      <div  className="absolute bg-blue-600 rounded-tl-2xl bottom-0 p-2 pb-3 right-0 pr-3 opacity-0 translate-y-5 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <button className="bg-black text-white p-2 rounded-full shadow cursor-pointer" >
                            <ShoppingCart/>
                        </button>
                      </div>
                    </div>
                    <div className="px-2 py-4 bg-gray-200 h-auto">
                      <h3 className="font-semibold text-gray-700 leading-nomal hover:text-blue-500 line-clamp-2 ">{value?.name || "BB-SF3000TL On-Grid Solar Inverter - 3kW, High Efficiency 97.8%, "}</h3>
                      <p className="text-gray-600 text-[14px]  mt-1">RS {value?.price ||"0"}</p>
                    </div>
                </div>
                ))}
          </div>
      </div>
    </div>
  </>)
}

export default NewArival