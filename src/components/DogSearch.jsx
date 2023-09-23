import React, { useState } from 'react';

function DogSearch({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery); 

  return (
    <div>
      <h2>Dog Search</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a dog..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button> {/* Search button */}
      </form>
    </div>
  );
}

export default DogSearch;



