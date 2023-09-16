const User = require('../models/userModel');
const jwt = require('jsonwebtoken'); // Import the JWT library
const secretKey = 'vansh1'; // Replace with your secret key

const LoginController = {
  async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      // Find the user in the MongoDB collection based on the provided username
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // If the username and password match, generate a JWT token
      const token = generateToken(user._id);

      // Send the token in the response
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Function to generate a JWT token
function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
}

module.exports = LoginController;
