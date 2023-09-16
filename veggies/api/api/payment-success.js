// Import required modules and dependencies
const express = require('express');
const router = express.Router();
const Order = require('../models/ordermodel'); // Import the Order model

// Define the route for handling payment success
router.post('/payment-success', async (req, res) => {
  try {
    // Extract the order ID and other relevant data from the request
    const { orderId, itemName, amount, userId } = req.body;

    // Update the order status in your database (if needed)
    // For example, you can use Mongoose to update an "orders" collection
    // ...

    // Save the order data to the "orders" collection
    const newOrder = new Order({
      itemName,
      amount,
      userId,
    });
    await newOrder.save();

    // Redirect to the "thanks" page on successful payment
    res.redirect('/thanks');
  } catch (error) {
    console.error('Error handling payment success:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router for use in your application
module.exports = router;
