'use client'
import { useState } from 'react';
import { Home, ShoppingCart, Users, BarChart3, Settings,Menu, X } from 'lucide-react';
import Link from "next/link";
import "../globals.css";

export default  function Layout({children}) {
      const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: ShoppingCart, label: 'Products', href: '/admin/products' },
    { icon: Users, label: 'Customers', href: '#' },
    { icon: BarChart3, label: 'Analytics', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ];
    return(<>
    
    <html>
      <body>
<div className="flex flex-2 ">
          {/* Mobile Overlay */}  
          {isOpen && (
            <div className="fixed bg-black opacity-70 inset-0 z-40 lg:hidden "
              onClick={() => setIsOpen(false)}/>
          )}

          {/* Sidebar */}
          <aside
            className={`fixed h-screen lg:static inset-y-0 left-0 z-50 bg-slate-900 text-white transition-all duration-300 ease-in-out
              ${isOpen ? 'translate-x-0' : '-translate-x-full'}
              ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} lg:translate-x-0 w-64 `}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <p className={` font-bold text-xl transition-opacity duration-300 ${isCollapsed ? 'lg:opacity-0 lg:hidden' : 'opacity-100'} `}>
                MyApp
              </p>
              
              {/* Desktop Toggle */}
              <button onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:block p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer" >
                <Menu className="w-5 h-5" />
              </button>

              {/* Mobile Close */}
              <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link key={index} href={item.href} className={` flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800 transition-colors
                      ${isCollapsed ? 'lg:justify-center' : ''} `}
                    title={isCollapsed ? item.label : ''}>
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className={`transition-opacity duration-300 ${isCollapsed ? 'lg:opacity-0 lg:hidden' : 'opacity-100'}`} >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </aside>
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Bar */}
            <header className="bg-white shadow-sm p-4 flex items-center gap-4">
              <button  onClick={() => setIsOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
        
    </>)
}