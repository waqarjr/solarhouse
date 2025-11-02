import Link from "next/link";

const HeroSection = ({ url }) => {

  return (
    <>
      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-[20%_auto] mx-auto my-4 gap-6">
        {/* Right Section (Main Content Box) - show first on mobile */}
        <div className="order-1 lg:order-2 h-[400px] bg-gray-50"></div>

        {/* Left Section (Title & Breadcrumb) - show second on mobile */}
        <div className="order-2 lg:order-1 flex flex-col justify-center ml-4">
          <h1 className="text-[36px] text-black">Shop</h1>
          <p className="text-[14px]">
            <Link href="/">Home</Link> /{" "}
            {url.split("/").length === 3 ? (
              <>
                <Link href="/shop">Shop</Link> /{" "}
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
