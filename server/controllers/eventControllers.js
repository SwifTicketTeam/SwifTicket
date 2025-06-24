const Movie = require('../models/Movie')

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