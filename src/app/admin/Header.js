import React from 'react'

const Header = () => {
  return (<>
    <header className="bg-white shadow-sm p-4 flex items-center gap-4">
        <button 
        //  onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
    </header>
  </>)
}

export default Header;