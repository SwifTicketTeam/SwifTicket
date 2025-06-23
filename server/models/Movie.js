const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = new Schema({
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
    poster: {
        type: String,
        default: ''
    }
})

const movie = mongoose.model("Movie", Movie, "swifticket-movies");
module.exports = movie;