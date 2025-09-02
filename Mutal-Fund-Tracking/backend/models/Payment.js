const mongoose = require('mongoose');

const paymentschema = new mongoose.Schema({
    fundId:{type:mongoose.Schema.Types.ObjectId, ref:"Fund"},
    amount:{type:Number,required:true},
    razorpay_order_id:String,
    razorpay_payment_id:String,
    status:{type:String, default:"pending"}


},{timestamps:true});
module.exports = mongoose.model('Payment',paymentschema);