import React,{useState} from 'react'
import Productlist from './components/Productlist';
import Cart from './components/Cart';
import Orders from './components/Orders';

const App = () => {
  const [activeTab,setActiveTab] = useState("products");
  const [reloadOrders,setReloadOrders] = useState(false);


  return <>
  <div style={{maxWidth:"900px", margin:"0 auto", padding:"20px"}}>
  <h1 style={{textAlign:"center"}}>Products cart process</h1>

  <div  style={{display:"flex", gap:"10px",margin:"20px 0"}}>
    <button onClick={()=>setActiveTab("products")}
           style={{
            padding:"8px 16px",
            background:activeTab ==="products" ? "#333" :"#eee",
            color:activeTab ==="products" ? "#fff":"#000",
            border:"1px solid #ccc",
            cursor:"pointer"
           }}>
      Products
    </button>
    <button onClick={()=>setActiveTab("cart")}
           style={{
            padding:"8px 16px",
            background:activeTab ==="cart" ? "#333" :"#eee",
            color:activeTab ==="cart" ? "#fff":"#000",
            border:"1px solid #ccc",
            cursor:"pointer"
           }}>
      Cart
    </button>
    <button onClick={()=>setActiveTab("orders")}
           style={{
            padding:"8px 16px",
            background:activeTab ==="orders" ? "#333" :"#eee",
            color:activeTab ==="orders" ? "#fff":"#000",
            border:"1px solid #ccc",
            cursor:"pointer"
           }}>
      Orders
    </button>
  </div>

  {activeTab === "products" && <Productlist/>}
  {activeTab ==="cart" && (
    <Cart onOrderplaced ={()=>setReloadOrders((prev)=>!prev)} />
  )}
  {activeTab ==="orders" && <Orders reloadFlag={reloadOrders}/>}
  </div>

  </>
}

export default App