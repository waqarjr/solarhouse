import Link from "next/link";

const HeroSection = ({ url }) => {

  return (
    <>
      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-[20%_auto] mx-auto my-4 sm:my-6 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-0">
        {/* Gray Box - Responsive */}
        <div className="order-1 lg:order-2 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-gray-50 rounded-lg"></div>

        {/* Text Content - Responsive */}
        <div className="order-2 lg:order-1 flex flex-col justify-center px-2 sm:px-4 lg:ml-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold text-black mb-2">
            Shop
          </h1>
          <p className="text-xs sm:text-sm md:text-[14px] text-gray-700">
            <Link href="/" className="hover:text-blue-500 transition-colors">
              Home
            </Link>{" "}
            /{" "}
            {url.split("/").length === 3 ? (
              <>
                <Link href="/shop" className="hover:text-blue-500 transition-colors">
                  Shop
                </Link>{" "}
                /{" "}
                <span className="text-gray-600">{url.split("/")[2]}</span>
              </>
            ) : (
              <span className="text-gray-600">Shop</span>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default HeroSection;