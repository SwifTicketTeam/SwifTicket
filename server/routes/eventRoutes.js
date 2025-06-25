const express = require('express');
const controller = require('../controllers/eventControllers');

const router = express.Router();

// Get Movies
router.get('/api/events/movies', controller.getMovies);

// Add to Favorites (Movies)
router.post('/api/events/movies/favorites', controller.addFavorites)

// Get Favorites
router.post('/api/account/favorites', controller.getFavorites)

module.exports = router;