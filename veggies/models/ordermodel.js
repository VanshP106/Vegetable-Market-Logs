// orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  itemName: String,
  amount: Number,
  userId: String,
  // You can add more fields as needed, such as orderDate, status, etc.
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
