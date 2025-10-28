import React from 'react'
import Link from 'next/link'
import { OctagonAlert } from 'lucide-react'
import { Clock, Package } from 'lucide-react';
const page = () => {

  const orders = [
    {
      id: "#9104",
      date: "October 27, 2025",
      status: "On hold",
      total: "₨ 355,250 for 1 item"
    },
    {
      id: "#9103",
      date: "October 27, 2025",
      status: "Processing",
      total: "₨ 355,250 for 1 item"
    },
    {
      id: "#9102",
      date: "October 27, 2025",
      status: "Processing",
      total: "₨ 355,250 for 1 item"
    }
  ];

  const getStatusStyle = (status) => {
    if (status === "On hold") {
      return "bg-orange-100 text-orange-700 border-orange-200";
    }
    return "bg-blue-100 text-blue-700 border-blue-200";
  };

  const getStatusIcon = (status) => {
    if (status === "On hold") {
      return <Clock className="w-4 h-4" />;
    }
    return <Package className="w-4 h-4" />;
  };

  if(false) {
    return (
      <div className='h-[50px] w-full bg-blue-400 text-white flex gap-2 items-center justify-center' >
          <OctagonAlert  />
          <p className='inline-block'>No order has been made yet.&nbsp;
            <Link href="/shop" className=" font-semibold  transition-colors border-b-[1px] border-gray-300">
                Browse Products
              </Link>
          </p>
      </div>
    )
  }

  return(<>
<div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                ORDER
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                DATE
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                STATUS
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                TOTAL
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-6 px-4 text-gray-900 font-medium">
                  {order.id}
                </td>
                <td className="py-6 px-4 text-gray-600">{order.date}</td>
                <td className="py-6 px-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </td>
                <td className="py-6 px-4 text-gray-600">{order.total}</td>
                <td className="py-6 px-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Order
                </p>
                <p className="text-gray-900 font-medium">{order.id}</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                View
              </button>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Date
              </p>
              <p className="text-gray-600 text-sm">{order.date}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Status
              </p>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(order.status)}`}>
                {getStatusIcon(order.status)}
                {order.status}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Total
              </p>
              <p className="text-gray-600 text-sm">{order.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>)

}

export default page 