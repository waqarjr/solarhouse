import React from 'react';
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const WishlistSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 sm:mb-6">
            <Link href="/">
              <span className="hover:text-gray-900 cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Wishlist</span>
          </div>
          
          <div className="h-10 sm:h-12 md:h-14 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="w-full">
          {/* Table Header - Hidden on mobile and tablet */}
          <div className="hidden lg:grid lg:grid-cols-12 bg-gray-200 gap-4 rounded-t-lg px-6 py-4">
            <div className="col-span-6 h-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="col-span-3 h-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="col-span-2 h-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="col-span-1 h-5 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Skeleton Items */}
          <div className="space-y-4 lg:space-y-0">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg lg:rounded-t-none lg:rounded-b-lg shadow-sm border border-gray-200 lg:border-t-0">
                <div className="p-4 sm:p-5 lg:p-6">
                  {/* Mobile & Tablet Layout */}
                  <div className="lg:hidden space-y-4">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-lg flex-shrink-0 animate-pulse"></div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="h-4 sm:h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 sm:h-5 bg-gray-200 rounded animate-pulse w-1/2"></div>
                        <div className="h-6 sm:h-7 bg-gray-200 rounded animate-pulse w-1/3"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-3 border-t">
                      <div className="flex-1 h-10 sm:h-11 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
                    <div className="col-span-6 flex gap-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 animate-pulse"></div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                      </div>
                    </div>

                    <div className="col-span-3 flex justify-center">
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
                    </div>

                    <div className="col-span-2 flex justify-center">
                      <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-36"></div>
                    </div>

                    <div className="col-span-1 flex justify-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistSkeleton;