const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({

    product:{
    type: { type: mongoose.Schema.Types.ObjectId, ref:'Product', required: true },
    name: { type: String, default: '' },
    qty: { type: Number, default: '' },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 }
  },
});



module.exports = mongoose.model('Product', productSchema);