const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const env = require('dotenv');
const { body, validationResult } = require('express-validator');



env.config({ path: './.env' });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

//  schema
const trackSchema = new mongoose.Schema({
    artist: { type: String, required: true },
    title: { type: String, required: true },
    length: { type: String, required: true },
    genre: { type: String, required: true },
    releaseYear: { type: Number, required: true } 
});

const Track = mongoose.model('Track', trackSchema);

//routes
app.get('/', (req, res) => {
    console.log('Received GET request to /');
    res.sendFile(__dirname + '/index.html');
});


app.post('/addTrack', [
    body('artist').trim().escape(),
    body('title').trim().escape(),
    body('length').trim().escape(),
    body('genre').trim().escape(),
    body('releaseYear').isNumeric().toInt(),
], (req, res) => {
    console.log('Received POST request to /addTrack');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newTrack = new Track({
        artist: req.body.artist,
        title: req.body.title,
        length: req.body.length,
        genre: req.body.genre,
        releaseYear: req.body.releaseYear
    });

    newTrack.save((err) => {
        if (!err) {
            res.send('Successfully added a new track.');
        } else {
            res.send(err);
        }
    });
});


app.get('/findTracks', async (req, res) => {
    console.log('Received GET request to /findTracks');
    const searchQuery = buildSearchQuery(req);

    try {
        const tracks = await Track.find(searchQuery);
        res.json(tracks); // Send response as JSON
    } catch (err) {
        res.status(500).send(err);
    }
});

function buildSearchQuery(req) {
    const searchQuery = {};
    if (req.query.artist) searchQuery.artist = req.query.artist;
    if (req.query.title) searchQuery.title = req.query.title;
    if (req.query.length) searchQuery.length = req.query.length;
    if (req.query.genre) searchQuery.genre = req.query.genre;
    if (req.query.releaseYear) searchQuery.releaseYear = parseInt(req.query.releaseYear); // Convert to number
    return searchQuery;
}
app.listen(3000, () => {
    console.log('Server is running on port 3000.');
    console.log('http://localhost:3000');
});