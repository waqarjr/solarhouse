'use client'
import axios from "axios";
import useStoreData from "./useStoreData";
import { useState, useEffect } from "react";

const CartData = ()=>{

    const {cart} = useStoreData();
    const [data ,setData ] = useState([]);
    const [value, setValue] = useState([]);

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
        console.error(e.message);
      } 
}

useEffect(()=>{
  const storageData = localStorage.getItem("name");
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

    setValue(merged);
  }, [data]);  

  return value;
}
export default CartData;