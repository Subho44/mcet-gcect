// src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import { getProducts, seedProducts, addToCart } from "../api";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setMsg("");
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setMsg("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSeed = async () => {
    try {
      setMsg("");
      await seedProducts();
      await loadProducts();
      setMsg("Sample products created / loaded.");
    } catch (err) {
      console.error(err);
      setMsg("Error seeding products");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      setMsg("");
      await addToCart(productId, 1);
      setMsg("Added to cart ✅");
    } catch (err) {
      console.error(err);
      setMsg("Error adding to cart");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={loadProducts} style={{ marginRight: "10px" }}>
          Refresh Products
        </button>
        <button onClick={handleSeed}>Seed Sample Products</button>
      </div>

      {loading && <p>Loading products...</p>}
      {msg && <p>{msg}</p>}

      {products.length === 0 && !loading && (
        <p>No products found. Try click "Seed Sample Products".</p>
      )}

      <div style={{ display: "grid", gap: "15px" }}>
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "6px",
            }}
          >
            <h3>{p.name}</h3>
            <p>Price: ₹{p.price}</p>
            <button onClick={() => handleAddToCart(p._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
