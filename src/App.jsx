import React from 'react'
import { useState, useEffect} from 'react'
import './App.css'
import DogList from './components/DogList'
import AdoptionProcess from './components/AdoptionProcess'
import CharityDonations from './components/CharityDonations'
import SupportSection from './components/SupportSection'
import DogSearch from './components/DogSearch'
import SocialMedia from './components/SocialMedia'
// import DogDetails from './components/dogDetails'
// import { getAnimals } from '../api /petfinder_api'


function App() {
    const [animals, setAnimals] = useState([]);
    const [selectedPets, setSelectedPets] = useState([]);

    useEffect(() => {
      async function fetchAnimalsWithToken() {
        try {
          const data = await getAnimals();
          setAnimals(data.animals);
          setSelectedPets(animals)
        } catch (error) {
          console.error('Error:', error);
  
          if (error.response && error.response.status === 401) {
            await getAnimals(); 
            fetchAnimalsWithToken();
          }
        }
      }
  
      fetchAnimalsWithToken();
    }, []);

  return (
    <div>
      <h1> User Input Form </h1>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleUserInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleUserInputChange}
        />
        {/* Add more input fields for user information */}
      </form>

      {/* Pet List */}
      <ul>
        {/* Map through the list of pets and display them */}
        {animals.map((animal) => (
          <li key={animal.id}>
            {animal.name}
            <button onClick={() => handlePetSelect(animal)}>Select</button>
          </li>
        ))}
      </ul>

      {/* Selected Pets */}
      <div>
        <h2>Selected Pets:</h2>
        <ul>
          {selectedPets.map((pet) => (
            <li key={pet.id}>{pet.name}</li>
          ))}
        </ul>
        <button onClick={handleEmailSubmit}>Email Selected Pets</button>
      </div>
    </div>
  );
}