const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Route for adding a new product to the database
router.post('/add', async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    // Validate the incoming data
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    // Check if a product with the same name already exists (assuming name should be unique)
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({ error: 'Product with the same name already exists' });
    }

    // Create a new product instance
    const newProduct = new Product({
      name,
      price,
      description,
      image,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/fetch', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products); // Send the products as JSON
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;