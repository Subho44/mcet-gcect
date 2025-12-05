require("dotenv").config();
const express = require("express");
const cors = require("cors");
const demoUser = require("./middleware/demoUser");
const connectdb = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
connectdb();
const PORT = process.env.PORT || 5600;
// Middleware
app.use(cors());
app.use(express.json());

app.use(demoUser);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "MERN Cart API is running" });
});

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, ()=>{
    console.log("server is running port 5600");
});

