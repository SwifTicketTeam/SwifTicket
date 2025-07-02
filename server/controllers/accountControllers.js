const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const storage = require('../cloudinary');

const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('image/jpeg') || file.mimetype.includes('image/png')) {
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
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if(!user) return res.status(400).json({
        message: 'Invalid User ID'
    });

    upload.single('userProfilePhoto')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            let error = "";
            if (err.code === "LIMIT_FILE_EXTENSION") {
                error = "Profile Picture should be of .jpeg or .png";
            } else if (err.code === "LIMIT_FILE_SIZE") {
                error = "Image should not exceed 1MB";
            }
            return res.status(400).send({
                message: error,
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

        const cloudinaryUrl = req.file.path;
        const publicId = req.file.filename;

        res.status(200).json({
            message: 'Image uploaded successfully!',
            url: cloudinaryUrl,
            public_id: publicId,
        });
    });

}

// Change Account Details
module.exports.changeUserDetails = async (req, res) => {
    const {username} = req.body;
    const uID = path.basename(req.url)
    const user = await User.findById(uID);
    if(!user) {
        return res.status(400).send({
            message: "No Such User Found",
        })
    }

    if (username !== user.username) {
        await User.updateOne({_id: uID}, {
            username: username,
        })
    }
    res.status(200).send({
        message: `Details have been updated successfully`,
    })
}