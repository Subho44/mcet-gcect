const mongoose = require('mongoose');

const fundschema = new mongoose.Schema({
    fundname:{type:String,required:true},
    fundtype:{type:String,required:true},
    amountinvested:{type:Number,required:true},
    returns:{type:Number,default:0},
    photo:{type:String},
    date:{type:Date, default:Date.now}

});
module.exports = mongoose.model('Fund',fundschema);