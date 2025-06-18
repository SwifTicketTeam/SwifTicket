const fs = require('fs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
        const token = createToken(user._id);
        return res.status(201).json({
            user : user._id,
            token : token,
        });

    } catch (err) {

        if (err.code === 11000) {
            return res.status(401).send("This Email has already been registered with SwifTicket");
        }

        let errors = {
            username : '',
            email : '',
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
}

// Login
module.exports.getUserCredentials = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (await bcrypt.compare(password, user.password)) {
            const token = createToken(user._id);
            return res.status(200).json({
                user : user._id,
                token : token,
            });
        } else {
            res.status(400).send("Invalid Email or Password");
        }
    } catch (err) {
        res.status(400).send("Register to SwifTicket if you are a New User");
    }
}