// src/controllers/orderController.js
const Cart = require("../models/Cart");
const Order = require("../models/Order");

// POST /api/orders
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    let total = 0;
    const orderItems = cart.items.map((item) => {
      const price = item.product.price;
      const qty = item.quantity;

      total += price * qty;

      return {
        product: item.product._id,
        quantity: qty,
        priceAtPurchase: price
      };
    });

    const order = new Order({
      userId,
      items: orderItems,
      totalAmount: total
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Place order error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/orders
const getOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  placeOrder,
  getOrders
};
