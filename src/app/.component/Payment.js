import { useEffect, useState } from "react";
import api from "../lib/api";

import useStoreData from "../lib/useStoreData";

const Payment = () => {

  const {payment,setPayment} = useStoreData();
  const [data ,setData] = useState([])
  const getData = async()=>{
  const response =  await api.get('/payment_gateways');
    setData(response.data);
  }

  useEffect(()=>{
    getData()
  },[])  
  
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className={"border-b border-gray-300 p-4 flex flex-col gap-2  "} >
        <div className="flex items-center " >
          <input type="radio" id="cod" name="payment" checked={payment === "cod,Cash on delivery"} onChange={()=>setPayment("cod,Cash on delivery")} 
          className="w-5 h-5 text-blue-600 cursor-pointer"/>
          <label htmlFor="cod"  className="ml-3 text-lg font-medium text-gray-800 cursor-pointer" >
            Cash on delivery
          </label>
        </div>

        {payment === "cod,Cash on delivery" && (
          <p className="ml-8 text-sm text-gray-600">
            <span dangerouslySetInnerHTML={{ __html: data[0]?.description }} />
          </p>
        )}
      </div>

      <div className={"p-4 flex flex-col gap-2 "}  >
        <div className="flex items-center "  >
          <input type="radio" id="bank" name="payment" checked={payment === "bacs,Bank Deposit"} onChange={()=>setPayment("bacs,Bank Deposit")} 
            className="w-5 h-5 text-blue-600 cursor-pointer"/>
          <label htmlFor="bank" className="ml-3 text-lg font-medium text-gray-800  cursor-pointer">
            Bank Deposit
          </label>
        </div>

        {payment === "bacs,Bank Deposit" && (
          <p className="ml-8 text-sm text-gray-600">
            <span dangerouslySetInnerHTML={{ __html: data[1]?.description }} />
          </p>
        )}
      </div>
    </div>
  );
};

export default Payment;
