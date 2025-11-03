import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const pathName = usePathname();

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[30%_auto] items-center gap-6 my-8 px-4">
      {/* Left Section */}
      <div className="flex flex-col justify-center gap-3 text-center md:text-left">
        {/* Breadcrumb */}
        <p className="text-sm sm:text-base flex flex-wrap justify-center md:justify-start gap-2 text-gray-600">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          /
          {pathName.split("/").length === 3 ? (
            <>
              <Link href="/my-account" className="hover:text-blue-500">
                My account
              </Link>
              /
              <span className="text-gray-900 capitalize">
                {pathName.split("/")[2]}
              </span>
            </>
          ) : (
            <span className="text-gray-600">My account</span>
          )}
        </p>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-[45px] text-black font-bold">
          My account
        </h1>
      </div>

      {/* Right Section (Empty or for future use) */}
      <div className="hidden md:block"></div>
    </div>
  );
};

export default Header;
