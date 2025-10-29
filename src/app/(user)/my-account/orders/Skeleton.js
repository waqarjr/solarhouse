import React from 'react';

export default function Skeleton() {
  return (
    <div className="h-[600px] px-4 py-8 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 pb-6 border-b border-gray-200">
          <div className="text-sm font-semibold text-gray-900 uppercase">ORDER</div>
          <div className="text-sm font-semibold text-gray-900 uppercase">DATE</div>
          <div className="text-sm font-semibold text-gray-900 uppercase">STATUS</div>
          <div className="text-sm font-semibold text-gray-900 uppercase">TOTAL</div>
          <div className="text-sm font-semibold text-gray-900 uppercase">ACTIONS</div>
        </div>

        {[1, 2, 3,4].map((item) => (
          <div key={item} className="grid grid-cols-5 gap-4 py-6 border-b border-gray-200 animate-pulse">
            <div className="flex items-center">
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>

            <div className="flex items-center">
              <div className="h-5 bg-gray-200 rounded w-32"></div>
            </div>

            <div className="flex items-center">
              <div className="h-8 bg-gray-200 rounded-full w-28"></div>
            </div>

            <div className="flex items-center">
              <div className="h-5 bg-gray-200 rounded w-40"></div>
            </div>

            <div className="flex items-center">
              <div className="h-10 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}