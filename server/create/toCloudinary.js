require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const POSTERS_DIR = path.join(__dirname, '../../swifticket-storage/images/movies');
const CLOUD_FOLDER = 'swifticket/movies';
const BATCH_SIZE = 5;
const DELAY_BETWEEN_BATCHES = 200;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const uploadImage = async (filePath, publicId) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: CLOUD_FOLDER,
            use_filename: true,
            unique_filename: false,
            public_id: publicId,
            overwrite: false
        });

        console.log(`Uploaded: ${publicId} → ${result.secure_url}`);
        return { success: true, public_id: publicId, url: result.secure_url };
    } catch (err) {
        console.error(`Failed: ${publicId} → ${err.message}`);
        return { success: false, public_id: publicId, error: err.message };
    }
};

const uploadAll = async () => {
    const files = fs.readdirSync(POSTERS_DIR);
    console.log(`Starting upload of ${files.length} images...`);

    const results = [];

    for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const batch = files.slice(i, i + BATCH_SIZE);

        const uploads = await Promise.all(batch.map(file => {
            const filePath = path.join(POSTERS_DIR, file);
            const publicId = path.parse(file).name;
            return uploadImage(filePath, publicId);
        }));

        results.push(...uploads);
        await sleep(DELAY_BETWEEN_BATCHES);
    }

    const logPath = path.join(__dirname, 'toCloudinary.json');
    fs.writeFileSync(logPath, JSON.stringify(results, null, 2));
    console.log(`Upload complete. Log saved to: ${logPath}`);
};

uploadAll();
