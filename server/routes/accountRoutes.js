const express = require('express');
const controller = require('../controllers/accountControllers');

const router = express.Router();

// Upload Profile Photo
router.post('/api/uploads/images/users/:userId', controller.saveProfilePhoto)

// Change User Details
router.put('/api/account/users/:userid', controller.changeUserDetails)

module.exports = router;