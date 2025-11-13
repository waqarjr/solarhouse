'use client'
import { useEffect, useState, useRef } from "react";
import { X, ShoppingBag } from "lucide-react";
import useStoreData from "@/app/lib/useStoreData";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import Swal from "sweetalert2";

const Cart = () => {
  const [openCart, setOpenCart] = useState(false);
  const { cart, toggleCart } = useStoreData();
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const isInitialMount = useRef(true);
  const lastAction = useRef(null);

  const getData = async (string, showAlert = false) => {
    if (!string) return;
    try {
      const response = await api.get(`/products?include=${string}`);
      setData(response.data);

    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const storageData = localStorage.getItem("name");
    if (!storageData) {
      setData([]);
      return;
    }

    const jsonObject = JSON.parse(storageData);
    const idData = jsonObject.map((v) => v.id);

    if (idData.length === 0) {
      setData([]);
      setOpenCart(false);
      return;
    }

    const string = idData.join(",");
    
    // On initial mount, don't show alert
    if (isInitialMount.current) {
      getData(string, false);
      isInitialMount.current = false;
    } else {
      // On subsequent changes, show alert only if it was an add action
      getData(string, true);
    }
  }, [cart]);

  useEffect(() => {
    const storageData = localStorage.getItem("name");
    if (!storageData || data.length === 0) {
      setValue([]);
      setTotalPrice(0);
      setOpenCart(false);
      return;
    }

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

  const remove = (id) => {
    const storageData = localStorage.getItem("name");
    if (!storageData) return;

    const jsonObject = JSON.parse(storageData);
    const fil = jsonObject.filter((val) => val.id !== id);
    localStorage.setItem("name", JSON.stringify(fil));
    
    lastAction.current = 'remove';
    toggleCart();

    if (fil.length === 0) {
      setData([]);
      setValue([]);
      setTotalPrice(0);
      setOpenCart(false);
    }

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    Toast.fire({
      icon: "error",
      title: "Product removed successfully",
    });
  };

  // Track when products are added (call this from your add to cart functions)
  useEffect(() => {
    // Listen for storage events from other components
    const handleStorageChange = (e) => {
      if (e.key === 'cart-action') {
        lastAction.current = e.newValue;
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (data.length === 0) {
    return (
      <div className="relative">
        <button disabled className="flex items-center justify-center gap-3 text-gray-400 cursor-not-allowed transition-colors">
          <ShoppingBag />
          <span className="absolute -top-1 -right-1 bg-gray-300 text-white text-xs font-bold rounded-full size-4 flex items-center justify-center">
            0
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button className="flex items-center justify-center gap-3 hover:text-blue-600 cursor-pointer transition-all" onClick={() => setOpenCart(!openCart)}>
        <ShoppingBag />
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full size-4 flex items-center justify-center">
          {data.length}
        </span>
      </button>

      {openCart && (
        <>
          <div className="fixed inset-0 bg-gray-800/40 z-40 backdrop-blur-sm animate-fadeIn" onClick={() => setOpenCart(false)} />

          <div className={`fixed cursor-default top-0 right-0 h-full w-[500px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${openCart ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-5 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Cart ({data.length})
                </h3>
                <button className="hover:bg-gray-200 rounded-full p-1 transition" onClick={() => setOpenCart(false)}>
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Products */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {value.map((item, id) => (
                  <div key={id} className="flex gap-3 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all group">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white shadow-sm">
                      <Image src={item?.images?.[0]?.src || "/placeholder.jpg"} alt={item?.name || "Product image"} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <h4 className="font-medium text-gray-800 text-sm leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-blue-600 font-semibold text-sm">
                        {item.price} × {item.qty} ={" "}
                        <span className="text-black">
                          {item.price * item.qty}
                        </span>
                      </p>
                    </div>
                    <button onClick={() => remove(item.id)} className="opacity-0 group-hover:opacity-100 w-6 h-6 text-red-500 hover:bg-red-100 rounded-full p-1 transition">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600 font-medium">Total:</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {totalPrice}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => { setOpenCart(false); router.push("/cart"); }} className="w-full hover:bg-blue-600 bg-white text-gray-700 hover:text-white border-2 border-gray-300 hover:border-blue-600 py-2 rounded-xl font-semibold duration-300">
                    View Cart
                  </button>
                  <button onClick={() => { setOpenCart(false); router.push("/checkout"); }} className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;