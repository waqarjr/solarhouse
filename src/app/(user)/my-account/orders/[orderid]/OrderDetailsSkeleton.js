    export default function OrderDetailsSkeleton() {
  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="h-10 w-48 bg-gray-300 rounded mb-3 animate-pulse"></div>
            <div className="h-6 w-96 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-12 w-24 bg-gray-300 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="h-7 w-40 bg-gray-300 rounded mb-6 animate-pulse"></div>
              
              <div className="flex gap-4">
                <div className="w-32 h-32 bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-6 w-3/4 bg-gray-300 rounded mb-3 animate-pulse"></div>
                  <div className="h-5 w-24 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Addresses Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Billing Address */}
              <div className="rounded-lg shadow p-6 bg-gray-300 animate-pulse">
              </div>

              {/* Shipping Address */}
              <div className="rounded-lg shadow p-6 bg-gray-300 animate-pulse">
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <div className="h-7 w-40 bg-gray-300 rounded mb-6 animate-pulse"></div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-4 w-28 bg-gray-100 rounded ml-auto animate-pulse"></div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-6 w-36 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}