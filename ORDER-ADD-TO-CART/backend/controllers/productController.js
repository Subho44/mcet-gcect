// src/controllers/productController.js
const Product = require("../models/Product");

// POST /api/products/seed
const seedProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      return res.json({ message: "Products already exist" });
    }

    const products = await Product.insertMany([
      { name: "iPhone 15", price: 80000 },
      { name: "Laptop Dell", price: 55000 },
      { name: "Bluetooth Headphone", price: 3000 }
    ]);

    res.json({ message: "Sample products created", products });
  } catch (err) {
    console.error("Seed error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  seedProducts,
  getProducts
};
