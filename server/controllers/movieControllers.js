const City = require('../models/City');
const User = require('../models/User');
const UserDetails = require('../models/UserDetails');
const Movie = require('../models/Movie');
const mongoose = require('mongoose');

// Get Favorites
module.exports.getFavorites = async (req, res) => {
    try {
        const {userId} = req.body;
        const userDetail = await UserDetails.findById(userId).populate("favorites.movies")
        if (!userDetail) {
            return res.status(400).send({
                message: "Invalid User or Movie ID"
            })
        } else {
            return res.status(200).send({
                message: `Ticket Added to Favorites`,
                movies: userDetail.favorites.movies,
            })
        }

    } catch (err) {
        console.error(err);
        return res.status(400).send({
            message: "Invalid User ID"
        })
    }
}

// Get Movies
module.exports.getMovies = async (req, res) => {
    const movieLimit = 48;
    const { search = "", genre = "" } = req.query;

    const genres = genre
        .split(',')
        .map(g => g.trim() === "Sci-Fi" ? "Science Fiction" : g.trim())
        .filter(Boolean);

    try {
        let query = {};
        if (search) {
            query.title = { $regex: `^${search}`, $options: "i" };
        }
        if (genres.length) {
            query.genres = { $all: genres };
        }

        const screening_movies = await Movie.find({
            ...query,
            is_screening: true,
        }).limit(movieLimit);

        let movies;
        const newMovieLimit = movieLimit - screening_movies.length - 6 + screening_movies.length % 6;
        if (movieLimit - screening_movies.length > 0) {
            movies = Object.keys(query).length
                ? await Movie.find(query).limit(newMovieLimit)
                : await Movie.aggregate([{$sample: {size: newMovieLimit}}]);

        }

        return res.status(200).send({
            message: "Movies Found!",
            screening_movies: screening_movies,
            movies: movies,
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
        const user = await UserDetails.findOne({
            _id: userId,
            "favorites.movies": movieId,
        });

        return res.status(200).send(!!user);
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

        if(!user) return res.status(400).send({
            message: "Invalid User ID"
        });

        const userDetail = await UserDetails.updateOne(
            { _id: userId },
            user.favorites.movies.includes(movieId)
                ? { $pull: { 'favorites.movies': movieId } }
                : { $addToSet: { 'favorites.movies': movieId } }
        );
        if (!userDetail.matchedCount) {
            return res.status(400).send({
                message: "Invalid Movie ID"
            })
        } else {
            return res.status(200).send({
                message: `Event Updated to Favorites`
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            message: "Error Updating Favorites"
        })
    }
}

// Create Theatres
module.exports.createTheatre = async (req, res) => {
    const {vendor, city, name} = req.body;
    try {
        const isVendor = await User.findOne({
            _id: vendor,
            role: 'vendor'
        });

        if (!isVendor) {
            return res.status(400).send({
                message: "Invalid Vendor ID"
            })
        }

        const isCity = await City.findOne({
            city: city
        }, {
            _id: 0,
            "theatres": 1
        })

        if(!isCity) {
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
        } else if (!isCity.theatres.some(theatre => theatre.name.trim().toLowerCase() === name.trim().toLowerCase())) {
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

// Create Screen
module.exports.createScreen = async (req, res) => {
    const {city, theatre, name, seats} = req.body;

    if (!city || !theatre || !name || !Array.isArray(seats)) {
        return res.status(400).send({
            message: "Invalid Details"
        });
    }

    let layout = [];
    seats.forEach(([row, number, isGap]) => {
        let rowGroup = layout.find(r => r.row === row);
        if (rowGroup) {
            rowGroup.seat.push({ number, isGap });
        } else {
            layout.push({
                row: row,
                seat: [{ number, isGap }]
            });
        }
    });

    const screen = {
        name: name,
        layout: layout,
    }
    try {
        const isScreenAlreadyExists = await City.findOne({
            city: city,
            'theatres.name': theatre,
        }, {
            'theatres.$': 1,
        })

        if (isScreenAlreadyExists?.theatres?.[0]?.screens.some(s => s.name.trim().toLowerCase() === name.trim().toLowerCase())) return res.status(400).send({
            message: `Screen with Name ${name} already exists`
        });

        const NewScreenCity = await City.updateOne({
            city: city,
            'theatres.name': theatre,
        }, {
            $push : {'theatres.$.screens': screen},
            upsert: false,
        });

        if (NewScreenCity.modifiedCount) return res.status(200).send({
            message: `Screen ${name} has been Added`,
        }) ;
        else if (!NewScreenCity.matchedCount) res.status(400).send({
            message: 'Theatre not found',
        });
        else return res.status(400).send({
            message: "Error Adding Screen"
        });
    } catch (err) {
        return res.status(400).send({
            message: "Error Adding Screen"
        });
    }
}

// Get Screens
module.exports.getScreens = async (req, res) => {
    const {city, theatre} = req.body;

    if (!city || !theatre) {
        return res.status(400).send({ message: "City and Theatre are required" });
    }

    try {
        const cityData = await City.findOne(
            { city: city, "theatres.name": theatre },
            { "theatres.$": 1 }
        );

        if (!cityData?.theatres?.[0]) {
            return res.status(400).send({
                message: "Theatre not found"
            });
        }

        const screens = await Promise.all(
            cityData.theatres[0].screens.map(async (screen) => {
                if (screen.movie) {
                    const movie = await Movie.findById(screen.movie);
                    return {
                        ...screen.toObject(),
                        movie,
                    };
                } else {
                    return {
                        ...screen.toObject(),
                        movie: null,
                    };
                }
            })
        );

        if (!screens.length) {
            return res.status(200).send({
                screens: [],
            });
        }

        return res.status(200).send({
            screens: screens,
        })
    } catch (err) {
        return res.status(400).send({
            message: "Error Getting Screens"
        })
    }
}

// Get Movies for Screen
module.exports.getScreenMovies = async (req, res) => {
    const movieLimit = 5
    try {
        const search = req.query.search
        if (search === "") return res.status(200).json({
            message: "Discover Movies",
            movies: await Movie.aggregate([
                { $sample: { size: movieLimit } },
            ])
        });
        const movies = await Movie.find({
            title: {$regex: `^${search}`, $options: "i" }
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

// Set Movie for Screen
module.exports.setScreenMovie = async (req, res) => {
    const {city, TheatreName, ScreenName, movieID = null, movieTime = ""} = req.body;

    try {
        const OldMovie = await City.aggregate([
            {$match: {city}},
            {$unwind: "$theatres"},
            {$match: {"theatres.name": TheatreName}},
            {$unwind: "$theatres.screens"},
            {$match: {"theatres.screens.name": ScreenName}},
            {$project: {
                    movieID: "$theatres.screens.movie"
                }}
        ]);

        const OldMovieID = OldMovie?.[0]?.movieID;

        if (OldMovieID) {
            const isStillScreened = await City.aggregate([
                {$unwind: "$theatres"},
                {$unwind: "$theatres.screens"},
                {$match: {
                        "theatres.screens.movie": OldMovieID,
                        "theatres.screens.name": {$ne: ScreenName}
                    }},
                {$limit: 1}
            ]);
            if (!isStillScreened.length) {
                await Movie.updateOne({_id: OldMovieID}, {
                    $set: {is_screening: false}
                });
            }
        }

        await City.updateOne({
            city,
            "theatres.name": TheatreName,
            "theatres.screens.name": ScreenName
        }, {
            $set: {
                "theatres.$[t].screens.$[s].movie": movieID,
                "theatres.$[t].screens.$[s].time": movieTime
            }
        }, {
            arrayFilters: [
                {"t.name": TheatreName},
                {"s.name": ScreenName}
            ]
        });

        if (!movieID) {
            return res.status(200).send({
                message: "Screen's Movie Deleted Successfully",
            });
        }

        await Movie.updateOne({_id: movieID}, {
            $set: {is_screening: true}
        });

        return res.status(200).send({
            message: "Screen's Movie Updated Successfully",
        });

    } catch (err) {
        return res.status(400).send({
            message: "Error Setting the New Movie"
        });
    }

}

// Delete Screen
module.exports.deleteScreen = async (req, res) => {
    const {city, TheatreName, ScreenName} = req.body;
    try {
        const DeleteMovie = await City.aggregate([
            {$match: {
                    city: city
                }},
            {$unwind: "$theatres"},
            {$unwind: "$theatres.screens"},
            {$match: {
                    "theatres.name": TheatreName,
                    "theatres.screens.name": ScreenName
                }},
            {$project: {
                    movie: "$theatres.screens.movie"
                }}
        ])

        const movieID = DeleteMovie?.[0]?.movie;

        if (movieID) {
            const isPresent = await City.aggregate([
                {$unwind: "$theatres"},
                {$unwind: "$theatres.screens"},
                {$match: {
                        "theatres.screens.movie": movieID,
                        "theatres.screens.name": {$ne: ScreenName}
                    }},
                {$limit: 1}
            ])

            if (!isPresent.length) {
                await Movie.updateOne({
                    _id: movieID
                }, {
                    $set: {is_screening: false}
                });
            }
        }

        const Screen = await City.updateOne(
            {
                city: city,
                "theatres.name": TheatreName
            },
            {
                $pull: {
                    "theatres.$.screens": {
                        name: ScreenName
                    }
                }
            }
        );

        if (Screen.modifiedCount) return res.status(200).send({
            message: "Deleted Screen"
        })
        else res.status(400).send({
            message: "Invalid Screen"
        })
    } catch (err) {
        return res.status(400).send({
            message: "Could not Delete Screen"
        })
    }

}

// Get Screen for Specific Movie
module.exports.getMovieScreens = async (req, res) => {
    let {movieID} = req.body;
    try {
        movieID = new mongoose.Types.ObjectId(movieID);
        const Screens = await City.aggregate([
            {$unwind: "$theatres"},
            {$project: {
                    _id: 0,
                    city: 1,
                    theatre: "$theatres.name",
                    screens: {
                        $filter: {
                            input: "$theatres.screens",
                            as: "screens",
                            cond: {$eq: ["$$screens.movie", movieID]}
                        }
                    }
            }},
            {$match: {"screens.0": { $exists: true }}   }
        ])

        return res.status(200).send({
            message: `Found ${Screens.length} Screens`,
            screens: Screens,
        })
    } catch (err) {
        return res.status(400).send({
            message: "Invalid Movie ID"
        })
    }
}