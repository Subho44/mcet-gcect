// src/components/Orders.jsx
import React, { useEffect, useState } from "react";
import { getOrders } from "../api";

function Orders({ reloadFlag }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setMsg("");
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      setMsg("Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [reloadFlag]);

  return (
    <div>
      <h2>Orders</h2>
      {loading && <p>Loading orders...</p>}
      {msg && <p>{msg}</p>}

      {orders.length === 0 && !loading && <p>No orders found.</p>}

      <div style={{ display: "grid", gap: "15px" }}>
        {orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "6px",
            }}
          >
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>
            <p>
              <strong>Items:</strong>
            </p>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.product?.name} × {item.quantity} (₹
                  {item.priceAtPurchase} each)
                </li>
              ))}
            </ul>
            <p style={{ fontSize: "12px", color: "#666" }}>
              Placed at:{" "}
              {new Date(order.createdAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
