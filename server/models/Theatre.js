const mongoose = require('mongoose');

// Row Schema
const RowSchema = new mongoose.Schema({
    label: {
        type: String,
    },
    seats: [{number: {
            type: Number,
        }}]
}, { _id: false });

// Theatre Schema
const TheatreSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    city: {
        type: String,
    },
    screenName: {
        type: String,
        default: 'Main Screen' },
    layout: {
        rows: [RowSchema]
    }
});

const theatre = mongoose.model('Theatre', TheatreSchema);
module.exports = theatre;