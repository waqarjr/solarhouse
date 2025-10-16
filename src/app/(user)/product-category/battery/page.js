
import Items from "./Items"
import Products from "./Products"
const page = () => {
 
return (<>
  <div className='mx-auto max-w-7xl grid grid-cols-[20%_auto] items-start' >
    <Items/>
    <Products/>
  </div>
</>)
}

export default page