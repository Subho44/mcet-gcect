const Razorpay = require("razorpay");
const Payment = require("../models/Payment");
const Fund = require("../models/Fund");
const dotenv = require("dotenv");
dotenv.config();
const instance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async(req,res)=>{
    const {fundId,amount} = req.body;
    try {
        const options = {amount:amount*100, currency:"INR"};
        const order = await instance.orders.create(options);
        const payment = new Payment({
            fundId,
            amount,
            razorpay_order_id:order.id,
        });
        await payment.save();
        res.json({order,payment});
    } catch(err) {
         res.status(500).json({error:err.message});
    }
};
exports.verifyPayment = async(req,res) =>{
    const{paymentId,orderId,fundId} = req.body;
    try {
        const payment = await Payment.findOne({razorpay_order_id:orderId});
        payment.razorpay_payment_id = paymentId;
        payment.status = "paid";
        await payment.save();

        const fund = await Fund.findById(fundId);
        fund.amountinvested += payment.amount;
        await fund.save();
        res.json({message:"payment verified and fund updated"});
    } catch(err) {
         res.status(500).json({error:err.message});
    }
}