const express = require('express');
const controller = require('../controllers/movieControllers');

const router = express.Router();

// Get Movies
router.get('/api/events/movies', controller.getMovies);

// Get Screens for Movie
router.post('/api/events/movies/screens', controller.getMovieScreens);

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

// Create Screen
router.post('/api/account/theatres/screens/create', controller.createScreen)

// Get Screens
router.post('/api/account/theatres/screens/get', controller.getScreens)

// Get Movies for Screen
router.get('/api/account/theatres/movies', controller.getScreenMovies);

// Set Movie for Screen
router.post('/api/account/theatres/movie', controller.setScreenMovie);

// Delete Screen
router.post('/api/account/theatres/screen/delete', controller.deleteScreen);

module.exports = router;