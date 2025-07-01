const fs = require('fs');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

const storageAddress = path.relative(process.cwd(), '/home/pranavsaravanan-r/Documents/SwifTicket/swifticket-storage/images/users')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storageAddress);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

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
        try {
            const uID = path.basename(req.url);
            const isUser = await User.findById(uID)
            if (isUser) {
                const imageAddress = storageAddress + '/' + uID + path.extname(req.file.originalname);
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
            } else {
                return res.status(400).send({
                    message: "No Such User Found",
                })
            }
        } catch(err) {
            return res.status(400).send({
                message: "Invalid Image Address",
            })
        }
    });

}

// Get Profile Photo
module.exports.getProfilePhoto = async (req, res) => {
    const uID = path.basename(req.url)
    try {
        const imageName = '/home/pranavsaravanan-r/Documents/SwifTicket/swifticket-storage/images/users/' + uID
        for (const ext of ['.jpg', '.jpeg', '.png']) {
            const imageAddress = imageName + ext;
            if (fs.existsSync(imageAddress)) {
                return res.status(200).sendFile(imageAddress);
            }
        }
        return res.status(400).send({
            message: "No Profile Photo"
        });
    } catch(err) {
        return res.status(400).send({
            message: "Invalid Image Address"
        })
    }
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