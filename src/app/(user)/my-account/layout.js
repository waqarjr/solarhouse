'use client'
import React from 'react'
import Header from './Header'
import { LayoutDashboard, Package, Download, MapPin, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function Layout({ children }) {
  
  const pathName = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href:"/my-account" },
    { icon: Package, label: "Orders",href:"/my-account/orders" },
    { icon: Download, label: "Downloads", href:"/my-account/downloads" },
    { icon: MapPin, label: "Addresses", href:"/my-account/edit-address" },
    { icon: User, label: "Account details", href:"/my-account/edit-account" },
  ];


  return (  
    <>
        <Header />
        <div className="min-h-screen grid grid-cols-[20%_auto]  max-w-7xl mx-auto">
          <aside className="">
            <nav className="p-4">
              {menuItems.map( item => {
                const Icon = item.icon;
                return (
                  <Link href={item.href} key={item.label} 
                  className={`flex items-center justify-start gap-3 border-b border-gray-200 py-4 px-2 my-2 cursor-pointer  hover:text-blue-500 transition-colors text-blue-500
                  ${pathName == item.href ? "text-blue-500" : "text-gray-700"}
                  `}>
                    <Icon className="w-6 h-6" />
                    <p className="text-base font-medium">{item.label}</p>
                  </Link>
                );
              })}
              <button className="w-full flex items-center justify-start gap-3 border-b border-gray-200 py-4 px-2 my-2 cursor-pointer text-gray-700 hover:text-red-500 transition-colors">
                    <LogOut className="w-6 h-6" />
                    <p className="text-base font-medium">Log Out</p>
              </button>
            </nav>
          </aside>
          <main className="p-8">
            {children}
          </main>
        </div>
    </>
  )
}