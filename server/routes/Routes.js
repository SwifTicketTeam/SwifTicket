const express = require('express');
const controller = require('../controllers/Controllers');

const router = express.Router();

// API Docs
router.get('/api', controller.getAPIDocs);

// Server Home Page
router.get('/', controller.serverHome);

module.exports = router;