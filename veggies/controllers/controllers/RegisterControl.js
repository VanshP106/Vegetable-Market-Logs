const User = require('../models/userModel');

const UserController = {
  async registerUser(req, res) {
    try {
      // Get user data from the request body
      const userData = req.body;

      // Create a new user document in the MongoDB collection
      const newUser = await User.create(userData);

      // Respond with a success message or the created user object
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = UserController;
