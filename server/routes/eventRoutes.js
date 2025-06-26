const express = require('express');
const controller = require('../controllers/eventControllers');

const router = express.Router();

// Get Movies
router.get('/api/events/movies', controller.getMovies);

// Check Favorites
router.post('/api/events/movies/users/favorites', controller.checkFavorites)

// Update Favorites (Movies)
router.put('/api/events/movies/users/favorites', controller.addFavorites)

// Get Favorites
router.post('/api/account/favorites', controller.getFavorites)

module.exports = router;