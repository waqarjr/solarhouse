"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { OctagonAlert, Trash2 } from 'lucide-react'
import { Clock, Package } from 'lucide-react';
import useStoreData from '@/app/lib/useStoreData';
import axios from 'axios';
import Skeleton from './Skeleton';
import Swal from 'sweetalert2';

const Page = () => {
  const [data, setData] = useState([])
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const {user} = useStoreData();
  
  useEffect(() => {
    const getData = async() => {
      try {
        const response = await axios.post('/api/orders', {id: user.id});
        
        if (response.data.valid) {
          setLoading(true);
          setData(response.data.message)
        } else setNoData(true);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    getData()
  }, [user.id])

const handleDelete = async (orderId) => {
  Swal.fire({ title: "Are you sure you want to delete this order?", icon: "warning", showCancelButton: true, confirmButtonText: "Yes, delete it", cancelButtonText: "Cancel" })
  .then(async (result) => {

    if (!result.isConfirmed) return;   // user cancelled

    setDeleting(orderId);

    try {
      const response = await axios.delete('/api/orders', { data: { orderId } });

      if (response.data.success) {
        setData(prev => prev.filter(order => order.id !== orderId));

        if (data.length === 1) setNoData(true);

        Swal.fire({ title: "Deleted!", text: "Order has been removed.", icon: "success", timer: 1500, showConfirmButton: false });
      } else {
        Swal.fire({ title: "Error!", text: response.data.message, icon: "error" });
      }

    } catch (error) {
      Swal.fire({ title: "Error!", text: "Failed to delete order. Try again.", icon: "error" });
      console.error(error);
    } finally {
      setDeleting(null);
    }

  });
};

    

  if (loading) return <Skeleton/>

  const getStatusStyle = (status) => {
    if (status === "on-hold") {
      return "bg-orange-100 text-orange-700 border-orange-200";
    }
    return "bg-blue-100 text-blue-700 border-blue-200";
  };

  const getStatusIcon = (status) => {
    if (status === "on-hold") {
      return <Clock className="w-4 h-4" />;
    }
    return <Package className="w-4 h-4" />;
  };

  if (noData || data.length === 0) {
    return (
      <div className='h-[50px] w-full bg-blue-400 text-white flex gap-2 items-center justify-center'>
        <OctagonAlert />
        <p className='inline-block'>No order has been made yet.&nbsp;
          <Link href="/shop" className="font-semibold transition-colors border-b-[1px] border-gray-300">
            Browse Products
          </Link>
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="w-full max-w-7xl mx-auto sm:p-6">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead >
              <tr className="border-b border-gray-200 ">
                <th className="text-center py-4 px-4 font-semibold text-gray-900 text-sm uppercase tracking-wide ">
                  ORDER
                </th>
                <th className="text-center py-4 px-4 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  DATE
                </th>
                <th className="text-center py-4 px-4 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  STATUS
                </th>
                <th className="text-center py-4 px-4 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  TOTAL
                </th>
                <th className="text-center py-4 px-4 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(order => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-4 text-gray-900 font-medium">
                    {order.id}
                  </td>
                  <td className="py-6 px-4 text-gray-600">
                    {order.date_created.split("T")[0]}&nbsp;{order.date_created.split("T")[1]}
                  </td>
                  <td className="py-6 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="py-6 px-4 text-gray-600">{order.total}</td>
                  <td className="py-6 px-4">
                    <div className="flex gap-2">
                      <Link  href={`/my-account/orders/${order.id}`} 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer">
                        View
                      </Link>
                      <button onClick={() => handleDelete(order.id)} disabled={deleting === order.id}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                        {deleting === order.id ? (
                          <span>Deleting...</span>
                        ) : (
                          <> <Trash2 className="w-4 h-4" /> Delete </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {data.map(order => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    Order
                  </p>
                  <p className="text-gray-900 font-medium">{order.id}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/my-account/orders/${order.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition text-sm"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(order.id)}
                    disabled={deleting === order.id}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleting === order.id ? (
                      <span className="text-sm">...</span>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Date
                </p>
                <p className="text-gray-600 text-sm">
                  {order.date_created.split("T")[0]}&nbsp;{order.date_created.split("T")[1]}
                </p>
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
    </>
  )
}

export default Page;