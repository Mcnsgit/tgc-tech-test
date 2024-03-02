const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS package
const { body, validationResult } = require('express-validator');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();

// Use built-in middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Schema
const trackSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  length: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true } 
});

const Track = mongoose.model('Track', trackSchema);

// Endpoint to add a track
app.post('/tracks', [
  body('artist').trim().escape(),
  body('title').trim().escape(),
  body('length').trim().escape(),
  body('genre').trim().escape(),
  body('releaseYear').isNumeric().toInt(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const track = new Track(req.body);
    await track.save();
    res.status(201).send(track);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint to search for tracks
app.get('/tracks', async (req, res) => {
  try {
    const { genre, releaseYear } = req.query;
    const query = {};
    if (genre) query.genre = genre;
    if (releaseYear) query.releaseYear = parseInt(releaseYear, 10);

    const tracks = await Track.find(query);
    res.status(200).send(tracks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/', (req, res) => {
  res.send('Track Management API');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}.`);
});
