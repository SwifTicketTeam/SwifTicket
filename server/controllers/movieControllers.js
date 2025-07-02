const User = require('../models/User');
const City = require('../models/City');
const Movie = require('../models/movies/Movie');
const Theatre = require('../models/movies/Theatre');
const Screen = require('../models/movies/Screen');
const MovieSeat = require('../models/movies/MovieSeat');
const MovieTicket  = require('../models/movies/MovieTicket');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);


async function isScreeningCheck() {
    await Movie.updateMany({
            is_screening: true,
            last_screening_time: { $lt: new Date().toISOString() }
        }, {
            $set: { is_screening: false, last_screening_time: "" }
        }
    );
}

// Get Favorites
module.exports.getFavorites = async (req, res) => {
    try {
        const {userId} = req.body;

        if (!userId) return res.status(400).json({ message: "User ID required" });

        await isScreeningCheck();
        const user = await User.findById(userId).populate("favorites.movies").lean();
        if (!user) {
            return res.status(400).json({
                message: "Invalid User ID"
            })
        } else {
            return res.status(200).json({
                message: `Favorites fetched for ${userId}`,
                movies: user.favorites.movies,
            })
        }

    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Get movies
module.exports.getMovies = async (req, res) => {
    const movieLimit = 30;
    try {
        const { search = "", genre = "" } = req.query;

        const genres = genre
            .split(',')
            .map(g => g.trim() === "Sci-Fi" ? "Science Fiction" : g.trim())
            .filter(Boolean);

        let query = {};
        if (search) {
            query.title = { $regex: `^${search}`, $options: "i" };
        }
        if (genres.length) {
            query.genres = { $all: genres };
        }

        await isScreeningCheck();
        const screening_movies = await Movie.find({
            ...query,
            is_screening: true,
        }).limit(movieLimit).lean();


        let movies = [];
        const newMovieLimit = Math.floor((movieLimit - screening_movies.length) / 6) * 6;
        if (newMovieLimit > 0) {
            movies = Object.keys(query).length
                ? await Movie.find(query).limit(newMovieLimit).lean()
                : [];

        }

        return res.status(200).json({
            message: "movies Found!",
            screening_movies: screening_movies,
            movies: movies,
        })

    } catch(err) {
        return res.status(400).json({
            message: "Invalid Queries!"
        })
    }
}

// Check Favorites
module.exports.checkFavorites = async (req, res) => {
    try {
        const {userId, movieId} = req.body;

        if (!userId || !movieId) return res.status(400).json({
            message: "User ID and Movie ID required" ,
        });

        const user = await User.findOne({
            _id: userId,
            "favorites.movies": movieId,
        }).lean();

        return res.status(200).send(!!user);
    } catch (err) {
        return res.status(400).json({
            message: "Invalid User or Movie ID"
        })
    }
}

// Update Favorites
module.exports.updateFavorites = async (req, res) => {
    try {
        const {userId, movieId} = req.body;

        if(!userId || !mongoose.Types.ObjectId.isValid(movieId)) return res.status(400).json({
            message: "User ID and Movie ID required"
        })

        const user = await User.findById(userId).lean();
        if(!user) return res.status(400).json({
            message: "Invalid User ID"
        });

        const movie = new mongoose.Types.ObjectId(movieId);
        const isFavorite = user.favorites.movies.some(m => m.equals(movie));

        const userFavorites = await User.updateOne(
            { _id: userId },
            isFavorite
                ? { $pull: { 'favorites.movies': movie } }
                : { $addToSet: { 'favorites.movies': movie } }
        );
        if (!userFavorites.matchedCount) {
            return res.status(400).json({
                message: "Invalid Movie ID"
            })
        } else {
            return res.status(200).json({
                message: `Favorites Updated Successfully.`
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Create Theatre
module.exports.createTheatre = async (req, res) => {
    try {
        const {city, vendorId, name} = req.body;
        if(!city || !vendorId || !name) return res.status(400).json({
            message: "City, Vendor and Name of Theatre is required"
        })

        const isVendor = await User.findOne({
            _id: vendorId,
            role: 'vendor'
        }).lean();

        if (!isVendor) return res.status(400).json({
            message: "Invalid Vendor ID"
        })

        const isCity = await City.findOne({name: city}).lean();

        if(!isCity) {
            const cityDoc = await City.create({name: city});

            await Theatre.create({
                name,
                city: cityDoc._id,
                vendor: vendorId,
            })
            return res.status(200).json({
                message: `New City with Theatre Added`
            })
        }

        const isTheatre = await Theatre.findOne({
            name,
            city: isCity._id
        }).lean();

        if(isTheatre) return res.status(400).json({
            message: `Theatre already exists in ${city}`
        });

        await Theatre.create({
            name,
            city: isCity._id,
            vendor: vendorId,
        });
        return res.status(200).json({
            message: `New Theatre added to ${city}`
        });

    } catch (err) {
        return res.status(500).json({
            message: `Server Error`
        });
    }
}

// Get Theatres
module.exports.getTheatres = async (req, res) => {
    try {
        let {vendorId} = req.body;
        if(!vendorId) return res.status(400).json({
            message: "Vendor ID required"
        })

        try {
            vendorId = new mongoose.Types.ObjectId(vendorId);
        }
        catch(err) {
            return res.status(400).json({
                message: "Invalid Vendor ID"
            })
        }

        const theatres = await Theatre.find({vendor: vendorId}).populate('city').lean();
        const theatreIds = theatres.map(theatre => theatre._id);
        const screens = await Screen.find({
            theatre: { $in: theatreIds }
        }).lean();

        const screensByTheatre = {};
        screens.forEach(screen => {
            const theatreId = screen.theatre.toString();
            if (!screensByTheatre[theatreId]) screensByTheatre[theatreId] = [];
            screensByTheatre[theatreId].push(screen._id);
        });

        const theatresWithScreens = theatres.map(theatre => ({
            ...theatre,
            screens: screensByTheatre[theatre._id.toString()] || []
        }));

        if (theatres.length) return res.status(200).json({
            message: `${theatres.length} Theatres Found for ${vendorId}`,
            theatres: theatresWithScreens,
        });
        else return res.status(200).json({
            message: `No Theatres Found for ${vendorId}`,
            theatres: []
        });
    } catch (err) {
        return res.status(500).json({
            message: `Server Error`
        })
    }
}

// Create Screen
module.exports.createScreen = async (req, res) => {
    try {
        const {city, theatre, name, seats} = req.body;

        if (!city || !theatre || !name || !Array.isArray(seats)) {
            return res.status(400).json({
                message: "Invalid Details"
            });
        }

        const isCity = await City.findOne({name: city}).lean();
        if(!isCity) return res.status(400).json({
            message: "Invalid City"
        })

        const isTheatre = await Theatre.findOne({
            name: theatre,
            city: isCity._id,
        }).lean();
        if(!isTheatre) return res.status(400).json({
            message: "Invalid Theatre"
        })

        const isScreen = await Screen.findOne({
            name,
            theatre: isTheatre._id,
        }).lean();
        if(isScreen) return res.status(400).json({
            message: "Screen Already Exists"
        })

        const screen = await Screen.create({
            name,
            theatre: isTheatre._id,
        });

        try {
            const newSeats = seats.map(seat => ({
                screen: screen._id,
                row: seat?.[0],
                column: seat?.[1],
                isGap: seat?.[2],
            }))

            await MovieSeat.insertMany(newSeats, {
                ordered: true,
                rawResult: false
            })
        } catch(err) {
            return res.status(400).json({
                message: "Your Seat Layout is Invalid. Each Seat Needs to follow Format: [row, column, isGap]"
            })
        }

        return res.status(200).json({
            message: `Screen ${name} has been added to ${theatre}, ${city}.`
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

// Get Screens
module.exports.getScreens = async (req, res) => {
    try {
        const {city, theatre} = req.body;

        if (!city || !theatre) {
            return res.status(400).send({ message: "City and Theatre are required" });
        }

        const isCity = await City.findOne({name: city}).lean();
        if(!isCity) return res.status(400).json({
            message: "Invalid City"
        })

        const isTheatre = await Theatre.findOne({
            name: theatre,
            city: isCity._id,
        }).lean();
        if(!isTheatre) return res.status(400).json({
            message: "Invalid Theatre"
        })

        const now = new Date().toISOString();
        const screens = await Screen.find({ theatre: isTheatre._id })
            .populate({
                path: 'theatre',
                populate: 'city',
            })
            .populate('movie')
            .lean();

        const expiredScreens = [];

        for (const screen of screens) {
            if (screen.time && screen.time < now) {
                expiredScreens.push([screen._id, screen.name]);
                screen.movie = null;
                screen.time = "";
                screen.price = 0;
            }
        }

        const expiredScreenIds = expiredScreens.map(screen => screen[0]);
        const expiredScreenNames = expiredScreens.map(screen => screen[1]);

        if (expiredScreens.length > 0) {

            await Screen.updateMany(
                { _id: { $in: expiredScreenIds} },
                {
                    $set: {
                        movie: null,
                        time: "",
                        price: 0,
                    }
                }
            );

            await MovieTicket.updateMany({
                screen: {$in: expiredScreenNames},
            }, {
                $set: {
                    status: "finished",
                }
            });


            await MovieSeat.updateMany({
                screen: {$in : expiredScreenIds},
            }, {
                $set: {status : "available"}
            }).lean();
        }


        const screenIds = screens.map(screen => screen._id);
        const seats = await MovieSeat.find({
            screen: {$in : screenIds},
        }).lean();

        const seatsByScreen = {};
        seats.forEach(seat => {
            const screenId = seat.screen.toString();
            if (!seatsByScreen[screenId]) seatsByScreen[screenId] = {};

            const row = seat.row;
            if (!seatsByScreen[screenId][row]) seatsByScreen[screenId][row] = [];

            seatsByScreen[screenId][row].push(seat);
        });

        const screensWithSeats = screens.map(screen => {
            const screenId = screen._id.toString();
            const seatRows = seatsByScreen[screenId];

            const groupedRows = Object.entries(seatRows)
                .sort((row1, row2) => row2[0].localeCompare(row1[0]))
                .map(([row, seats]) =>
                    seats.sort((seat1, seat2) => seat1.column - seat2.column)
                );

            return {
                ...screen,
                seats: groupedRows,
            };
        });

        if (!screens.length) return res.status(200).json({
            message: `No Screens found for ${theatre}`,
            screens: [],
        });

        return res.status(200).json({
            message: `${screens.length} Screens found in ${theatre}, ${city}`,
            screens: screensWithSeats,
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Get Movies for Screen
module.exports.getScreenMovies = async (req, res) => {
    const movieLimit = 5
    try {
        const search = (req.query.search || "").trim();

        if (search === "") return res.status(200).json({
            message: "Start Searching",
            movies: []
        });
        const movies = await Movie.find({
            title: {$regex: `^${search}`, $options: "i" }
        }).limit(movieLimit).lean();
        return res.status(200).json({
            message: "Movies Found!",
            movies: movies
        })
    } catch(err) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

async function deleteMovieFromScreen(movieId) {
    const isMovie = await Screen.find({
        movie: movieId,
    }, {
        time: 1,
    }).lean();

    if (!isMovie.length) {
        await Movie.updateOne({_id: movieId}, {
            is_screening: false,
            last_screening_time: "",
        })
    } else {
        const timestamps = [...isMovie.map((movie) => movie.time)].sort()
        await Movie.updateOne({_id: movieId}, {
            last_screening_time: timestamps[timestamps.length - 1]
        })
    }
}

// Set Movie for Screen
module.exports.setScreenMovie = async (req, res) => {
    try {
        const {city, theatre, screen, movieId , moviePrice, movieTime, method} = req.body;

        if (!city || !theatre || !screen) return res.status(400).json({
            message: "City, Theatre and Screen are required"
        })

        const isCity = await City.findOne({name: city}).lean();
        if (!isCity) return res.status(400).json({
            message: "Invalid City"
        })

        const isTheatre = await Theatre.findOne({
            name: theatre,
            city: isCity._id,
        }).lean();
        if (!isTheatre) return res.status(400).json({
            message: "Invalid Theatre"
        })

        const isScreen = await Screen.findOne({
            name: screen,
            theatre: isTheatre._id,
        }).lean();
        if (!isScreen) return res.status(400).json({
            message: "Invalid Screen"
        })

        if(isScreen.movie && isScreen.time) {
            await MovieTicket.updateMany({
                time: isScreen.time,
                movie: isScreen.movie,
                screen: isScreen.name,
            }, {
                $set: {
                    status: "cancelled",
                }
            }).lean();
            await MovieSeat.updateMany({
                screen: isScreen._id,
                status: {$ne: "available"},
            }, {
                $set: {
                    status: "available",
                }
            });
        }

        if (method === 'set') {
            if (!movieId || moviePrice === undefined || !movieTime) return res.status(400).json({
                message: "Movie ID, Price of Each Ticket and Time of Movie Screening are Required"
            })

            if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(movieTime) && !isNaN(Date.parse(movieTime))) return res.status(400).json({
                message: "Invalid Movie Time"
            })

            await Screen.findByIdAndUpdate(isScreen._id, {
                movie: movieId,
                price: moviePrice,
                time: movieTime,
            })

            await Movie.updateOne({_id: movieId}, {
                is_screening: true,
                $max: {last_screening_time: movieTime},
            })
            await deleteMovieFromScreen(isScreen.movie)

            return res.status(200).json({
                message: `Movie Set to ${movieId}`,
            })

        } else if (method === 'delete') {
            await Screen.findByIdAndUpdate(isScreen._id, {
                movie: null,
                price: 0,
                time: '',
            })

            await deleteMovieFromScreen(isScreen.movie)

            return res.status(200).json({
                message: `Movie Deleted from ${screen}`,
            })
        } else {
            return res.status(400).json({
                message: "Invalid Method"
            })
        }

    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }

}

// Delete Screen
module.exports.deleteScreen = async (req, res) => {
    try {
        const {city, theatre, screen} = req.body;

        if (!city || !theatre || !screen) return res.status(400).json({
            message: "City, Theatre and Screen are required" }
        );

        const isCity = await City.findOne({name: city}).lean();
        if(!isCity) return res.status(400).json({
            message: "Invalid City"
        })

        const isTheatre = await Theatre.findOne({
            name: theatre,
            city: isCity._id,
        }).lean();
        if(!isTheatre) return res.status(400).json({
            message: "Invalid Theatre"
        })

        const isScreen = await Screen.findOne({
            name: screen,
            theatre: isTheatre._id,
        }).lean();

        if(!isScreen) return res.status(400).json({
            message: "Invalid Screen"
        })

        await Screen.findByIdAndDelete(isScreen._id);
        await deleteMovieFromScreen(isScreen.movie);
        await MovieSeat.deleteMany({ screen: isScreen._id });

        return res.status(200).json({
            message: `${screen} Deleted from ${theatre}, ${city}`,
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        })
    }

}

// Get Screen for Specific Movie
module.exports.getMovieScreens = async (req, res) => {
    try {
        const {movieId} = req.body;

        if(!mongoose.Types.ObjectId.isValid(movieId)) return res.status(400).json({
            message: "Movie ID is required"
        })

        const expiredScreens = await Screen.find(
        { time: { $lt: new Date().toISOString() }
        }, {
                _id: 1,
                name: 1,
        }).lean()

        const expiredScreenIds = expiredScreens.map((screen) => screen._id);
        const expiredScreenNames = expiredScreens.map((screen) => screen.name);

        await Screen.updateMany({
            _id: {$in: expiredScreenIds},
        }, {
            $set: {
                movie: null,
                time: "",
                price: 0,
            }
        });

        await MovieTicket.updateMany({
            screen: {$in: expiredScreenNames},
        }, {
            $set: {
                status: "finished",
            }
        });

        await MovieSeat.updateMany({
            screen: {$in : expiredScreenIds},
        }, {
            $set: {status : "available"}
        }).lean();

        const screens = await Screen.find({ movie: movieId })
            .populate({
                path: "theatre",
                populate: {
                    path: "city",
                }
            }).lean();

        const screenIds = screens.map(screen => screen._id);
        const seats = await MovieSeat.find({
            screen: {$in : screenIds},
        }).lean();

        const seatsByScreen = {};
        seats.forEach(seat => {
            const screenId = seat.screen.toString();
            if (!seatsByScreen[screenId]) seatsByScreen[screenId] = {};

            const row = seat.row;
            if (!seatsByScreen[screenId][row]) seatsByScreen[screenId][row] = [];

            seatsByScreen[screenId][row].push(seat);
        });

        const screensWithSeats = screens.map(screen => {
            const screenId = screen._id.toString();
            const seatRows = seatsByScreen[screenId];

            const groupedRows = Object.entries(seatRows)
                .sort((row1, row2) => row2[0].localeCompare(row1[0]))
                .map(([row, seats]) =>
                    seats.sort((seat1, seat2) => seat1.column - seat2.column)
                );

            return {
                ...screen,
                seats: groupedRows,
            };
        });

        const grouped = {};

        screensWithSeats.forEach(screen => {
            const cityName = screen.theatre.city.name;
            const theatreName = screen.theatre.name;

            const key = `${cityName}::${theatreName}`;
            if (!grouped[key]) {
                grouped[key] = {
                    city: cityName,
                    theatre: theatreName,
                    screens: []
                };
            }

            grouped[key].screens.push(screen);
        });

        const groupedScreens = Object.values(grouped);
        return res.status(200).send({
            message: `Found ${screens.length} Screens`,
            screens: groupedScreens,
        })
    } catch (err) {
        return res.status(500).send({
            message: "Server Error"
        })
    }
}

// Create Checkout Session - movies
module.exports.initPayments = async (req, res) => {
    const {email, metadata} = req.body;
    if(!email || !metadata) {
        return res.status(400).json({
            message: "Missing Email or Metadata"
        });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: metadata.movie,
                            description: `${metadata.theatre}, ${metadata.city}, ${metadata.screen} at ${new Date(metadata.time).toLocaleString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            })} • ${metadata.seats}`,
                        },
                        unit_amount: Math.round(Number(metadata.amount) * 100),
                    },
                    quantity: 1
                },
            ],
            mode: "payment",
            customer_email: email,
            metadata: metadata,
            success_url: `${process.env.CLIENT}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT}/events`
        })

        return res.status(200).json({
            message: "Created Checkout Session",
            url: session.url,
        })
    } catch (err) {
        return res.status(500).json({
            message: "Failed to Create Checkout Session"
        })
    }
}

// Save Tickets - movies
module.exports.saveTickets = async (req, res) => {
    const session_id = req.query.session_id;

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const metadata = session.metadata;

        const { city, theatre, screen } = metadata;

        const isCity = await City.findOne({name: city}).lean();
        if(!isCity) return res.status(400).json({
            message: "Invalid City"
        })

        const isTheatre = await Theatre.findOne({
            name: theatre,
            city: isCity._id,
        }).lean();
        if(!isTheatre) return res.status(400).json({
            message: "Invalid Theatre"
        })

        const isScreen = await Screen.findOne({
            name: screen,
            theatre: isTheatre._id,
        }).lean();

        if(!isScreen) return res.status(400).json({
            message: "Invalid Screen"
        })

        const ticket = await MovieTicket.findOne({
            user: metadata.user,
            ticketId: metadata.ticket_id
        }).lean();

        const ticketData = {
            user: metadata.user,
            ticketId: metadata.ticket_id,
            movie: {
                _id: metadata.movie_id,
                title: metadata.movie
            },
            city: city,
            theatre: theatre,
            show: screen,
            time: metadata.time,
            seats: metadata.seats.split(', '),
            amount: Number(parseFloat(metadata.amount).toFixed(2)),
        }

        if (!ticket) {
            await MovieTicket.create({
                user: metadata.user,
                ticketId: metadata.ticket_id,
                movie: new mongoose.Types.ObjectId(metadata.movie_id),
                city: city,
                theatre: theatre,
                screen: screen,
                time: metadata.time,
                seats: metadata.seats.split(', '),
                amount: Number(parseFloat(metadata.amount).toFixed(2)),
            });

            const seats = metadata.backend_seats.split(', ');
            const seatUpdates = seats.map(seat => {
                const [row, col] = seat.split('-');
                return {
                    updateOne: {
                        filter: {
                            screen: isScreen._id,
                            row,
                            column: parseInt(col),
                        },
                        update: {
                            $set: { status: "booked" }
                        }
                    }
                };
            });

            await MovieSeat.bulkWrite(seatUpdates);

            return res.status(200).json({
                message: "Paid Successfully",
                metadata: ticketData,
            })
        }
        else return res.status(200).json({
            message: "Ticket Already Added",
            metadata: ticketData,
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server Error",
        })
    }
}

// Fetch User Movie Tickets
module.exports.getTickets = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;

        const userId = (ticketId !== "*") ? ticketId.split('-')[0] : req.body.userId;
        if(!userId) return res.status(400).json({
            message: "User ID is required"
        })
        if(ticketId === "*") {
            const tickets = await MovieTicket.find({
                user: userId
            }).populate('movie').lean()

            return res.status(200).json({
                message: `Tickets Fetched for ${userId}`,
                tickets: tickets,
            })
        } else {
            const ticket = await MovieTicket.findOne({
                user: userId,
                ticketId: ticketId
            }).populate('movie').lean();

            return res.status(200).json({
                message: "Ticket Fetched Successfully",
                ticket: ticket
            })
        }
    } catch (err) {
        return res.status(400).json({
            message: "Failed to Get Tickets",
        })
    }
}
