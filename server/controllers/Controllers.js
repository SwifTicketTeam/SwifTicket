const fs = require('fs');

// Server Home Page
module.exports.serverHome = (req, res) => {
    fs.readFile('./public/index.html', 'utf8', (err, data) => {
        if (err) {
            console.log("No index.html Found");
        } else {
            res.write(data);
            res.end();
        }
    })
}

// API Docs
module.exports.getAPIDocs = async (req, res) => {
    fs.readFile('./public/api.html', 'utf8', (err, data) => {
        if (err) {
            console.log("No api.html Found");
        } else {
            res.write(data);
            res.end();
        }
    })
}