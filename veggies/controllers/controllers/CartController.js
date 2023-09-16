const Cart = require('../models/cartModel.js');

// Add an item to the cart
const addToCart = async (req, res) => {
  try {
    const { userId, item } = req.body; // You need to pass userId and item in the request body
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $push: { items: item } },
      { new: true }
    );
    res.json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Could not add to cart' });
  }
};

// Update the cart items (quantity)
const updateCart = async (req, res) => {
  try {
    const { userId, updatedItems } = req.body; // You need to pass userId and updatedItems in the request body
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: updatedItems },
      { new: true }
    );
    res.json(cart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Could not update cart' });
  }
};

// Remove an item from the cart
const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { itemId } = req.params; // You should use `itemId` here
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { id: itemId } } },
      { new: true }
    );
    res.json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Could not remove from cart' });
  }
};

module.exports = {
  addToCart,
  updateCart,
  removeFromCart,
};
