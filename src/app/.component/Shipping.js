import { CreditCard, Headphones,  Shield, Truck } from "lucide-react"

const value = [
{
    heading :"Free Shipping",
    p:"Free Shipping for orders",
    icon:<Truck/>
},
{
    heading :"Money Guarantee",
    p:"Within 30 days",
    icon:<Shield/>
},
{
    heading :"Online Support",
    p:"24 hours a day, 7 days a week",
    icon:<Headphones/>
},
{
    heading :"Flexible Payment",
    p:"Cash On Delivery",
    icon:<CreditCard/>
},
]

const Shipping = () => {
  return (<>
    <div className="max-w-7xl mx-auto h-[161px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-center p-4" >
        {value.map((value,id)=>(
            <div key={id} className="grid grid-cols-[20%_auto] gap-3  h-[61px]  " >
            <div className="border-gray-200 border-2 rounded-full p-4 text-gray-800" > 
             {value.icon}
            </div>
             <div className="flex flex-col justify-center">
                <h2 className="font-semibold text-lg sm:text-xl">{value.heading}</h2>
                <p className="text-sm text-gray-600">{value.p}</p>
            </div>
        </div>
        ))} 
    </div>
  </>)
}

export default Shipping