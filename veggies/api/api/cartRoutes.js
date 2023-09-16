const express = require('express');
const router = express.Router();
const CartItem = require('../models/Cart');

// Route for adding a product to the cart
router.post('/add', async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate the incoming data
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Check if the product is already in the cart
    const existingCartItem = await CartItem.findOne({ product: productId });

    if (existingCartItem) {
      // If it exists, update the quantity
      existingCartItem.quantity += quantity || 1;
      await existingCartItem.save();
      return res.status(200).json(existingCartItem);
    }

    // If it doesn't exist, create a new cart item
    const newCartItem = new CartItem({
      product: productId,
      quantity: quantity || 1,
    });

    // Save the cart item to the database
    const savedCartItem = await newCartItem.save();

    res.status(201).json(savedCartItem);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for fetching cart items
router.get('/', async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('product');
    res.json({ cartItems });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.delete('/remove/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // Find and remove the item from the cart by its ID
    await CartItem.findByIdAndRemove(itemId);

    // Respond with a success message
    res.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.put('/increment/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // Find the cart item by its ID
    const cartItem = await CartItem.findById(itemId);

    if (!cartItem) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    // Increment the quantity of the cart item
    cartItem.quantity += 1;
    
    // Save the updated cart item
    await cartItem.save();

    // Respond with the updated cart item
    res.json(cartItem);
  } catch (error) {
    console.error('Error incrementing item quantity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.put('/decrement/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // Find the cart item by its ID
    const cartItem = await CartItem.findById(itemId);

    if (!cartItem) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    // Check if the item quantity is greater than 1 before decrementing
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;

      // Save the updated cart item
      await cartItem.save();

      // Respond with the updated cart item
      res.json(cartItem);
    } else {
      // If the quantity is 1, remove the item from the cart instead of decrementing
      await CartItem.findByIdAndRemove(itemId);

      // Respond with a success message
      res.json({ message: 'Item removed from cart successfully' });
    }
  } catch (error) {
    console.error('Error decrementing item quantity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
