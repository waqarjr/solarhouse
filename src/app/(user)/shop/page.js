'use client'
import HeroSection from "@/app/.component/HeroSection";
import ItemsSection from "@/app/.component/ItemsSection";
import Products from "@/app/.component/Products"
import { usePathname } from "next/navigation";

const page = () => {
const pathName = usePathname();
return (<>
  <HeroSection url={pathName}/>
  <div className='mx-auto max-w-7xl grid grid-cols-[20%_auto] items-start' >
    <ItemsSection />
    <Products />    
  </div>
  </>)
}

export default page