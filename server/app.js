const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authenticationRoutes = require('./routes/authenticationRoutes');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect with MongoDB
const database_name = "swifticket"
dbURI = `mongodb+srv://pranavsaravananr:SwiftlyBookTickets@swifticket.be4xosi.mongodb.net/${database_name}?retryWrites=true&w=majority&appName=SwifTicket`
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to DB');
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        })
    })
    .catch((err) => {
        console.log("Failed to connect to the Database.");
    })

app.use(authenticationRoutes);