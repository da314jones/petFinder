import React, { useState } from 'react';
import './DogSearch.css';

const DogSearch = () => {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

 const apiKey = import.meta.env.VITE_API_KEY
 const apiSecret = import.meta.env.VITE_API_SECRET; 

  const handleSearch = () => {
    setLoading(true);


    fetch(`https://api.petfinder.com/v2/animals?type=dog&page=4`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      setSearchResults(data.animals);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching dog data:', error);
      setLoading(false);
    });
  };

  return (
    <div>
      <h1>Dog Search</h1>
      <input
        type="text"
        placeholder="Enter search criteria (e.g., breed, location)"
        value={searchCriteria}
        onChange={e => setSearchCriteria(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map(dog => (
              <li key={dog.id}>
                <h3>{dog.name}</h3>
                <p>Breed: {dog.breeds.primary}</p>
                {/* <img>src= </img> */}
                <p>Location: {dog.contact.address.city}, {dog.contact.address.state}</p>
                {/* Add more dog details here */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DogSearch;
