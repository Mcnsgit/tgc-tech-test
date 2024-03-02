import React from 'react';
import SearchTracks from './components/searchTrack';
import AddTrack from './components/AddTrack';
// Other imports

function App() {
  return (
    <div className="App">
      {/* Other app content */}
      <SearchTracks />
      <AddTrack />
      {/* Any additional content */}
    </div>
  );
}

export default App;
