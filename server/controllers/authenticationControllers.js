const fs = require('fs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendMail } = require("../mails/sendMail");
require('dotenv').config();

// Server Home Page
module.exports.serverHome = (req, res) => {
    console.log("Welcome to the Server");
    fs.readFile('./public/index.html', 'utf8', (err, data) => {
        if (err) {
            console.log("No index.html Found");
        } else {
            res.write(data);
            res.end();
        }
    })
}

// Register
module.exports.putUserCredentials = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const user = await User.create({username, email, password});
        const checkEmail = await sendMail({
            username: username,
            email : email,
            template : 'welcome',
            token: jwt.sign({id: user._id}, process.env.EMAIL_SECRET, {expiresIn: 20 * 60 * 60}),
        });

        if (checkEmail === 535) {
            return res.status(400).send("Give us a Valid Email");
        }

        return res.status(201).json({
            user : user._id,
            role : user.role,
        });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).send("This Email has already been registered with SwifTicket");
        }
        else if (err.message.includes('User validation failed')) {
            let errors = {
                username: '',
                email: '',
                password: '',
            }
            Object.values(err.errors).forEach(({properties}) => {
                errors[properties.path] = properties.message;
            });
            for (const error in errors) {
                if (errors[error] !== '') {
                    return res.status(400).send(errors[error]);
                }
            }
        }
        else {
            return res.status(400).send("Invalid Error");
        }
    }
}

// Login
module.exports.getUserCredentials = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user.verified) {
            return res.status(400).send("A Verification Link has been sent to your Email.");
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
                expiresIn: 3 * 24 * 60 * 60,
            });
            return res.status(200).json({
                user : user._id,
                token : token,
                role : user.role,
            });
        } else {
            res.status(400).send("Invalid Email or Password");
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Register to SwifTicket if you are a New User");
    }
}

// Verification
module.exports.giveVerified = async (req, res) => {
    const token = req.query.token;

    try {
        if (!token) return res.status(400).send("Token not provided.");
        const payload = jwt.verify(token, process.env.EMAIL_SECRET)

        const verification = await User.updateOne({ _id: payload.id }, {
            $set: { verified: true }
        });

        if (verification.matchedCount) res.redirect('http://localhost:8080/');
        else res.status(400).send("Verification Process was Unsuccessful");

    } catch (err) {
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.id) return res.status(400).send("Invalid token");

        const user = await User.findOne({_id: decoded.id});
        const checkEmail = await sendMail({
            username: user.username,
            email : user.email,
            template : 'forgotPassword',
            token: jwt.sign({id: user._id}, process.env.EMAIL_SECRET, {expiresIn: 20 * 60 * 60}),
        });

        if (checkEmail === 535) {
            return res.status(400).send("Failed to Resend Verification Email");
        }
        return res.status(400).send("Verification link has expired. A New Verification Email has been sent.");
    }
}

module.exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email });
        const checkEmail = await sendMail({
            username: user.username,
            email : email,
            template : 'forgotPassword',
            token: jwt.sign({id: user._id}, process.env.RESET_SECRET, {expiresIn: 20 * 60 * 60}),
        });
        if (checkEmail === 535) {
            return res.status(400).send("Give us a Valid Email");
        }
        return res.status(200).send("An Email has been sent")
    } catch (err) {
        res.status(400).send("Register to SwifTicket if you are a New User");
    }
}

module.exports.resetPassword = async (req, res) => {
    const {password, token} = req.body;

    try {
        if (!token) return res.status(400).send("Invalid Reset Password Session");
        const payload = jwt.verify(token, process.env.RESET_SECRET);

        const user = await User.findById({ _id: payload.id });

        if (user) {
            user.password = password;
            await user.save();
            return res.status(200).send("Your Password has been reset successfully");
        }
        else return res.status(400).send("Reset Process was Unsuccessful");

    } catch (err) {
        console.log(err)
        if (err.message.includes('User validation failed')) {
            return res.status(400).send(Object.values(err.errors)[0].properties.message);
        }

        const decoded = jwt.decode(token);
        if (!decoded || !decoded.id) return res.status(400).send("Invalid token");

        const user = await User.findOne({_id: decoded.id});
        const checkEmail = await sendMail({
            username: user.username,
            email : user.email,
            template : 'forgotPassword',
            token: jwt.sign({id: user._id}, process.env.RESET_SECRET, {expiresIn: 20 * 60 * 60}),
        });

        if (checkEmail === 535) {
            return res.status(400).send("Failed to Resend Reset Email");
        }
        return res.status(400).send("Reset link has expired. A New Reset Password Email has been sent.");
    }
}