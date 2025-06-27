const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Rows
const RowSchema = new Schema({
    row: {
        type: String,
    },
    seats: [{number: {
            type: Number,
        }}]
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