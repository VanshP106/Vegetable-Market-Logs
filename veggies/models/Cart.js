const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    default: 1, // Default quantity is 1
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

module.exports = mongoose.model('CartItem', cartItemSchema);
