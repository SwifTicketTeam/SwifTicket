const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const Routes = require('./routes/Routes');
const authenticationRoutes = require('./routes/authenticationRoutes');
const accountRoutes = require('./routes/accountRoutes');
const movieRoutes = require('./routes/movieRoutes');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: process.env.CLIENT,
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/images/movies', express.static(
    process.env.CLOUDINARY_URL,
    {
        setHeaders: (res) => {
            res.set('Access-Control-Allow-Origin', '*')
        }
    }
));


// Connect with MongoDB
dbURI = process.env.MONGODB_URI
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to DB');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        })
    })
    .catch((err) => {
        console.log(`Failed to connect to the Database -> ${err}`);
    })

// Routes
app.use(authenticationRoutes);
app.use(accountRoutes);
app.use(movieRoutes);
app.use(Routes);