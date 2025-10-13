import Link from "next/link"
const HeroSection = () => {
  return (<>
  <div className="max-w-7xl grid grid-cols-[20%_auto] mx-auto  my-4" >
    <div className=" flex flex-col  justify-center ml-4" >
        <h1 className="text-[36px] text-black " >Shop</h1>
        <p className="text-[14px]" >
            <Link href="/" >Home</Link> / <span className="text-gray-300" >Shop</span>
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