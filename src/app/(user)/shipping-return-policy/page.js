import React from 'react';
import { Package, Truck, MapPin, Clock, CheckCircle, RotateCcw, Shield, Mail, Phone, Info } from 'lucide-react';
import Link from 'next/link';

export default function ShippingReturnPolicy() {
  const shippingFeatures = [
    {
      icon: Clock,
      title: "Processing Time",
      description: "Orders are processed within 1–2 business days."
    },
    {
      icon: Truck,
      title: "Shipping Time",
      description: "Standard delivery takes 3–7 business days depending on your location."
    },
    {
      icon: Package,
      title: "Shipping Partners",
      description: "We work with trusted carriers to ensure safe and timely delivery."
    },
    {
      icon: MapPin,
      title: "Tracking",
      description: "Once your order ships, a tracking number will be sent to your email."
    },
    {
      icon: Info,
      title: "Shipping Rates",
      description: "Calculated at checkout based on your location and order size. Free shipping may apply to select items or order values."
    }
  ];

  const returnFeatures = [
    {
      icon: Clock,
      title: "Return Window",
      description: "Returns accepted within 14 days of delivery."
    },
    {
      icon: CheckCircle,
      title: "Eligibility",
      description: "Items must be unused, in original packaging, and in resalable condition."
    },
    {
      icon: RotateCcw,
      title: "Return Process",
      description: "Contact our support team to initiate a return. We'll provide instructions and a return shipping label if applicable."
    },
    {
      icon: Shield,
      title: "Refunds",
      description: "Once we receive and inspect the returned item, a refund will be issued to your original payment method within 5–7 business days."
    },
    {
      icon: Info,
      title: "Exclusions",
      description: "Customized items, installed products, and clearance items may not be eligible for return unless defective."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Truck className="w-16 h-16 sm:w-20 sm:h-20" />
              <RotateCcw className="w-8 h-8 sm:w-10 sm:h-10 absolute -bottom-1 -right-1 bg-white text-purple-600 rounded-full p-1.5" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-4">
            Shipping & Return Policy
          </h1>
          <p className="text-lg sm:text-xl text-purple-100 text-center max-w-2xl mx-auto">
            We&apos;re committed to delivering your solar products safely and ensuring your complete satisfaction.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-5xl mx-auto">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Shipping & Return Policy</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Shipping Information Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Shipping Information</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to delivering your solar products safely and on time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shippingFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group hover:border-indigo-200"
                >
                  <div className="flex flex-col items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Return Policy Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mb-4">
              <RotateCcw className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Return Policy</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your satisfaction is our priority. If you&apos;re not completely satisfied with your purchase, we&apos;re here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {returnFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group hover:border-purple-200"
                >
                  <div className="flex flex-col items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Highlights */}
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mt-1">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Fast Processing</h4>
                <p className="text-gray-700 text-sm">Your order will be processed and shipped within 1-2 business days</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-1">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">14-Day Returns</h4>
                <p className="text-gray-700 text-sm">Not satisfied? Return within 14 days for a full refund</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center mt-1">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Tracking Included</h4>
                <p className="text-gray-700 text-sm">Track your package every step of the way with email updates</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mt-1">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Quick Refunds</h4>
                <p className="text-gray-700 text-sm">Refunds processed within 5-7 business days after inspection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">Need Help?</h3>
              <p className="text-purple-100 text-lg">
                For any questions about shipping, returns, or tracking your order, please contact us:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <a 
                href="mailto:info@solarstore.pk" 
                className="flex items-center justify-center gap-3 bg-white text-indigo-600 px-6 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-xs text-indigo-400 font-normal">Email us</div>
                  <div className="text-sm">info@solarstore.pk</div>
                </div>
              </a>

              <a 
                href="tel:+923004856430" 
                className="flex items-center justify-center gap-3 bg-white text-purple-600 px-6 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-xs text-purple-400 font-normal">Call us</div>
                  <div className="text-sm">+92 300 4856430</div>
                </div>
              </a>
            </div>

            <div className="mt-8 text-center">
              <p className="text-purple-100 text-sm">
                Our customer support team is ready to assist you Monday - Saturday, 9 AM - 6 PM PKT
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} SolarHouse.pk. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}