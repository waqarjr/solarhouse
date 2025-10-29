export default function CheckoutSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Billing Details Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Title */}
          <div className="h-8 bg-gray-200 rounded animate-pulse w-56 mb-8"></div>

          {/* First Name & Last Name Row */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Street Address */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Town/City */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* State/Country */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-36"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Postcode/ZIP */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Phone */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Your Order Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Title */}
          <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-8"></div>

          {/* Product Header */}
          <div className="flex justify-between items-center pb-4 border-b mb-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
          </div>

          {/* Product Item */}
          <div className="flex justify-between items-center pb-6 border-b mb-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-64"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-28"></div>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center pb-6 mb-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-28"></div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pb-6 border-b mb-8">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
            <div className="h-7 bg-gray-200 rounded animate-pulse w-32"></div>
          </div>

          {/* Payment Method Box */}
          <div className="border border-gray-200 rounded-lg p-6 space-y-4">
            {/* Radio Button & Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded animate-pulse w-40"></div>
            </div>

            {/* Payment Instructions */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6"></div>
              
              {/* Payment Tiers */}
              <div className="space-y-2 my-4">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>

              <div className="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5"></div>
              
              {/* Sign-off */}
              <div className="space-y-2 mt-4">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-36"></div>
              </div>
            </div>

            {/* Bank Details Section */}
            <div className="mt-6 pt-6 border-t space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-64"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}