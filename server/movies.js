const fs = require('fs');
const csv = require('csv-parser')
const axios = require('axios');
const Movie = require('./models/Movie');
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");

dbURI = process.env.MONGODB_URI
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to DB');
    })

const movies = [];

async function downloadImage(url, filename) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const savePath = path.relative(process.cwd(), `/home/pranavsaravanan-r/Documents/SwifTicket/swifticket-storage/images/movies/${filename}`);

    fs.writeFileSync(savePath, buffer);
    return savePath;
}

function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

const csvPath = path.relative(process.cwd(), '/home/pranavsaravanan-r/Documents/SwifTicket/swifticket-storage/csv/9000plus.csv');
fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (data) => movies.push(data))
    .on('end', async () => {
        console.log("CSV Loaded into Array");

        let inserted = 0;
        for (const movie of movies) {
            const id = new mongoose.Types.ObjectId();

            if (checkIfMovieValid(movie)) {
                try {
                    const ext = path.extname(new URL(movie.Poster_Url).pathname) || '.jpg';
                    const filename = id.toString() + ext;
                    const posterPath = await downloadImage(movie.Poster_Url, filename);

                    await Movie.create({
                        _id: id,
                        title: movie.Title,
                        overview: movie.Overview,
                        genres: movie.Genre.split(', '),
                        rating: parseFloat(movie.Vote_Average),
                        language: getLanguageInfo(movie.Original_Language)[1],
                        release: movie.Release_Date,
                        poster: posterPath
                    });

                    console.log(`Inserted: ${inserted + 1}. ${movie.Title}`);
                    inserted++;
                } catch (err) {
                    console.warn(`Failed ${movie.Title}: ${err.message}`);
                }
            } else {
                console.log(`Skipped invalid: ${movie.Title}`);
            }

            await delay(100);
        }

        console.log(`Done. Inserted ${inserted} movies.`);
        await mongoose.disconnect();
    });

function isValidYYYYMMDD(dateStr) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;

    const date = new Date(dateStr);
    const isValid = !isNaN(date.getTime());

    const [year, month, day] = dateStr.split("-");
    return (
        isValid &&
        date.getUTCFullYear() === +year &&
        date.getUTCMonth() + 1 === +month &&
        date.getUTCDate() === +day
    );
}
function getLanguageInfo(code) {
    const languages = {
        ar: "Arabic",
        bn: "Bengali",
        ca: "Catalan",
        cn: "Chinese (Simplified)",
        cs: "Czech",
        da: "Danish",
        de: "German",
        el: "Greek",
        en: "English",
        es: "Spanish",
        et: "Estonian",
        eu: "Basque",
        fa: "Persian",
        fi: "Finnish",
        fr: "French",
        he: "Hebrew",
        hi: "Hindi",
        hu: "Hungarian",
        id: "Indonesian",
        is: "Icelandic",
        it: "Italian",
        ja: "Japanese",
        ko: "Korean",
        la: "Latin",
        lv: "Latvian",
        ml: "Malayalam",
        ms: "Malay",
        nb: "Norwegian Bokmål",
        nl: "Dutch",
        no: "Norwegian",
        pl: "Polish",
        pt: "Portuguese",
        ro: "Romanian",
        ru: "Russian",
        sr: "Serbian",
        sv: "Swedish",
        ta: "Tamil",
        te: "Telugu",
        th: "Thai",
        tl: "Tagalog",
        tr: "Turkish",
        uk: "Ukrainian",
        zh: "Chinese (Traditional)"
    };

    const fullName = languages[code.toLowerCase()];
    return fullName ? [true, fullName] : [false, null];
}
function checkIfMovieValid(movie) {
    if (!isValidYYYYMMDD(movie.Release_Date)) return false;
    if(isNaN(parseFloat(movie.Vote_Average)) || !(parseFloat(movie.Vote_Average) >= 0 && parseFloat(movie.Vote_Average) <= 10)) return false;
    if(!getLanguageInfo(movie.Original_Language)[0]) return false;
    if(!movie.Poster_Url || !movie.Poster_Url.startsWith("https://")) return false;
    return true;
}



