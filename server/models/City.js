const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Seats
const SeatSchema = new Schema({
    number: {
        type: Number,
    },
    isGap: {
        type: Boolean,
        default: false,
    },
    tier: {
        type: String,
        default: 'regular',
    }
})

// Rows
const RowSchema = new Schema({
    row: {
        type: String,
    },
    seat: [SeatSchema],
}, { _id: false });

// Screens
const ScreenSchema = new Schema({
    name: {
        type: String,
        default: 'Main Screen',
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        default: null,
    },
    time: {
      type: String,
      default: "",
    },
    layout: {
        type: [RowSchema],
        default: [],
    }
}, { _id: false })

// Theatres
const TheatreSchema = new Schema({
    vendor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
        type: String,
        required: true,
    },
    screens: {
        type: [ScreenSchema],
        default: []
    }
}, { _id: false })

// City Schema
const CitySchema = new Schema({
    city: {
        type: String,
        required: true,
        unique: true
    },
    theatres: {
      type: [TheatreSchema],
        default: []
    },
});

const city = mongoose.model('City', CitySchema, 'swifticket-cities');
module.exports = city;