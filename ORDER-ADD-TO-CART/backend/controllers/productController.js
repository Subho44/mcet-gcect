const Product = require("../models/Product");

//add product
const seedProducts = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        if (count > 0) {
            return res.json({ message: "product already exists" });

        }

        const products = await Product.insertMany([
            { name: "iphone 15", price: 80000 },
            { name: "Laptop dell", price: 50000 },
            { name: "tab", price: 8000 },
        ]);
        res.json({message:"product added successfully"});
    } catch(err) {
        console.error(err);
    }
}
//view product
const getproducts = async (req,res)=> {
    try {
        const products = await Product.find();
        res.json(products);
    } catch(err) {
        console.error(err);
    }
};
module.exports = {
    seedProducts,
    getproducts
};
