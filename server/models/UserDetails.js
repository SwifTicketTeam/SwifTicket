const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDetailSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bio: {
        type: String,
        default: '',
    },
    tickets: {
        movies: [{
            type: Schema.Types.ObjectId,
            ref: "Movie",
            default: []
        }]
    },
    favorites: {
        movies: [{
            type: Schema.Types.ObjectId,
            ref: "Movie",
            default: []
        }]
    }
})

const userDetails = mongoose.model("UserDetail", userDetailSchema, "swifticket-user-details");
module.exports = userDetails;