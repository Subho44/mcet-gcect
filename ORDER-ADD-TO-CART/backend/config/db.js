const mongoose = require("mongoose");

const connectdb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected");
    } catch(err) {
        console.error(err);
    }
};
module.exports = connectdb;