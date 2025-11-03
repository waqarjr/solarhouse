"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, Trash2, ShoppingBag } from "lucide-react";
import axios from "axios";
import useStoreData from "@/app/lib/useStoreData";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import CartSkeleton from "./Skeleton";
import api from "@/app/lib/api";
import Link from "next/link";

const Page = () => {
  const { cart, toggleCart } = useStoreData();
  const [value, setValue] = useState([]);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [emptyCart, setEmptyCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getData = async (string) => {
      try {
        const response = await api.get(`/products?include=${string}`);
        setData(response.data);
        Swal.fire({
          icon: "success",
          title: "Product quantity updated successfully",
          toast: true,
          position: "top-end",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (e) {
        console.error(e.message);
        setEmptyCart(true);
      } finally {
        setLoading(false);
      }
    };

    // ✅ Load Local Storage & Fetch Products
    const storageData = localStorage.getItem("name");
    if (storageData) {
      const jsonObject = JSON.parse(storageData);
      const idData = jsonObject.map((v) => v.id);
      if (!idData.length) {
        setEmptyCart(true);
        setLoading(false);
        return;
      }

      const string = idData.join(",");
      getData(string);
    } else {
      setEmptyCart(true);
      setLoading(false);
    }
  }, [cart]);

  // ✅ Merge Data and Calculate Total
  useEffect(() => {
    const storageData = localStorage.getItem("name");
    if (!storageData || data.length === 0) return;

    const jsonObject = JSON.parse(storageData);

    const merged = data.map((item) => {
      const match = jsonObject.find((q) => q.id === item.id);
      return { ...item, ...match };
    });

    const total = merged.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.qty),
      0
    );

    setTotalPrice(total);
    setValue(merged);
  }, [data]);

  //  Handle Quantity Change
  const changeQuantity = (quantity, id) => {
    if (localStorage.getItem("name")) {
      const existingData = JSON.parse(localStorage.getItem("name"));
      const updatedData = existingData.map((item) =>
        item.id === id ? { ...item, qty: quantity } : item
      );
      localStorage.setItem("name", JSON.stringify(updatedData));
    }
    toggleCart();
  };

  //  Handle Remove Item
  const remove = (id) => {
    const storageData = localStorage.getItem("name");
    if (!storageData) return;

    const jsonObject = JSON.parse(storageData);
    const filtered = jsonObject.filter((val) => val.id !== id);
    localStorage.setItem("name", JSON.stringify(filtered));

    toggleCart();
    Swal.fire({
      icon: "error",
      title: "Product removed successfully",
      toast: true,
      position: "top-end",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Loading State
  if (loading) return <CartSkeleton />;

  //  Empty Cart UI
  if (emptyCart) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 sm:mb-6">
            <Link href="/" ><span className="hover:text-gray-900 cursor-pointer">Home</span></Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Cart</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Cart</h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cyan-500 rounded-lg shadow-sm p-8 sm:p-12 lg:p-16">
            <div className="flex flex-col items-center justify-center text-center gap-6 sm:gap-8">
              <ShoppingBag className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-white stroke-[1.5]" />
              <p className="text-white text-base sm:text-lg md:text-xl font-light">
                Your cart is currently empty.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center my-6 sm:my-8">
            <button
              onClick={() => router.push("/shop")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-md transition-colors duration-200 text-sm sm:text-base"
            >
              Return To Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 sm:mb-6">
            <Link href="/" ><span className="hover:text-gray-900 cursor-pointer">Home</span></Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Cart</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Cart</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            {/* Table Header - Hidden on mobile and tablet */}
            <div className="hidden lg:grid lg:grid-cols-12 bg-gray-200 gap-4 rounded-t-lg px-6 py-4 font-semibold text-gray-700">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Subtotal</div>
              <div className="col-span-1 text-center">Delete</div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 lg:space-y-0">
              {value.map((item, id) => (
                <div key={id} className="bg-white rounded-lg lg:rounded-t-none lg:rounded-b-lg shadow-sm border border-gray-200 lg:border-t-0">
                  <div className="p-4 sm:p-5 lg:p-6">
                    {/* Mobile & Tablet Layout */}
                    <div className="lg:hidden space-y-4">
                      {/* Product Info */}
                      <div className="flex gap-3 sm:gap-4">
                        <img
                          src={item?.images[0]?.src || "image1.jpg"}
                          alt={item?.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-lg sm:text-xl font-bold text-gray-900">
                            Rs {item.price}
                          </p>
                        </div>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex items-center justify-between gap-4 pt-3 border-t">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">Qty:</span>
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => changeQuantity(e.target.value, item.id)}
                            className="w-16 sm:w-20 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                            min="1"
                          />
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Subtotal</p>
                            <p className="text-lg sm:text-xl font-bold text-gray-900">
                              Rs {item.price * item.qty}
                            </p>
                          </div>
                          <button
                            onClick={() => remove(item.id)}
                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="col-span-5 flex gap-4">
                        <img
                          src={item?.images[0]?.src || "image1.jpg"}
                          alt={item?.name}
                          className="w-24 h-24 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base line-clamp-2">
                            {item.name}
                          </h3>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-center">
                        <span className="font-semibold text-gray-900">Rs {item.price}</span>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2 flex justify-center">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => changeQuantity(e.target.value, item.id)}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1"
                        />
                      </div>

                      {/* Subtotal */}
                      <div className="col-span-2 text-center">
                        <span className="font-bold text-gray-900 text-lg">
                          Rs {item.price * item.qty}
                        </span>
                      </div>

                      {/* Delete */}
                      <div className="col-span-1 flex justify-center">
                        <button
                          onClick={() => remove(item.id)}
                          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Totals Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Cart totals
              </h2>
              
              <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                <div className="flex justify-between items-center pb-3 sm:pb-4 border-b">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Subtotal</span>
                  <span className="text-lg sm:text-xl font-bold text-gray-900">
                    Rs {totalPrice}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Total</span>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">
                    Rs {totalPrice}
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.replace("/checkout")}
                className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;