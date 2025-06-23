const express = require('express');
const controller = require('../controllers/accountControllers');

const router = express.Router();

// Upload Profile Photo
router.post('/api/uploads/images/users/:userid', controller.saveProfilePhoto)

// Get Profile Photo
router.get('/api/uploads/images/users/:userid', controller.getProfilePhoto)

// Change User Details
router.put('/api/account/users/:userid', controller.changeUserDetails)

module.exports = router;