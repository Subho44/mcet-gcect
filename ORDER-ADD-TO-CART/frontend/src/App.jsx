// src/App.jsx
import React, { useState } from "react";
import ProductList from "./components/Productlist.jsx";
import Cart from "./components/Cart.jsx";
import Orders from "./components/Orders.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("products");
  const [reloadOrders, setReloadOrders] = useState(false);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Product Add To Cart Proccess</h1>

      <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        <button
          onClick={() => setActiveTab("products")}
          style={{
            padding: "8px 16px",
            background: activeTab === "products" ? "#333" : "#eee",
            color: activeTab === "products" ? "#fff" : "#000",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("cart")}
          style={{
            padding: "8px 16px",
            background: activeTab === "cart" ? "#333" : "#eee",
            color: activeTab === "cart" ? "#fff" : "#000",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Cart
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          style={{
            padding: "8px 16px",
            background: activeTab === "orders" ? "#333" : "#eee",
            color: activeTab === "orders" ? "#fff" : "#000",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Orders
        </button>
      </div>

      {activeTab === "products" && <ProductList />}
      {activeTab === "cart" && (
        <Cart onOrderPlaced={() => setReloadOrders((prev) => !prev)} />
      )}
      {activeTab === "orders" && <Orders reloadFlag={reloadOrders} />}
    </div>
  );
}

export default App;
