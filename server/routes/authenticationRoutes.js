const express = require('express');
const controller = require('../controllers/authenticationControllers');

const router = express.Router();

// Server Home Page
router.get('/', controller.serverHome)

// Register
router.post('/register', controller.putUserCredentials)

// Login
router.post('/login', controller.getUserCredentials)

// Verification
router.get('/verified', controller.giveVerified)

// Forgot Password
router.post('/forgot-password', controller.forgotPassword)

// Reset Password
router.post('/reset-password', controller.resetPassword)

// Session Verification
router.post('/jwt', controller.sessionVerification)

module.exports = router;
