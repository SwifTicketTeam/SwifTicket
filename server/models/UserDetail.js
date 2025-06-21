const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDetailSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: "swifticket-users",
        required: true,
    },
    tickets: {
        type: [{type: Schema.Types.ObjectId, ref: "swifticket-events"}],
        default: [],
    },
    favorites: {
        type: [{type: Schema.Types.ObjectId, ref: "swifticket-events"}],
        default: [],
    }
})

const userDetail = mongoose.model("UserDetail", userDetailSchema, "swifticket-user-details");
module.exports = userDetail;