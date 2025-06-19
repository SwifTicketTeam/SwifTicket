const fs = require('fs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendMail } = require("../mails/sendMail");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (userID) => {
  return jwt.sign({userID}, 'Secret', {
      expiresIn: maxAge,
  });
};
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
    const {username, email, password, confirm_password} = req.body;

    if (password !== confirm_password) {
        console.log("Passwords do not match");
        return res.status(400).send('Passwords do not match');
    }

    try {
        const user = await User.create({username, email, password});
        const checkEmail = await sendMail({
            username: username,
            email : email,
            template : 'welcome',
            _id: user._id,
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
            console.log("User creation failed");
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
            const token = createToken(user._id);
            return res.status(200).json({
                user : user._id,
                token : token,
                role : user.role,
            });
        } else {
            res.status(400).send("Invalid Email or Password");
        }
    } catch (err) {
        res.status(400).send("Register to SwifTicket if you are a New User");
    }
}

// Verification
module.exports.giveVerified = async (req, res) => {
    const userID = req.query.user;

    try {
        const verification = await User.updateOne({ _id: userID }, {
            $set: { verified: true }
        });

        if (verification.matchedCount) {
            res.redirect('http://localhost:8080/');
        } else {
            res.status(400).send("Verification Process was Unsuccessful");
        }
    } catch (err) {
        res.status(400).send("Verification Process was Unsuccessful");
    }
}

module.exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email });
        console.log(user);
        const checkEmail = await sendMail({
            username: user.username,
            email : email,
            template : 'forgotPassword',
        });
        if (checkEmail === 535) {
            return res.status(400).send("Give us a Valid Email");
        }
        return res.status(200).send("An Email has been sent")
    } catch (err) {
        res.status(400).send("Register to SwifTicket if you are a New User");
    }
}