import React, { useState, useEffect } from 'react';
import './DogSearch.css';
import axios from 'axios';

async function fetchAccessToken(apiKey, apiSecret) {
  try {
    const response = await axios.post(
      'https://api.petfinder.com/v2/oauth2/token',
      `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.status === 200) {
      const accessToken = response.data.access_token;
      return accessToken;
    } else {
      console.error('Error fetching access token:', response.status, response.statusText);
      throw new Error('Failed to obtain access token');
    }
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
}

const DogSearch = () => {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleSearch = () => {
    setLoading(true);


  useEffect(() => {
    async function fetchDogs() {
      setLoading(true);

      
      const apiKey = process.env.VITE_API_KEY;
      const apiSecret = process.env.VITE_API_SECRET;

      try {
        const accessToken = await fetchAccessToken(apiKey, apiSecret);

        const response = await fetch('https://api.petfinder.com/v2/animals?type=dog&page=4', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.animals);
        } else {
          console.error('Error fetching dog data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching dog data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDogs();
  }, []);

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
                {/* Display images and other dog details here */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DogSearch;
