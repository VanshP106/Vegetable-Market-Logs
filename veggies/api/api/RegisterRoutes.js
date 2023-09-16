const express = require('express');
const router = express.Router();
const UserController = require('../controllers/RegisterControl.js');

router.post('/register', UserController.registerUser);

module.exports = router;
