const mongoose = require('mongoose');


const TrackSchema = new mongoose.Schema({
  artist: String,
  title: String,
  length: String,
  genre: String,
  releaseYear: Number,
});

module.exports = mongoose.model('Track', TrackSchema);