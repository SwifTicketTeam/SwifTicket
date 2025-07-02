const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Seats
const SeatSchema = new Schema({
    screen: {
        type: Schema.Types.ObjectId,
        ref: 'Screen',
        required: true,
    },
    row: {
        type: String,
        required: true,
    },
    column: {
        type: Number,
        required: true,
    },
    isGap: {
        type: Boolean,
        required: true,
    },
    status: {
        type: String,
        default: 'available',
    },
    tier: {
        type: String,
        default: 'regular',
    }
});

SeatSchema.index({screen: 1})

const movieSeat = mongoose.model('Seat', SeatSchema, 'movie-seats');
module.exports = movieSeat;