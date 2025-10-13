import HeroSection from "@/app/.component/HeroSection";
import ItemsSection from "@/app/.component/ItemsSection";
import Products from "@/app/.component/Products"
const page = () => {

return (<>
  <HeroSection/>
  <div className='mx-auto max-w-7xl grid grid-cols-[20%_auto] items-start' >
    <ItemsSection />
    <Products />    
  </div>
  </>)
}

export default page