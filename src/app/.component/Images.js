const Images = () => {
  return (
    <div className="max-w-7xl mx-auto h-auto lg:h-screen p-4 sm:p-6 lg:p-2 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 h-full">
        
        {/* Large Left Image */}
        <div 
          className="relative bg-cover bg-center rounded-xl overflow-hidden group cursor-pointer min-h-[300px] sm:min-h-[400px] md:min-h-full transition-all duration-500 hover:shadow-md" 
          style={{ backgroundImage: "url('/Categories-banners-1.jpg')" }}
        >
          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
          
          {/* Scale Effect on Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: "url('/Categories-banners-1.jpg')" }}
          ></div>

          {/* Button */}
          <div className="absolute bottom-0 left-0 bg-white rounded-tr-3xl sm:rounded-tr-4xl px-4 sm:px-6 py-3 sm:py-4 z-10 group-hover:bg-blue-50 transition-all duration-300">
            <button className="px-4 sm:px-6 py-2 bg-blue-500 text-white hover:bg-gray-800 cursor-pointer rounded-2xl text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 active:scale-95">
              Solar Panels
            </button>
          </div>
        </div>

        {/* Right Side Grid */}
        <div className="grid grid-rows-2 gap-3 sm:gap-4">
          
          {/* Top Row - Two Small Images */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            
            {/* Solar Inverters */}
            <div 
              className="relative rounded-xl overflow-hidden group cursor-pointer min-h-[180px] sm:min-h-[200px] transition-all duration-500 hover:shadow-2xl" 
              style={{ backgroundImage: "url('/Solar-Inverters.jpg')" }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: "url('/Solar-Inverters.jpg')" }}
              ></div>
              
              <div className="absolute left-0 bottom-0 bg-white rounded-tr-3xl px-3 sm:px-4 py-2 sm:py-3 z-10 group-hover:bg-blue-50 transition-all duration-300">
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white hover:bg-gray-800 cursor-pointer rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95">
                  Solar Inverters
                </button>
              </div>
            </div>

            {/* VP Protectors */}
            <div 
              className="relative rounded-xl overflow-hidden group cursor-pointer min-h-[180px] sm:min-h-[200px] transition-all duration-500 hover:shadow-2xl" 
              style={{ backgroundImage: "url('/va-protectors-compress.png')" }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: "url('/va-protectors-compress.png')" }}
              ></div>
              
              <div className="absolute left-0 bottom-0 bg-white rounded-tr-3xl px-3 sm:px-4 py-2 sm:py-3 z-10 group-hover:bg-blue-50 transition-all duration-300">
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white hover:bg-gray-800 cursor-pointer rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95">
                  VP Protectors
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row - One Wide Image */}
          <div 
            className="relative rounded-xl overflow-hidden group cursor-pointer min-h-[180px] sm:min-h-[200px] transition-all duration-500 hover:shadow-2xl" 
            style={{ backgroundImage: "url('/Futuristic-VFD-Display-Compress.png')" }}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: "url('/Futuristic-VFD-Display-Compress.png')" }}
            ></div>
            
            <div className="absolute left-0 bottom-0 bg-white rounded-tr-3xl sm:rounded-tr-4xl px-3 sm:px-4 py-2 sm:py-3 z-10 group-hover:bg-blue-50 transition-all duration-300">
              <button className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-500 text-white hover:bg-gray-800 cursor-pointer rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95">
                Variable Frequency Drive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Images