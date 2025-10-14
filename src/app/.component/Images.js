
const Images = () => {
return (<>

<div className="max-w-7xl mx-auto h-auto lg:h-screen p-2 my-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
    <div className=" relative bg-cover bg-center rounded-xl   transition-transform duration-500" 
    style={{ backgroundImage: "url('/Categories-banners-1.jpg')" }}>
        <div className="absolute bottom-0 bg-white rounded-tr-4xl px-4 py-2" >
            <button className="px-4 py-1 bg-blue-500 text-white hover:bg-gray-800  cursor-pointer rounded-2xl" >Solar Panels</button>
        </div>
    </div>

    <div className="grid grid-rows-2 gap-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="relative  rounded-xl flex items-center justify-center bg-cover bg-center  transition-transform duration-500" 
        style={{ backgroundImage: "url('/Solar-Inverters.jpg')" }}>
            <div className="absolute  left-0 bottom-0 bg-white rounded-tr-4xl px-4 py-2 z-40" >
                <button className="px-4 py-1 bg-blue-500 text-white hover:bg-gray-800  cursor-pointer rounded-2xl" >Solar Inverters</button>
            </div>
        </div>
        <div className="relative rounded-xl  bg-center bg-cover  transition-transform duration-500" 
        style={{ backgroundImage: "url('/va-protectors-compress.png')" }}>
            <div className="absolute  left-0 bottom-0 bg-white rounded-tr-4xl px-4 py-2" >
                <button className="px-4 py-1 bg-blue-500 text-white hover:bg-gray-800  cursor-pointer rounded-2xl" >VP Protectors</button>
            </div>
        </div>
      </div>

      <div className="relative rounded-xl flex items-center justify-center bg-cover bg-center  transition-transform duration-500" 
      style={{backgroundImage: "url('/Futuristic-VFD-Display-Compress.png')"}} >
        <div className="absolute left-0 bottom-0 bg-white rounded-tr-4xl px-4 py-2" >
                <button className="px-4 py-1 bg-blue-500 text-white hover:bg-gray-800  cursor-pointer rounded-2xl" >Variable Frequency Drive</button>
            </div>
      </div>
    </div>
  </div>
</div>

  </>)
}

export default Images