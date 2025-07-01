const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// City Schema
const CitySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

const city = mongoose.model('City', CitySchema, 'cities');
module.exports = city;