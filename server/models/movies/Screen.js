const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Screens
const ScreenSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    theatre: {
        type: Schema.Types.ObjectId,
        ref: 'Theatre',
        required: true,
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        default: null,
    },
    price: {
        type: Number,
        default: 0,
    },
    time: {
        type: String,
        default: "",
    },
});

ScreenSchema.index({theatre: 1});

const screen = mongoose.model('Screen', ScreenSchema, 'screens');
module.exports = screen;