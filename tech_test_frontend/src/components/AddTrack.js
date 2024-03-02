import React, { useState } from 'react';
import axios from 'axios';

function AddTrack() {
  const [track, setTrack] = useState({
    artist: '',
    title: '',
    length: '',
    genre: '',
    releaseYear: '',
  });

  const handleChange = (e) => {
    setTrack({ ...track, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/tracks', track);
      alert('Track added successfully');
        setTrack({
        artist: '',
        title: '',
        length: '',
        genre: '',
        releaseYear: '',
      });
    } catch (error) {
      console.error('Error adding track:', error);
      alert('Error adding track');
    }
  };

 return (
    <form onSubmit={handleSubmit}>
        <label>
            Artist
            <input type="text" name="artist" value={track.artist} onChange={handleChange} placeholder="Artist" />
        </label>
        <label>
            Title
            <input type="text" name="title" value={track.title} onChange={handleChange} placeholder="Title" />
        </label>
        <label>
            Length
            <input type="text" name="length" value={track.length} onChange={handleChange} placeholder="Length" />
        </label>
        <label>
            Genre
            <input type="text" name="genre" value={track.genre} onChange={handleChange} placeholder="Genre" />
        </label>
        <label>
            Release Year
            <input type="number" name="releaseYear" value={track.releaseYear} onChange={handleChange} placeholder="Release Year" />
        </label>
      <button type="submit">Add Track</button>
    </form>
  );
}
export default AddTrack;