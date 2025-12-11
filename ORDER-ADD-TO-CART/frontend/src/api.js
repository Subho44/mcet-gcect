// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5600/api",
});

export const getProducts = () => api.get("/products");
export const seedProducts = () => api.post("/products/seed");

export const addToCart = (productId, quantity = 1) =>
  api.post("/cart/add", { productId, quantity });

export const getCart = () => api.get("/cart");
export const clearCart = () => api.delete("/cart");

export const placeOrder = () => api.post("/orders");
export const getOrders = () => api.get("/orders");

export default api;
