"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    townCity: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Order placed:', formData);
    alert('Order placed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Billing Details Section */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">BILLING DETAILS</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"/>
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="lastName" name="lastName" value={formData.lastName}
                   onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"/>
                </div>
              </div>

              <div>
                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  Street address <span className="text-red-500">*</span>
                </label>
                <input type="text" id="streetAddress" name="streetAddress" value={formData.streetAddress} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"/>
              </div>

              <div>
                <label htmlFor="townCity" className="block text-sm font-medium text-gray-700 mb-2">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input type="text" id="townCity" name="townCity" value={formData.townCity} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"/>
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  State / Country <span className="text-red-500">*</span>
                </label>
                <input type="text" id="state" name="state" value={formData.townCity} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"/>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input type="text" id="phone" name="phone" value={formData.townCity} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input type="text" id="email" name="email" value={formData.townCity} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"/>
              </div>
            </div>
          </div>

          {/* Your Order Section */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">YOUR ORDER</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-sm font-semibold text-gray-700">Product</span>
                <span className="text-sm font-semibold text-gray-700">Subtotal</span>
              </div>

              <div className="flex justify-between items-start py-4 border-b border-gray-200">
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    Auracel 20kw 3-Phase Omgrid Inverter (IP-66) × 1
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-900 ml-4">
                  Rs 250,000
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-sm text-gray-700">Subtotal</span>
                <span className="text-sm font-medium text-gray-900">Rs 250,000</span>
              </div>

              <div className="flex justify-between items-center py-4 bg-gray-50 px-4 rounded-md">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-base font-bold text-gray-900">Rs 250,000</span>
              </div>

              {/* Submit Button */}
              <button onClick={handleSubmit}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}