import { CreditCard, Headphones, Shield, Truck } from "lucide-react"

const value = [
  {
    heading: "Free Shipping",
    p: "Free Shipping for orders",
    icon: <Truck />
  },
  {
    heading: "Money Guarantee",
    p: "Within 30 days",
    icon: <Shield />
  },
  {
    heading: "Online Support",
    p: "24 hours a day, 7 days a week",
    icon: <Headphones />
  },
  {
    heading: "Flexible Payment",
    p: "Cash On Delivery",
    icon: <CreditCard />
  },
]

const Shipping = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
        {value.map((item, id) => (
          <div 
            key={id} 
            className="flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-lg group cursor-pointer border border-gray-100"
          >
            {/* Icon Container */}
            <div className="flex-shrink-0 border-2 border-gray-200 rounded-full p-3 sm:p-4 text-gray-800 group-hover:border-blue-500 group-hover:text-blue-500 group-hover:bg-blue-50 transition-all duration-300 group-hover:scale-110">
              {item.icon}
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center">
              <h2 className="font-semibold text-base sm:text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {item.heading}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5 leading-relaxed">
                {item.p}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shipping