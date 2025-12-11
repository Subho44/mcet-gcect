// src/routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const { addToCart, getCart, clearCart } = require("../controllers/cartController");

// POST /api/cart/add
router.post("/add", addToCart);

// GET /api/cart
router.get("/", getCart);

// DELETE /api/cart
router.delete("/", clearCart);

module.exports = router;
