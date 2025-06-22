const fs = require('fs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require("../models/User");
const {serverHome} = require("./Controllers");
const router = require("../routes/Routes");

const storageAddress = path.relative(process.cwd(), '/home/pranavsaravanan-r/Documents/SwifTicket/swifticket-storage')
const fileExtension = '.jpg';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storageAddress);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + fileExtension);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('image/')) {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_FILE_EXTENSION"));
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024,
    },
});

// Save Profile Photo
module.exports.saveProfilePhoto = async (req, res) => {
    upload.single('userProfilePhoto')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).send({
                message: err.code,
            })
        } else if (err) {
            return res.status(400).send({
                message: "Upload Error",
            })
        } else if (!req.file) {
            return res.status(400).send({
                message: "No File Uploaded",
            })
        }
        const token = req.body.token;
        try {
            if (!token) return res.status(400).send({
                message: "Token not provided."
            });
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const id = payload.id;
            const imageAddress = storageAddress + '/' + id + fileExtension
            fs.rename(req.file.path, imageAddress, (err) => {
                if (err) {
                    return res.status(400).send({
                        message: "Error Renaming File",
                    })
                }
                return res.status(200).json({
                    message: 'Profile Photo Uploaded Successfully',
                })
            })
        } catch(err) {
            if(err.name === "JsonWebTokenError") return res.status(400).send({
                message: "Invalid Token"
            });
            else if (err.name === "TokenExpiredError") return res.status(400).send({
                message: "Session has Expired"
            });
        }
    });

}

// Get Profile Photo
module.exports.getProfilePhoto = async (req, res) => {
    const token = req.query.token;
    try {
        if (!token) return res.status(400).send({
            message: "Token not provided."
        });
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const id = payload.id;
        const imageAddress = '/home/pranavsaravanan-r/Documents/SwifTicket/swifticket-storage/' + id + fileExtension
        if (fs.existsSync(imageAddress)) {
            res.sendFile(imageAddress);
        }
        else {
            res.status(200).send({
                message: "No Profile Photo"
            })
        }
    } catch(err) {
        console.log(err)
        if(err.name === "JsonWebTokenError") return res.status(400).send({
            message: "Invalid Token"
        });
        else if (err.name === "TokenExpiredError") return res.status(400).send({
            message: "Session has Expired"
        });
    }
}