const express = require('express');
const router = express.Router();
const UserController = require('../controllers/LoginController.js');

router.post('/login', UserController.loginUser);

module.exports = router;
