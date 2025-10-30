import React from 'react';

export default function ProductPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white">
          {/* Left Side - Image Section */}
          <div className="space-y-4 ">
            {/* Main Product Image Skeleton */}
            <div className=" rounded-lg p-6  animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
            </div>

            {/* Thumbnail Skeleton */}
            <div className="flex gap-3">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-lg border-2 border-blue-500 animate-pulse"></div>
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Right Side - Product Details Section */}
          <div className="bg-white rounded-lg p-6 ">
            <div className="space-y-6 animate-pulse">
              {/* Title Skeleton */}
              <div className="space-y-3">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-10 bg-blue-100 rounded w-1/3"></div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200"></div>

              {/* Description Skeleton */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>

              {/* Quantity and Add to Cart Section */}
              <div className="space-y-4">
                {/* Quantity Selector Skeleton */}
                <div className="flex items-center gap-4">
                  <div className="h-12 bg-gray-200 rounded-lg w-32"></div>
                  <div className="h-12 bg-blue-200 rounded-lg flex-1"></div>
                </div>

                {/* Add to Wishlist Skeleton */}
                <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
              </div>

              {/* Categories and Tags Section */}
              <div className="space-y-4">
                {/* Categories Skeleton */}
                <div className="flex items-center gap-3">
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-100 rounded-full w-28"></div>
                  <div className="h-8 bg-gray-100 rounded-full w-24"></div>
                </div>

                {/* Tags Skeleton */}
                <div className="flex items-center gap-3">
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-100 rounded-full w-20"></div>
                  <div className="h-8 bg-gray-100 rounded-full w-32"></div>
                </div>
              </div>

              {/* Share Section Skeleton */}
              <div className="flex items-center gap-3 pt-4">
                <div className="h-5 bg-gray-200 rounded w-16"></div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
                  <div className="w-10 h-10 bg-red-200 rounded-full"></div>
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="w-10 h-10 bg-green-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only compact skeleton */}
        <div className="block md:hidden mt-8">
          <div className="bg-white rounded-lg p-4 ">
            <div className="space-y-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              <div className="h-8 bg-blue-100 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-4/5"></div>
              </div>
              <div className="h-12 bg-blue-200 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Additional skeleton for product tabs/description (optional) */}
        <div className="mt-12 bg-white rounded-lg p-6 ">
          <div className="space-y-4 animate-pulse">
            {/* Tabs skeleton */}
            <div className="flex gap-4 border-b border-gray-200 pb-4">
              <div className="h-10 bg-gray-200 rounded w-32"></div>
              <div className="h-10 bg-gray-100 rounded w-32"></div>
              <div className="h-10 bg-gray-100 rounded w-32"></div>
            </div>

            {/* Content skeleton */}
            <div className="space-y-3 pt-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}