const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    createdAt:{type:Date , default:Date.now},
    isVerified:{type:Boolean, default:true}
    

});
module.exports = mongoose.model('User',userschema);