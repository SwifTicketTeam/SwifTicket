const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Theatres
const TheatreSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true,
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

TheatreSchema.index({city: 1})

const theatre = mongoose.model('Theatre', TheatreSchema, 'theatres');
module.exports = theatre;