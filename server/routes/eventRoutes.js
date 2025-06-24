const express = require('express');
const controller = require('../controllers/eventControllers');

const router = express.Router();

// Get Movies
router.get('/api/events/movies', controller.getMovies);

module.exports = router;