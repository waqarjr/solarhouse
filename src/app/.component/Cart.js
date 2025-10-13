'use client'
import { Drama, ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"
import { X,Minus ,Plus } from "lucide-react"
import useStoreData from "@/app/lib/useStoreData";
import axios from "axios";

const Cart = () => {
const [openCart ,setOpenCart] = useState(false);
const {cart,toggleCart} = useStoreData();
const [data ,setData ] = useState([])

const getData = async (string)=>{
    try{
        const response = await axios.get(
        `https://solarhouse.pk/wp-json/wc/v3/products?include=${string}`,
        {
          auth: {
            username: "ck_99f7a958b70ea5326b2620d11d1ab448903842f5", 
            password: "cs_507c77fdcf49ed4b19fd444c23649a09dabffa97" 
          }
        }
      );
      setData(response.data);
      }catch (e){
        console.log(e.message);
      } 
  }
  
useEffect(()=>{
  const storageData = localStorage.getItem("name");
  const jsonObject= JSON.parse(storageData);
  const idData = jsonObject.map((value)=> {return  value.id});
  const string = idData.join(',');
  getData(string);
},[cart])
return (<>
<div className="relative">
  <div className="text-right max-w-7xl mx-auto">
    <button className=" relative cursor-pointer" onClick={() => setOpenCart(!openCart)}>
      <ShoppingBag />
      {data.length && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full size-4 flex items-center justify-center">
            {data.length}
          </span>
      )}
    </button>
  </div>
  
  {/* Overlay */}
  {openCart && (
    <div className="fixed inset-0 bg-gray-50/50  z-40 cursor-default" onClick={() => setOpenCart(false)}/>
  )}
  
  {/* Sliding Cart */}
  <div className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${ openCart ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className="p-4">
        {/* header */}
      <div className="bg-blue-600 rounded-sm text-white p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Shopping Cart {data.length}
        </h3>
        <button className="hover:bg-white/20 rounded-full p-1 transition-colors" onClick={()=> setOpenCart(!openCart)}>
            <X className="w-5 h-5" />
        </button>
      </div>
      {/* Content  */}
      { false ? (<>
          <div className="p-8 text-center  text-gray-400">
          <ShoppingBag className="w-16 h-16 mx-auto mb-3 opacity-30 " />
          <p>Your cart is empty</p>
        </div>
        </>) :(<>
          {data.map((value,id)=>(
            <div onClick={toggleCart} key={id} className="max-h-[400px] overflow-y-auto">
            <div className="py-2 space-y-3">
                <div  className="flex gap-3 bg-gray-50 rounded-md  hover:bg-gray-100 transition-colors group" >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                        <img  src={value?.images[0]?.src || "image1.jpg"}  alt="23"  className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 text-sm truncate">{value.name}</h4>
                        <p className="text-blue-600 font-semibold text-sm mt-1">{value.price}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                            <button className="w-6 h-6 cursor-pointer rounded-md bg-white hover:bg-gray-200 flex items-center justify-center transition-colors border border-gray-300">
                                <Minus className="w-3 h-3 text-gray-600" />
                            </button>
                            <span className="text-sm font-medium text-gray-700 w-6 text-center">23</span>
                            <button className="w-6 h-6 cursor-pointer rounded-md bg-white hover:bg-gray-200 flex items-center justify-center transition-colors border border-gray-300">
                                <Plus className="w-3 h-3 text-gray-600" />
                            </button>
                        </div>
                    </div>
                    <button className="cursor-pointer self-start opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 text-red-500 rounded-full p-1.5">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
          </div>))}
      </>)}
      {/* footer */}
      <div className="border-t border-gray-200 py-2 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 font-medium">Total:</span>
            <span className="text-2xl font-bold text-gray-800">$23</span>
        </div>
        <button className="w-full bg-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg">
            Checkout
        </button>
      </div>
    </div>
  </div>
</div>
  </>)

}

export default Cart