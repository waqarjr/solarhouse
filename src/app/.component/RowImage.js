import { ArrowRight} from 'lucide-react';
import React from 'react'

const values = [
  {
    heading:"Solar Pannel",
    p :"Explore top-quality solar panels built for maximum efficiency, durability, and savings—perfect for homes, businesses, and off-grid solutions.",
    image: "/banner.png"
  },
  {
    heading:"Solar Inverter",
    p:"Efficient solar inverters that convert sunlight into usable power, ensuring smooth energy flow and maximum performance for your solar system.",
    image :"/banner1.png",
  },
  {
    heading:"VFD",
    p:"Enhance motor control with reliable Variable Frequency Drives, improving energy efficiency, performance.",
    image : "/banner3.png",
  },
  {
    heading:"Voltage Protector ",
    p:"Protect your appliances from voltage spikes and fluctuations with smart voltage protectors designed for safety, reliability.",
    image:"/banner4.png",
  }
]

const RowImage = () => {
  return (<>
  <div className='max-w-7xl mx-auto  grid grid-cols-4 gap-4 my-6' >
    {values.map((value,id)=>(
      <div key={id} className='relative h-[457px] w-[305PX] p-5 bg-cover bg-center rounded-2xl' style={{backgroundImage :`url(${value.image})`}}>
      <h2 className='text-2xl font-semibold my-2' > {value.heading} </h2>
      <p>{value.p}</p>
        <div className="absolute  right-0 bottom-0 bg-white rounded-tl-4xl px-4 py-2" >
            <button className="px-4 py-2 bg-blue-500 text-white hover:bg-gray-800  cursor-pointer rounded-2xl " >Shop Now <ArrowRight className='inline-block ' /> </button>
        </div>
    </div>
    ))}
  </div>
  </>)
}

export default RowImage;