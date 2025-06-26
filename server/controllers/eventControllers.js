const Movie = require('../models/Movie')
const UserDetails = require('../models/UserDetails')

// Get Movies
module.exports.getMovies = async (req, res) => {
    const movieLimit = 60
    try {
        const searchQuery = req.query.search
        let genreQuery = req.query.genre.split(',');
        genreQuery = genreQuery.map(genre => genre === "Sci-Fi" ? "Science Fiction" : genre);
        console.log(genreQuery);
        if (searchQuery === "" && genreQuery.includes('')) return res.status(200).json({
            message: "Discover Movies",
            movies: await Movie.aggregate([
                { $sample: { size: movieLimit } },
            ])
        }); else if (searchQuery === "") return res.status(200).json({
            message: "Discover Movies",
            movies: await Movie.aggregate([
                { $match: { genres: { $all : genreQuery } }, },
                { $sample: { size: movieLimit } },
            ])
        }); else if (genreQuery.includes('')) return res.status(200).json({
            message: "Discover Movies",
            movies: await Movie.find({
                title: {$regex: `^${searchQuery}`, $options: "i" },
            }).limit(movieLimit)
        });
        const movies = await Movie.find({
            title: {$regex: `^${searchQuery}`, $options: "i" },
            genres: {$all: genreQuery},
        }).limit(movieLimit)
        return res.status(200).send({
            message: "Movies Found!",
            movies: movies
        })
    } catch(err) {
        return res.status(400).send({
            message: "Invalid Queries!"
        })
    }
}

// Check Favorites
module.exports.checkFavorites = async (req, res) => {
    try {
        const {userId, movieId} = req.body;
        const user = await UserDetails.findById(userId);
        if (!user) {
            return res.status(400).send({
                message: "Invalid User or Movie ID"
            })
        } else {
            if (user.favorites.movies.includes(movieId)) {
                return res.status(200).send(true)
            } else {
                return res.status(200).send(false)
            }
        }
    } catch (err) {
        return res.status(400).send({
            message: "Invalid User or Movie ID"
        })
    }
}

// Update Favorites
module.exports.addFavorites = async (req, res) => {
    try {
        const {userId, movieId} = req.body;
        const user = await UserDetails.findById(userId);
        const userDetail = await UserDetails.updateOne(
            { _id: userId },
            user.favorites.movies.includes(movieId)
                ? { $pull: { 'favorites.movies': movieId } }
                : { $addToSet: { 'favorites.movies': movieId } }
        );
        if (!userDetail.matchedCount) {
            return res.status(400).send({
                message: "Invalid User or Movie ID"
            })
        } else {
            return res.status(200).send({
                message: `Event Updated to Favorites`
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            message: "Invalid User or Movie ID"
        })
    }
}

// Get Favorites
module.exports.getFavorites = async (req, res) => {
    try {
        const {userId} = req.body;
        const userDetail = await UserDetails.find({_id: userId}).populate("favorites.movies")
        if (!userDetail.length) {
            return res.status(400).send({
                message: "Invalid User or Movie ID"
            })
        } else {
            return res.status(200).send({
                message: `Ticket Added to Favorites`,
                movies: userDetail[0].favorites.movies,
            })
        }

    } catch (err) {
        return res.status(400).send({
            message: "Invalid User ID"
        })
    }
}