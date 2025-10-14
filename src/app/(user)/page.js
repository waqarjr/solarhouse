import Carousal from "@/app/.component/Carousal";  
import SlidePerView from "@/app/.component/SlidePerView";
import NewArival from "@/app/.component/NewArival";
import Images from "@/app/.component/Images";
import RowImage from "@/app/.component/RowImage";
import Shipping from "@/app/.component/Shipping";
export default function Home() {
  return (<>
<Carousal />
<SlidePerView />
<NewArival />
<Images/>
<RowImage />
<Shipping />
  </>);
}
