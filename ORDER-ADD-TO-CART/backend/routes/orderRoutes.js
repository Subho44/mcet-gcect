// src/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const { placeOrder, getOrders } = require("../controllers/orderController");

// POST /api/orders
router.post("/", placeOrder);

// GET /api/orders
router.get("/", getOrders);

module.exports = router;
