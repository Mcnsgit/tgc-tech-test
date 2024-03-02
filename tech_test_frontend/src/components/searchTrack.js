import React, { useState } from 'react';
import axios from 'axios';

function SearchTracks() {
  const [searchParams, setSearchParams] = useState({ genre: '', releaseYear: '' });
  const [tracks, setTracks] = useState([]);

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/tracks', { params: searchParams });
      setTracks(response.data);
      {tracks.map((track, index) => (
        return(
        <div key={index}>
          <p>{track.title} by {track.artist}</p>
        </div>
        )
      }
      );
      }
    } catch (error) {
      console.error('Error searching tracks:', error);
      alert('Error searching tracks');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Genre:
          <input type="text" name="genre" value={searchParams.genre} onChange={handleChange} />
        </label>
        <lable>
          Release Year:
          <input type="text" name="releaseYear" value={searchParams.releaseYear} onChange={handleChange} />
        </lable>
        <button type="submit">Search</button>
      </form>
      {tracks.map((track, index) => (
        <div key={index}>
          <p>{track.title} by {track.artist}</p>
          <p>Genre: {track.genre}</p>
          <p>Release Year: {track.releaseYear}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default SearchTracks;