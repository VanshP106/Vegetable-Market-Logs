const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
router.post('/submit', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  await contact.save();

  res.json({ message: 'Contact submitted successfully' });
});
router.post('/submit', async (req, res) => 
{
  try {
    console.log('Received data:', req.body); // Log the received data
    const newContact = new Contact(req.body);
    console.log('New contact:', newContact); // Log the new contact object
    await newContact.save();
    console.log('Contact saved successfully'); // Log success message
    res.json({ message: 'Contact submitted successfully' });
  } catch (error) {
    console.error('Error:', error); // Log the error
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/submissions', async (req, res) => {
  try {
    const submissions = await Contact.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
