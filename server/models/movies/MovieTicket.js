const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ticketId: {
        type: String,
        required: true,
        unique: true,
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
    },
    city: {
        type: String,
        required: true,
    },
    theatre: {
        type: String,
        required: true,
    },
    show: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    seats: {
        type: [String],
        default: [],
    },
    amount: {
        type: Number,
        default: 0,
    }
}, {timestamps: true});

const movieTicket = mongoose.model("ticket", ticketSchema, "movie-tickets");
module.exports = movieTicket;