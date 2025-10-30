import Link from "next/link";
const HeroSection = ({url}) => {


  if(true ) {
    return (<>
    <div className="max-w-7xl grid grid-cols-[20%_auto] mx-auto my-4 animate-pulse">
      {/* Left Section (Title & Breadcrumb) */}
      <div className="flex flex-col justify-center ml-4">
        {/* Title */}
        <div className="h-8 w-32 bg-gray-200 rounded mb-3"></div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 bg-gray-200 rounded"></div>
          <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
          <div className="h-3 w-12 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Right Section (Main Content Box) */}
      <div className="h-[400px] bg-gray-100 rounded-md mx-4"></div>
    </div>
    </>)
  }

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