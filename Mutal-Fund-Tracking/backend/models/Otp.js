const mongoose = require('mongoose');

const otpschema = new mongoose.Schema({
    email:{type:String,required:true,index:true},
    otpHash:{type:String,required:true},
    expiresAt:{type:Date, required:true},
    createdAt:{type:Date , default:Date.now},
    
});
otpschema.index({expiresAt:1},{expireAfterSeconds:0});
module.exports = mongoose.model('Otp',otpschema);