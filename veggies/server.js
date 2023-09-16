// Import required modules and dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const userRoutes = require('./api/RegisterRoutes');
const loginRoutes = require('./api/LoginRoutes');
const contactRoutes = require('./api/contact');
const productRoutes = require('./api/productRoutes');
const cartRoutes = require('./api/cartRoutes');
const Razorpay = require('razorpay');
const Order = require('./api/payment-success.js'); // Import the Order model

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/users', loginRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', Order); // Use the correct path for the order routes

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));

const razorpay = new Razorpay({
  key_id: 'rzp_test_zMqgUpw9l93RS3',
  key_secret: 'hcakatXj9HG0P8th3rXzP4Va',
});

app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt,
      notes,
    });

    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the route for saving the order to the backend
app.post('/api/save-order', async (req, res) => {
  try {
    const { orderId } = req.body;

    // You can update the order status in your database here if needed

    // Send a response indicating that the order has been saved
    res.status(200).json({ message: 'Order saved successfully' });
  } catch (error) {
    console.error('Error saving order to backend:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/payment-success', async (req, res) => {
  try {
    const { orderId, itemName, amount, userId } = req.body;

    // You can update the order status in your database here if needed

    const newOrder = new Order({
      itemName,
      amount,
      userId,
    });
    await newOrder.save();

    res.status(200).json({ message: 'Payment successful' });
  } catch (error) {
    console.error('Error handling payment success:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
