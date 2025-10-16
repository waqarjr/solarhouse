import Link from "next/link";
const HeroSection = ({url}) => {

  return (<>

  <div className="max-w-7xl grid grid-cols-[20%_auto] mx-auto  my-4" >
    <div className=" flex flex-col  justify-center ml-4" >
        <h1 className="text-[36px] text-black " >Shop</h1>
        <p className="text-[14px]" >
            <Link href="/" >Home</Link> / {
              url.split('/').length === 3 ? (<>
              <Link href="/shop" >Shop</Link> / <span className="text-gray-600" >{url.split('/')[2]}</span>
              </>) :<span className="text-gray-600" >Shop</span>
            }
        </p>
    </div>
    <div>
        <div className=" h-[400px] bg-gray-50" >

        </div>
    </div>
  </div>
  </>)
}

export default HeroSection