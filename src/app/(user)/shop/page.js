'use client'
import HeroSection from "@/app/.component/HeroSection";
import ItemsSection from "@/app/.component/ItemsSection";
import Products from "@/app/.component/Products";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

const Page = () => {
  const pathName = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <HeroSection url={pathName} />
      
      <div className='mx-auto max-w-7xl'>
        <div className='hidden lg:grid lg:grid-cols-[20%_auto] items-start'>
          <ItemsSection />
          <Products />
        </div>

        <div className='lg:hidden'>
          <Products />
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
              <ItemsSection isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        </>
      )}
      </div>

    </>
  );
};

export default Page;