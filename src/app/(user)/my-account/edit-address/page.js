import { FilePlus } from 'lucide-react';

export default function AddressesSection() {
  return (<>
  <p className="text-gray-600 text-sm mb-8">
        The following addresses will be used on the checkout page by default.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Billing address
          </h2>
          
          <button className="flex items-center gap-2 text-gray-900 font-medium hover:text-blue-600 transition-colors mb-4">
            <FilePlus className="w-5 h-5" />
            <span className="uppercase text-sm tracking-wide">
              ADD BILLING ADDRESS
            </span>
          </button>
          
          <p className="text-gray-600 text-sm">
            You have not set up this type of address yet.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Shipping address
          </h2>
          
          <button className="flex items-center gap-2 text-gray-900 font-medium hover:text-blue-600 transition-colors mb-4">
            <FilePlus className="w-5 h-5" />
            <span className="uppercase text-sm tracking-wide">
              ADD SHIPPING ADDRESS
            </span>
          </button>
          
          <p className="text-gray-600 text-sm">
            You have not set up this type of address yet.
          </p>
        </div>
      </div>
  </>);
}