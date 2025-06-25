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
    movieTickets: {
        type: [{type: Schema.Types.ObjectId, ref: "Movie"}],
        default: [],
    },
    movieFavorites: {
        type: [{type: Schema.Types.ObjectId, ref: "Movie"}],
        default: [],
    }
})

const userDetails = mongoose.model("UserDetail", userDetailSchema, "swifticket-user-details");
module.exports = userDetails;