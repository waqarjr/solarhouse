'use client'
import React,{use} from "react";
import HeroSection from "@/app/.component/HeroSection";
import ItemsSection from "@/app/.component/product-category/ItemsSection";
import Products from "@/app/.component/product-category/Products";
import { useState } from "react";
import { SlidersHorizontal, X ,ChevronDown} from "lucide-react";



const Page =   ({params}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {slug} =  use(params);
  const newHero = `/shop/${slug}` 

  if(slug === 'solar-panels' || slug === 'va-protectors') {
    return(<>
    <HeroSection url={newHero} />
<section className="grid grid-cols-[20%_auto]  max-w-7xl mx-auto  bg-gradient-to-b from-secondary to-white px-6 text-center my-5">
  
  <div className="hidden lg:grid [&>*]:border-gray-100 ">
    <div className="grid my-1 py-2 border-b-2 cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[20px] text-gray-900">Category</p>
        <ChevronDown className="text-[14px] text-gray-400 transition-all duration-150" />
      </div>
    </div>

    <div className="grid my-1 py-2 border-b-2 cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[20px] text-gray-900">Price</p>
        <ChevronDown className="text-[14px] text-gray-400 transition-all duration-150" />
      </div>
    </div>

    <div className="grid my-1 py-2 border-b-2 cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[20px] text-gray-900">Tag</p>
        <ChevronDown className="text-[14px] text-gray-400 transition-all duration-150" />
      </div>
    </div>
  </div>

  <div className="bg-white  rounded-2xl p-10 max-w-lg w-full border border-gray-100 mx-auto">
    <div className="flex flex-col items-center gap-4">

      <h1 className="text-3xl font-bold text-primary">No Products Found</h1>
      <p className="text-gray-600 text-lg">Sorry, we couldn&apos;t find any products matching your selection.</p>

      <a href="/shop" className="mt-6 inline-block bg-primary text-black px-6 py-3 rounded-full font-medium shadow hover:bg-primary/90 transition-all duration-300">Back to Shop</a>
    </div>
  </div>
</section>

    </>)
  }

  return (
    <>
      <HeroSection url={newHero} />
            <div className='mx-auto max-w-7xl'>
        <div className='hidden lg:grid lg:grid-cols-[20%_auto] items-start'>
          <ItemsSection url={slug} />
          <Products url={slug} />
        </div>

        <div className='lg:hidden'>
          <Products url={slug} />
        </div>
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg z-40 flex items-center gap-2 transition-all duration-300" aria-label="Open filters">
          <SlidersHorizontal size={24} />
        </button>

      {sidebarOpen && (

        <>
          <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"></div>
          
          <div className="fixed top-0 left-0 h-full w-full bg-white z-50 overflow-y-auto transition-transform duration-300 translate-x-0">
            <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-4 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close filters">
                <X size={24} className="text-gray-700" />
              </button>
            </div>
            
            <div className="p-4">
              <ItemsSection isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} url={slug} />
            </div>
          </div>
        </>
      )}
      </div>
    </>
  )
}

export default Page; 