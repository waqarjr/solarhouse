'use client'
import React,{use} from "react";
import HeroSection from "@/app/.component/HeroSection";
import ItemsSection from "@/app/.component/ItemsSection";
import Products from "@/app/.component/Products";
import { useState } from "react";
import { SlidersHorizontal, X ,ChevronDown} from "lucide-react";



const Page =   ({params}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {slug} =  use(params);
  const newHero = `/shop/${slug}` 

  if(slug === 'solar-panels' || slug === 'va-protectors') {
    return(
      <>
        <HeroSection url={newHero} />
        <section className="max-w-7xl mx-auto bg-gradient-to-b from-secondary to-white px-4 sm:px-6 lg:px-8 my-5">
          <div className="grid gap-6 lg:grid-cols-[25%_auto] items-stretch">
            <div className="rounded-2xl hidden lg:block p-4 sm:p-6 flex flex-col gap-4">
              {["Category", "Price", "Tag"].map((label) => (
                <div key={label} className="border-b border-gray-700 last:border-b-0 pb-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-base sm:text-lg text-gray-900">{label}</p>
                    <ChevronDown className="text-gray-400" size={18} />
                  </div>
                </div>
              ))}
            </div>

            <div className=" p-6 sm:p-8 lg:p-10  flex flex-col items-center text-center gap-4">
              <div className="p-3 sm:p-4 rounded-full bg-blue-50 w-fit">
                <ChevronDown size={28} className="text-blue-500 rotate-90" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">No Products Found</h1>
              <p className="text-gray-600 text-base sm:text-lg">Sorry, we couldn&apos;t find any products matching your selection.</p>
              <a
                href="/shop"
                className="mt-2 inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-full font-medium shadow hover:bg-primary/90 transition-all duration-300"
              >
                Back to Shop
              </a>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <HeroSection url={newHero} />
            <div className='mx-auto max-w-7xl'>
        <div className='hidden lg:grid lg:grid-cols-[20%_auto] items-start'>
          <ItemsSection source="category" slug={slug} />
          <Products source="category" slug={slug} />
        </div>

        <div className='lg:hidden'>
          <Products source="category" slug={slug} />
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
              <ItemsSection isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} source="category" slug={slug} />
            </div>
          </div>
        </>
      )}
      </div>
    </>
  )
}

export default Page; 