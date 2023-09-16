const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  img: String,
  amount: Number,
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  items: [cartItemSchema], // Store items as an array of subdocuments
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
