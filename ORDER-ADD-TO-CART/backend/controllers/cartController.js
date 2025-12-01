const Product = require("../models/Product");
const Cart = require("../models/Cart");


//add cart
const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const {productId,quantity} = req.body;
        if (count > 0) {
            return res.json({ message: "product already exists" });

        }

        const product = await Product.findById(productId);
        if(!product) {
            return res.json({error:"pro not found"});
        }

        let cart = await Cart.findOne({userId});
        if(!cart) {
            cart = new Cart({userId, items:[]});
        }
       const existingitems = cart.items.find(
        (item)=>item.product.toString() === productId
       );

       if(existingitems) {
        existingitems.quantity += Number(quantity);
       } else {
        cart.items.push({
            product:productId,
            quantity:Number(quantity)
        });
       }
       await cart.save();
       await cart.populate("items.product");

        res.json({message:"product added to cart", cart});
    } catch(err) {
        console.error(err);
    }
}
//view cart
const getCart = async (req,res)=> {
    try {
        const userId = req.userId;
        const cart = await Cart.findOne({userId}).populate("items.product");
        if(!cart) {
            cart = new Cart({userId, items:[]});
        }
        res.json(cart);
    } catch(err) {
        console.error(err);
    }
};
//clear cart

const clearCart = async (req,res)=> {
    try {
        const userId = req.userId;
        const cart = await Cart.findOne({userId});
        if(!cart) {
            return res.json({message:"cart already empty"});
        }
        cart.items = [];
        await cart.save();
        res.json({message:"cart cleaned"});
    } catch(err) {
        console.error(err);
    }
};
module.exports = {
    addToCart,
    getCart,
    clearCart
};
