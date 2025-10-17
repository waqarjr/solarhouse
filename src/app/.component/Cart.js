'use client'
import { useEffect, useState } from "react"
import { X,ShoppingBag } from "lucide-react"
import useStoreData from "@/app/lib/useStoreData";
import { useRouter } from 'next/navigation';
import axios from "axios";

const Cart = () => {
const [openCart ,setOpenCart] = useState(false);
const {cart,toggleCart} = useStoreData();
const [data ,setData ] = useState([]);
const [value, setValue] = useState([]);
const [totalPrice ,setTotalPrice] = useState(0);
const router = useRouter();

const getData = async (string)=>{
    if (!string) return;
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
  if (!storageData) return;
  const jsonObject= JSON.parse(storageData);
  const idData = jsonObject.map((value)=> {return  value.id});
  const string = idData.join(',');
  getData(string);
},[cart])

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

  const remove = (id)=>{
      const storageData = localStorage.getItem("name");
      if (!storageData) return;
      const jsonObject= JSON.parse(storageData);
      const fil = jsonObject.filter(val => val.id !== id);
      const string = JSON.stringify(fil);
      localStorage.setItem("name",string);
      toggleCart();
  }


return (<>
<div className="relative">
    <button className="flex items-center justify-center gap-3 hover:text-blue-500 cursor-pointer transition-colors" onClick={() => setOpenCart(!openCart)}>
      <ShoppingBag />
      {value.length && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full size-4 flex items-center justify-center">
            {data.length}
          </span>
      )}
    </button>
  
  {/* Overlay */}
  {openCart && (
    <div className="fixed inset-0 bg-gray-50/50  z-40 cursor-default" onClick={() => setOpenCart(false)}/>
  )}
  
  {/* Sliding Cart */}
  <div className={`fixed cursor-default top-0 right-0 h-full w-[300px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${ openCart ? 'translate-x-0' : 'translate-x-full'}`}>
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
          {value.map((value,id)=>(
            <div key={id} className="max-h-[400px] overflow-y-auto">
            <div className="py-2 space-y-3">
                <div  className="flex gap-3 bg-gray-50 rounded-md  hover:bg-gray-100 transition-colors group" >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                        <img  src={value?.images[0]?.src || "image1.jpg"}  alt="23"  className="w-full h-full object-cover"/>
                    </div>
                    <div className="grid grid-rows-2">
                        <h4 className="font-medium text-gray-800 text-sm leading-4 line-clamp-3">{value.name}</h4>
                        <p className="text-blue-600 font-semibold text-sm mt-1">{value.price} * {value.qty} = {value.price * value.qty}</p>
                    </div>
                    <button onClick={()=>remove(value.id)} className="cursor-pointer self-start opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 text-red-500 rounded-full p-1.5">
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
            <span className="text-2xl font-bold text-gray-800">{totalPrice}</span>
        </div>
        <div className="grid grid-cols-2 gap-4" >
          <button  onClick={()=>router.push("/cart")}
          className="w-full hover:bg-blue-600 cursor-pointer bg-white text-black hover:text-white hover:border-blue-600 border-gray-400 border-2 py-2 rounded-xl font-semibold duration-300 ">
              View Cart
          </button>
          <button onClick={()=>router.push("/checkout")}
          className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-xl font-semibold  transition-all duration-300 hover:shadow-lg">
              Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  </>)

}

export default Cart