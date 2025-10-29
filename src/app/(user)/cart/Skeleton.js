export default function CartSkeleton() {
  return (
    <div className="h-[600px] mx-auto max-w-7xl  p-8">

        <div className=" px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <span className="hover:text-gray-900 cursor-pointer">Home</span> /
            <span className="text-gray-900 font-medium">Cart</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Cart</h1>
        </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-100 px-6 py-4 grid grid-cols-12 gap-4">
              <div className="col-span-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Cart Item Row */}
            <div className="px-6 py-6 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Product Image & Name */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                </div>

                {/* Quantity */}
                <div className="col-span-2">
                  <div className="h-10 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>

                {/* Subtotal */}
                <div className="col-span-2">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                </div>

                {/* Delete Button */}
                <div className="col-span-2 flex justify-center">
                  <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Totals Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            {/* Title */}
            <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Subtotal Row */}
            <div className="flex justify-between items-center">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Total Row */}
            <div className="flex justify-between items-center">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
              <div className="h-7 bg-gray-200 rounded animate-pulse w-36"></div>
            </div>

            {/* Checkout Button */}
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}