// In routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Import your Mongoose model

// Route to save a new contact submission
router.post('/submit', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json({ message: 'Contact submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Route to get all contact submissions
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await Contact.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
