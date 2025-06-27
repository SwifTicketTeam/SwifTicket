const express = require('express');
const controller = require('../controllers/movieControllers');

const router = express.Router();

// Get Movies
router.get('/api/events/movies', controller.getMovies);

// Check Favorites
router.post('/api/events/movies/users/favorites', controller.checkFavorites)

// Get Favorites
router.post('/api/account/movies/favorites', controller.getFavorites)

// Update Favorites (Movies)
router.put('/api/account/movies/favorites', controller.updateFavorites)

// Create Theatre
router.post('/api/account/theatres/create', controller.createTheatre)

// Get Theatres
router.post('/api/account/theatres/get', controller.getTheatres)

module.exports = router;