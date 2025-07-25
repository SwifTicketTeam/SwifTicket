const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        default: '',
    },
    genres: {
        type: Array,
        default: () => [],
    },
    rating: {
        type: Number,
        default: 0,
    },
    language: {
        type: String,
        default: 'en-US',
    },
    release: {
        type: Date,
    },
    is_screening: {
        type: Boolean,
        default: false,
    },
    last_screening_time: {
        type: String,
        default: '',
    }
})

const movie = mongoose.model("Movie", movieSchema, "swifticket-movies");
module.exports = movie;