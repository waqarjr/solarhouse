'use client'
import React,{use} from "react";
import HeroSection from "@/app/.component/HeroSection";
import ItemsSection from "@/app/.component/product-tag/ItemsSection";
import Products from "@/app/.component/product-tag/Products";
import { useState } from "react";
import { SlidersHorizontal, X ,ChevronDown} from "lucide-react";



const page =   ({params}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {slug} =  use(params);
  const newHero = `/product-tag/${slug}` 

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

export default page; 