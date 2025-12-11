// src/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { seedProducts, getProducts } = require("../controllers/productController");

// POST /api/products/seed
router.post("/seed", seedProducts);

// GET /api/products
router.get("/", getProducts);

module.exports = router;
