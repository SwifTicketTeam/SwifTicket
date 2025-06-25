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

// Add to Favorites
module.exports.addFavorites = async (req, res) => {
    try {
        const {userId, movieId} = req.body;
        const userDetail = await UserDetails.updateOne({_id: userId}, {
            $push: {movieFavorites: movieId}
        });
        if (!userDetail.matchedCount) {
            return res.status(400).send({
                message: "Invalid User or Movie ID"
            })
        } else {
            return res.status(200).send({
                message: `Event Added to Favorites`
            })
        }
    } catch (err) {
        return res.status(400).send({
            message: "Invalid User or Movie ID"
        })
    }
}

// Get Favorites
module.exports.getFavorites = async (req, res) => {
    try {
        const {userId} = req.body;
        const userDetail = await UserDetails.find({_id: userId}).populate("movieFavorites")
        if (!userDetail.length) {
            return res.status(400).send({
                message: "Invalid User or Movie ID"
            })
        } else {
            return res.status(200).send({
                message: `Ticket Added to Favorites`,
                events: userDetail[0].movieFavorites,
            })
        }

    } catch (err) {
        return res.status(400).send({
            message: "Invalid User ID"
        })
    }
}