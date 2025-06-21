const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema({
    type: {
        type: String
    },
    price: {
        type: Number,
    }
})

const event = mongoose.model("Event", Event, "swifticket-events");
module.exports = event;