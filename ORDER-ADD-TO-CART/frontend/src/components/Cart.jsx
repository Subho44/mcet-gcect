// src/components/Cart.jsx
import React, { useEffect, useState } from "react";
import { getCart, clearCart, placeOrder } from "../api";

function Cart({ onOrderPlaced }) {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const loadCart = async () => {
    try {
      setLoading(true);
      setMsg("");
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      console.error(err);
      setMsg("Error loading cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleClearCart = async () => {
    try {
      setMsg("");
      await clearCart();
      await loadCart();
      setMsg("Cart cleared");
    } catch (err) {
      console.error(err);
      setMsg("Error clearing cart");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setMsg("");
      const res = await placeOrder();
      setMsg("Order placed successfully ✅");
      await loadCart();
      if (onOrderPlaced) onOrderPlaced();
      console.log("Order response:", res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) {
        setMsg(err.response.data.error);
      } else {
        setMsg("Error placing order");
      }
    }
  };

  const total = cart.items?.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div>
      <h2>Cart</h2>
      {loading && <p>Loading cart...</p>}
      {msg && <p>{msg}</p>}

      {!loading && (!cart.items || cart.items.length === 0) && (
        <p>Your cart is empty.</p>
      )}

      {cart.items && cart.items.length > 0 && (
        <>
          <table width="100%" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Product</th>
                <th style={{ borderBottom: "1px solid #ccc" }}>Price</th>
                <th style={{ borderBottom: "1px solid #ccc" }}>Qty</th>
                <th style={{ borderBottom: "1px solid #ccc" }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item._id}>
                  <td style={{ borderBottom: "1px solid #eee" }}>
                    {item.product?.name || "Unknown"}
                  </td>
                  <td style={{ borderBottom: "1px solid #eee", textAlign: "center" }}>
                    ₹{item.product?.price}
                  </td>
                  <td style={{ borderBottom: "1px solid #eee", textAlign: "center" }}>
                    {item.quantity}
                  </td>
                  <td style={{ borderBottom: "1px solid #eee", textAlign: "center" }}>
                    ₹{(item.product?.price || 0) * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: "10px" }}>Total: ₹{total}</h3>

          <div style={{ marginTop: "10px" }}>
            <button onClick={handlePlaceOrder} style={{ marginRight: "10px" }}>
              Place Order
            </button>
            <button onClick={handleClearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
