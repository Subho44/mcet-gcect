// src/controllers/cartController.js
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// POST /api/cart/add
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ error: "productId and quantity are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({
        product: productId,
        quantity: Number(quantity)
      });
    }

    await cart.save();
    await cart.populate("items.product");

    res.json({ message: "Product added to cart", cart });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/cart
const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart) {
      return res.json({ userId, items: [] });
    }

    res.json(cart);
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE /api/cart
const clearCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.json({ message: "Cart already empty" });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Clear cart error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  clearCart
};
