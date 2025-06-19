const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Choose a valid username"],
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [20, "Username must be at most 20 characters long"],
    },
    email: {
        type: String,
        required: [true, "We need your Email to proceed"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Give us a Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Protect your Ticketing Experience. Pick a solid password"],
        minlength: [8, "Password must be at least 8 characters"],
        maxlength: [32, "Password is too long. Please shorten it"],
        validate: [(val) => {
            return /^(?=.*[A-Za-z])(?=.*\d).+$/.test(val);
        }, "Password must have atleast 1 Number and 1 Letter."],
    },
    role: {
        type: String,
        default: 'user',
    },
    verified: {
        type: Boolean,
        default: false,
    }
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.post("save", (doc, next) => {
    console.log("A New User has been Registered.")
    next();
});

const User = mongoose.model('User', userSchema, "swifticket-users");
module.exports = User;