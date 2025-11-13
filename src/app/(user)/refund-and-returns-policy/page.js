import React from 'react';
import { RotateCcw, Package, CreditCard, Gift, Truck, Clock, XCircle, AlertTriangle, Mail, CheckCircle,  } from 'lucide-react';
import Link from 'next/link';
export default function RefundReturnsPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <RotateCcw className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-4">
            Refund and Returns Policy
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100 text-center max-w-2xl mx-auto">
            We want you to be completely satisfied with your purchase. Learn about our return and refund process.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Refund and Returns Policy</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Overview Section */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border border-gray-100 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our refund and returns policy lasts 30 days. If 30 days have passed since your purchase, we can&apos;t offer you a full refund or exchange.
              </p>
              <p className="text-gray-600 leading-relaxed">
                To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
              </p>
            </div>
          </div>
        </div>

        {/* Non-Returnable Items */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border border-gray-100 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                <XCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Non-Returnable Items</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Additional non-returnable items:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Gift cards</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Downloadable software products</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Some health and personal care items</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed mt-4">
                To complete your return, we require a receipt or proof of purchase. Please do not send your purchase back to the manufacturer.
              </p>
            </div>
          </div>
        </div>

        {/* Partial Refunds */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border border-gray-100 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Partial Refunds</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                There are certain situations where only partial refunds are granted:
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Book with obvious signs of use</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>CD, DVD, VHS tape, software, video game, cassette tape, or vinyl record that has been opened</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Any item not in its original condition, is damaged or missing parts for reasons not due to our error</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Any item that is returned more than 30 days after delivery</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Refunds */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border border-gray-100 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Refunds</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
              </p>
              <p className="text-gray-600 leading-relaxed">
                If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
              </p>
            </div>
          </div>
        </div>

        {/* Late or Missing Refunds */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border border-gray-100 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Late or Missing Refunds</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you haven&apos;t received a refund yet, first check your bank account again.
              </p>
              <div className="space-y-3 ml-4">
                <p className="text-gray-600 leading-relaxed">
                  Then contact your credit card company, it may take some time before your refund is officially posted.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Next contact your bank. There is often some processing time before a refund is posted.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  If you&apos;ve done all of this and you still have not received your refund yet, please contact us at <a href="mailto:info@solarstore.pk" className="text-emerald-600 hover:text-emerald-800 hover:underline font-medium">info@solarstore.pk</a>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sale Items */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border border-gray-100 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Sale Items</h2>
              <p className="text-gray-600 leading-relaxed">
                Only regular priced items may be refunded. <span className="font-semibold text-gray-900">Sale items cannot be refunded.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Exchanges */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border border-gray-100 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <RotateCcw className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Exchanges</h2>
              <p className="text-gray-600 leading-relaxed">
                We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at <a href="mailto:info@solarstore.pk" className="text-emerald-600 hover:text-emerald-800 hover:underline font-medium">info@solarstore.pk</a> and send your item to our address.
              </p>
            </div>
          </div>
        </div>

        {/* Gifts */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border border-gray-100 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Gifts</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If the item was marked as a gift when purchased and shipped directly to you, you&apos;ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.
              </p>
              <p className="text-gray-600 leading-relaxed">
                If the item wasn&apos;t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and they will find out about your return.
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Returns */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border border-gray-100 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Shipping Returns</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To return your product, you should mail your product to our physical address.
              </p>
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
                <p className="font-semibold text-gray-900 mb-2">Important Notes:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>You will be responsible for paying for your own shipping costs for returning your item</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>Shipping costs are non-refundable</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>If you receive a refund, the cost of return shipping will be deducted from your refund</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Depending on where you live, the time it may take for your exchanged product to reach you may vary.
              </p>
              <p className="text-gray-600 leading-relaxed">
                If you are returning more expensive items, you may consider using a trackable shipping service or purchasing shipping insurance. We don&apos;t guarantee that we will receive your returned item.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg p-6 sm:p-8 text-white">
          <div className="flex items-start gap-4">
            <Mail className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-3">Need Help?</h3>
              <p className="text-emerald-50 mb-4">
                Contact us for questions related to refunds and returns.
              </p>
              <a 
                href="mailto:info@solarstore.pk" 
                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@solarstore.pk
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
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