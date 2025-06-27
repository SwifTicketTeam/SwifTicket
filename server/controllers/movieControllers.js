const City = require('../models/City');
const User = require('../models/User');
const UserDetails = require('../models/UserDetails');
const Movie = require('../models/Movie');
const mongoose = require('mongoose');

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
module.exports.updateFavorites = async (req, res) => {
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

// Create Theatres
module.exports.createTheatre = async (req, res) => {
    const {vendor, city, name} = req.body;
    try {
        const vendorCheck = await User.findOne({
            _id: vendor,
            role: 'vendor'
        });

        if (!vendorCheck) {
            return res.status(400).send({
                message: "Invalid Vendor ID"
            })
        }

        const cityCheck = await City.findOne({
            city: city
        })

        if(!cityCheck) {
            await City.create({
                city: city,
                theatres: [{
                    vendor: vendor,
                    name: name
                }]
            });
            return res.status(200).send({
                message: `New City with Theatre Added`
            })
        } else if (!cityCheck.theatres.some(theatre => theatre.name.trim().toLowerCase() === name.trim().toLowerCase())) {
            await City.updateOne({city: city}, {
                $push: {
                    theatres: {
                        vendor: vendor,
                        name: name,
                    }
                }
            });
            return res.status(200).send({
                message: `New Theatre added to ${city}`
            })
        } else {
            return res.status(400).send({
                message: `Theatre already exists in ${city}`
            })
        }
    } catch (err) {
        return res.status(400).send({
            message: `No City or Name Provided`
        })
    }
}

// Get Theatres
module.exports.getTheatres = async (req, res) => {
    let {vendor} = req.body;
    vendor = new mongoose.Types.ObjectId(vendor);
    try {
        const cities = await City.aggregate([
            {$match : {'theatres.vendor': vendor} },
            {$unwind: "$theatres"},
            {
                $replaceWith: {
                    $mergeObjects: [
                        "$theatres",
                        { city: "$city" }
                    ]
                }
            }
        ]);

        if (cities.length) return res.status(200).send({
            theatres: cities
        });
        else return res.status(400).send({
            message: `No Theatres for ${vendor}`
        });
    } catch (err) {
        return res.status(400).send({
            message: `Invalid Vendor ID`
        })
    }
}