'use client'
import React, { useEffect, useState } from 'react';
import { Package, Truck, CreditCard, FileText, Clock, Building2 } from 'lucide-react';
import { useRouter,useParams } from 'next/navigation';
import axios from 'axios';
import api from '@/app/lib/api';

export default function OrderDetails() {
    const router  = useRouter();
    const {orderid}  = useParams();
    const [data , setData] = useState([])
    
    const getData  = async ()=>{
        const response = await api.get(`/orders/${orderid}`);
        setData(response.data)
    }

    useEffect(()=>{
        getData()
    },[])
    
    console.log(data.line_items,"waqa");
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

  const order = {
    id: '#9104',
    date: 'October 27, 2025',
    status: 'On hold',
    items: [
      {
        id: 1,
        name: 'Auxsol 30kw 3-Phase Ongrid Inverter (IP-66)',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=400&fit=crop',
        quantity: 1,
        price: 355000
      }
    ],
    subtotal: 355000,
    shipping: 250,
    shippingMethod: 'via Flat Rate',
    total: 355250,
    paymentMethod: 'Cash on delivery',
    note: 'Welcome to the world of education Welcome to the world of educationWelcome to the world of educationWelcome to the world of education Welcome to the world of education'
  };

  return (
    <div className="min-h-screen  px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className=''>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Details</h1>
              <p className="text-slate-600">
                Order <span className="font-semibold text-slate-900">{data.id}</span> was placed on
                <span className="font-semibold text-slate-900">{data.date_created}</span> and is currently &nbsp;
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(data.status)}`}>
                    {getStatusIcon(data.status)}
                    {data.status}
                  </span>
              </p>
            </div>
            
            {/* for go back on orders page */}
            <button onClick={()=>router.push('/my-account/orders')} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer">
              View
            </button>
          
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Items
                </h2>
              </div>

              <div className="p-6">
                {data?.line_items?.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden">
                      <img 
                        src={item?.image?.src} 
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                        {item?.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Quantity:</span> {item?.quantity}
                        </span>
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900">
                        Rs {item.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
 
            {/* billing & shipping address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                   Billing address
                </h3>
                <ul className='[&>*]:text-slate-700' >
                    <li>{data.billing?.first_name} {data.billing?.last_name}</li>
                    <li>{data.billing?.address_1}</li>
                    <li>{data.billing?.city}</li>
                    <li>{data.billing?.state}</li>
                    <li>{data.billing?.postcode}</li>
                    <li>{data.billing?.email}</li>
                    <li>{data.billing?.phone}</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Shipping address
                </h3>
                <ul className='[&>*]:text-slate-700' >
                    <li>{data.shipping?.first_name} {data.billing?.last_name}</li>
                    <li>{data.shipping?.address_1}</li>
                    <li>{data.shipping?.city}</li>
                    <li>{data.shipping?.state}</li>
                    <li>{data.shipping?.postcode}</li>
                </ul>
              </div>
            </div>

            {/* Payment & Note */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h3>
                <p className="text-slate-700">{data?.payment_method_title}</p>
              </div>
              {
                data?.customer_note && (<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Note
                </h3>
                <p className="text-slate-700">{data?.customer_note}</p>
              </div>)
              }
            </div>
            
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900">Rs {order.subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-slate-600">
                  <span>Shipping:</span>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900">Rs {order.shipping}</div>
                    <div className="text-xs text-slate-500">{order.shippingMethod}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-slate-900">Total:</span>
                    <span className="font-bold text-slate-900">Rs {order.total.toLocaleString()}</span>
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