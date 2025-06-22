const express = require('express');
const controller = require('../controllers/accountControllers');

const router = express.Router();

// Upload Profile Photo
router.post('/api/uploads/images/users', controller.saveProfilePhoto)

// Get Profile Photo
router.get('/api/uploads/images/users', controller.getProfilePhoto)

module.exports = router;