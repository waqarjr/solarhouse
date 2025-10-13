'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Heart, Search, ShoppingBag, User, Menu, X } from 'lucide-react'
import Cart from "@/app/.component/Cart";
const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navlinks = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "All Products",
            link: "/shop",
        },
        {
            name: "Solar Inverter",
            link: "/solar-inverter"
        },
        {
            name: "Solar Panels",
            link: "/solar-panels"
        },
        {
            name: "Lithium Batteries",
            link: "/lithium-batteries"
        },
        {
            name: "Vp Protections",
            link: "/vp-protections"
        },
        {
            name: "Contact Us",
            link: "/contact"
        },
    ]
    
    const pathName = usePathname();

    return (
        <>
        <header className=' relative bg-white shadow-sm z-50'>
            <div className='w-full h-[100px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 '>
                {/* Desktop Header */}
                <div className='hidden lg:grid grid-cols-[20%_auto_10%]  h-full'>
                    {/* Logo */}
                    <div className='flex items-center '>
                        <Image src="/logo.png" width={230} height={0} priority alt="logo_image" className='w-auto' />
                    </div>

                    {/* Navigation Links */}
                    <ul className='flex items-center justify-center gap-3 '>
                        {navlinks.map((v) => {
                            const isActive = pathName === v.link;
                            return (
                                <li key={v.name}>
                                    <Link 
                                        className={`${isActive ? "text-blue-500" : "text-black"} font-semibold hover:text-blue-500 transition-colors`} 
                                        href={v.link}
                                    >
                                        {v.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                    {/* Icons */}
                    <div className=' flex items-center justify-center gap-3 [&>*]:hover:text-blue-500 [&>*]:cursor-pointer [&>*]:transition-colors'>
                        <User />
                        <Search />
                        <Heart />
                        <Cart />
                    </div>
                </div>

                {/* Mobile/Tablet Header */}
                <div className=' lg:hidden flex items-center justify-between h-full'>
                    {/* Logo */}
                    <div className='flex items-center'>
                        <Image src="/logo.png" width={180} height={0} priority alt="logo_image" className='w-auto' />
                    </div>

                    {/* Mobile Icons & Menu Button */}
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-3 [&>*]:hover:text-blue-500 [&>*]:cursor-pointer [&>*]:transition-colors'>
                            <Search className='w-5 h-5' />
                            <Heart className='w-5 h-5' />
                            <ShoppingBag className='w-5 h-5' />
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className='ml-2 p-2 hover:text-blue-500 transition-colors'
                            aria-label='Toggle menu'
                        >
                            {isMobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={` absolute w-full lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
                    isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0' }`}>
                <div className='bg-white border-t border-gray-200 shadow-lg'>
                    <nav className='max-w-7xl mx-auto px-4 sm:px-6 py-4'>
                        <ul className='flex flex-col space-y-1'>
                            {navlinks.map((v) => {
                                const isActive = pathName === v.link;
                                return (
                                    <li key={v.name}>
                                        <Link className={`${isActive ? "text-blue-500 bg-blue-50" : "text-black hover:bg-gray-50"
                                            } font-semibold block px-4 py-3 rounded-lg transition-all`} href={v.link} onClick={() => setIsMobileMenuOpen(false)}>
                                            {v.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                        {/* User Icon in Mobile Menu */}
                        <div className='mt-4 pt-4 border-t border-gray-200'>
                            <Link  href="/account" className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors' onClick={() => setIsMobileMenuOpen(false)} >
                                <User className='w-5 h-5' />
                                <span className='font-semibold'>My Account</span>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
        </>
    )
}

export default Header