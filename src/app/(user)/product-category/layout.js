'use client'
import HeroSection from "@/app/.component/HeroSection";
import { usePathname } from 'next/navigation'

export default  function layout({children}) {
const pathName = usePathname();
return(<>
    <HeroSection url={pathName}  />
    {children}
</>)

}