export default function ProductGridSkeleton() {
  return (
    <div className="w-full bg-white p-4">
      <div className="animate-pulse">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          {/* Showing results */}
          <div className="h-5 w-48 bg-gray-200 rounded"></div>
          
          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* Show label and numbers */}
            <div className="flex items-center gap-3">
              <div className="h-4 w-12 bg-gray-200 rounded"></div>
              <div className="flex gap-2">
                <div className="h-6 w-8 bg-gray-200 rounded"></div>
                <div className="h-6 w-8 bg-gray-200 rounded"></div>
                <div className="h-6 w-8 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            {/* Sorting dropdown */}
            <div className="h-10 w-40 bg-gray-200 rounded-full"></div>
            
            {/* View icons */}
            <div className="flex gap-2">
              <div className="h-10 w-10 bg-blue-200 rounded-lg"></div>
              <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Product Image */}
              <div className="relative bg-gray-100 aspect-square">
                <div className="absolute inset-0 bg-gray-200"></div>
                
                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="h-10 w-10 bg-white rounded-full"></div>
                  <div className="h-10 w-10 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                {/* Product Title */}
                <div className="h-5 bg-gray-200 rounded mb-2"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-4"></div>
                
                {/* Price and Cart */}
                <div className="flex items-center justify-between">
                  <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  <div className="h-12 w-12 bg-blue-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}