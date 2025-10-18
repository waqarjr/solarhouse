import React from 'react'

const page = () => {
  return (<>
  <form>
    
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        First name <span className="text-red-600">*</span>
      </label>
      <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Last name <span className="text-red-600">*</span>
      </label>
      <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
    </div>
  </div>

  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-900 mb-2">
      Display name <span className="text-red-600">*</span>
    </label>
    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
    <p className="text-sm text-gray-600 mt-2">
      This will be how your name will be displayed in the account section and in reviews
    </p>
  </div>

  <div className="mb-8">
    <label className="block text-sm font-medium text-gray-900 mb-2">
      Email address <span className="text-red-600">*</span>
    </label>
    <input type="email" autoComplete='email' className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
  </div>

  <div className="mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Password change</h3>
    
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Current password (leave blank to leave unchanged)
      </label>
      <input type="password" autoComplete='password' className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </div>
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        New password (leave blank to leave unchanged)
      </label>
      <input type="password" autoComplete='new-password' className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </div>
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">
       Confirm new password
      </label>
      <input type="password" autoComplete='confirmPassword' className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
    </div>
  </div>

  </form>
  </>)
}

export default page