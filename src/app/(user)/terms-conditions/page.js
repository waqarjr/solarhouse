import React from 'react';
import { FileText, ShoppingCart, CreditCard, Truck, RotateCcw, Award, Copyright, AlertCircle, Scale, Link } from 'lucide-react';

export default function TermsConditions() {
  const sections = [
    {
      icon: FileText,
      number: "1",
      title: "General",
      points: [
        "These Terms & Conditions apply to all users of the website and customers of our products.",
        "We reserve the right to modify or update these terms at any time without prior notice."
      ]
    },
    {
      icon: ShoppingCart,
      number: "2",
      title: "Products & Orders",
      points: [
        "All products displayed on our website are subject to availability.",
        "We reserve the right to refuse or cancel any order at our discretion, including for pricing errors or stock issues.",
        "Product descriptions and images are provided for informational purposes. Minor variations may occur."
      ]
    },
    {
      icon: CreditCard,
      number: "3",
      title: "Pricing & Payment",
      points: [
        "All prices are listed in PKR and include applicable taxes unless stated otherwise.",
        "We accept secure payments through major credit/debit cards and other trusted payment gateways.",
        "Orders will only be processed after successful payment confirmation."
      ]
    },
    {
      icon: Truck,
      number: "4",
      title: "Shipping & Delivery",
      points: [
        "Delivery times provided are estimates and not guaranteed. Delays due to unforeseen circumstances are not our responsibility.",
        "Customers are responsible for providing accurate shipping information. Additional charges may apply for re-delivery due to incorrect addresses."
      ]
    },
    {
      icon: RotateCcw,
      number: "5",
      title: "Returns & Refunds",
      points: [
        "Please refer to our Shipping & Return Policy for full details on returns, exchanges, and refunds.",
        "Items must meet return conditions to be eligible for a refund."
      ]
    },
    {
      icon: Award,
      number: "6",
      title: "Warranty",
      points: [
        "Some products may include a manufacturer's warranty. Please refer to individual product pages or contact us for details.",
        "Warranties do not cover damage due to misuse, improper installation, or natural disasters."
      ]
    },
    {
      icon: Copyright,
      number: "7",
      title: "Intellectual Property",
      points: [
        "All website content—including text, images, logos, and graphics—is the property of Solar Store and protected by intellectual property laws.",
        "Unauthorized use or reproduction is strictly prohibited."
      ]
    },
    {
      icon: AlertCircle,
      number: "8",
      title: "Limitation of Liability",
      points: [
        "We are not liable for any indirect, incidental, or consequential damages arising from the use of our website or products.",
        "Our maximum liability shall not exceed the total amount paid by you for the purchased product."
      ]
    },
    {
      icon: Scale,
      number: "9",
      title: "Governing Law",
      points: [
        "These terms are governed by and construed in accordance with the laws of Lahore, Punjab and any disputes will be resolved in the appropriate courts of that jurisdiction."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Scale className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 text-center max-w-3xl mx-auto">
            Welcome to Solar Store. By accessing or using our website and purchasing from us, you agree to be bound by the following terms and conditions. Please read them carefully.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-5xl mx-auto">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Terms & Conditions</span>
          </nav>
        </div>
      </div>

      {/* Important Notice Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 shadow-md">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Important Notice</h3>
              <p className="text-amber-800 leading-relaxed">
                By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website or services.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Number Badge */}
                  <div className="sm:w-24 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center p-6 sm:p-0">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-white">{section.number}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      {section.title}
                    </h2>
                    <ul className="space-y-3">
                      {section.points.map((point, pIndex) => (
                        <li key={pIndex} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                          <div className="flex-shrink-0 w-2 h-2 bg-slate-600 rounded-full mt-2"></div>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Related Policies */}
        <div className="mt-12 bg-gradient-to-br from-slate-100 to-gray-100 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Policies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/privacy-policy"
              className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Privacy Policy</div>
                <div className="text-xs text-gray-500">How we protect your data</div>
              </div>
            </a>

            <a
              href="/shipping-return-policy"
              className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Shipping & Return</div>
                <div className="text-xs text-gray-500">Delivery and returns info</div>
              </div>
            </a>

            <a
              href="/refund-returns"
              className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group sm:col-span-2 lg:col-span-1"
            >
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <RotateCcw className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Refund Policy</div>
                <div className="text-xs text-gray-500">Complete refund details</div>
              </div>
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-br from-slate-800 to-gray-900 rounded-2xl shadow-2xl p-8 text-white">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Questions About These Terms?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              If you have any questions or concerns about our Terms & Conditions, please don&apos;t hesitate to contact us. We&apos;re here to help.
            </p>
            <a
              href="mailto:info@solarstore.pk"
              className="inline-flex items-center gap-2 bg-white text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors shadow-lg"
            >
              <FileText className="w-5 h-5" />
              Contact Us
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6">
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            <span className="font-semibold text-gray-900">Legal Disclaimer:</span> These Terms & Conditions constitute a legally binding agreement between you and Solar Store. We reserve the right to update these terms at any time. Your continued use of our website after any changes constitutes acceptance of the new terms.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Solar Store. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}