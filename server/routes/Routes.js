const express = require('express');
const controller = require('../controllers/Controllers');

const router = express.Router();

// API Docs
router.get('/api', controller.getAPIDocs);

// Server Home Page
router.get('/', controller.serverHome);

// Payments
router.post('/api/payments/init', controller.initPayments)

//Payment Success
router.post('/api/payments/success', controller.saveTickets)

module.exports = router;