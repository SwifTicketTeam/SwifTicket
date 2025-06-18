const express = require('express');
const controller = require('../controllers/authenticationControllers');

const router = express.Router();

// Server Home Page
router.get('/', controller.serverHome)

// Register
router.post('/register', controller.putUserCredentials)

// Login
router.post('/login', controller.getUserCredentials)

module.exports = router;
