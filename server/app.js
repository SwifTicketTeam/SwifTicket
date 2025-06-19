const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authenticationRoutes = require('./routes/authenticationRoutes');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: process.env.CLIENT,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Connect with MongoDB
dbURI = process.env.MONGODB_URI
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to DB');
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Failed to connect to the Database.");
    })
app.use(authenticationRoutes);