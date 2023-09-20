import React, { useEffect, useState } from 'react';
import { getAnimals } from '../api/petfinder_api';
import LocationServices from './components/LocationServices';

export default function App() {
  const [animals, setAnimals] = useState([]);
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [selectedPets, setSelectedPets] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  


  useEffect(() => {
    async function fetchAnimalsWithToken() {
      try {
        const data = await getAnimals();
        setAnimals(data.animals);
        setSelectedPets(pets)
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

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handlePetSelect = (animal) => {
    const isAnimalSelected = selectedPets.some((selectedPet) => selectedPet.id === animal.id);
  
    if (isAnimalSelected) {
      setSelectedPets((prevSelectedPets) =>
        prevSelectedPets.filter((selectedPet) => selectedPet.id !== animal.id)
      );
    } else {
      setSelectedPets((prevSelectedPets) => [...prevSelectedPets, animal]);
    }
  };
  
  
  const handleEmailSubmit = () => {
    // Send selected pets and user information to an API for email processing
    // You might need to make a POST request to your server with this data
    // After successful submission, you can clear the selectedPets state
    // and optionally display a confirmation message to the user
  };

useEffect(() => {
  async function fetchAnimalsWithToken() {
    try {
      let params = {};

      if (userLocation) {
        params = {
          ...params,
          location: `${userLocation.latitude},${userLocation.longitude}`,
        };
      }

      const data = await getAnimals(params);
      setAnimals(data.animals);
      setSelectedPets([]);
    } catch (error) {
      console.error('Error:', error);

      if (error.response && error.response.status === 401) {
        await getAnimals();
        fetchAnimalsWithToken();
      }
    }
  }

  fetchAnimalsWithToken();
}, [userLocation]);

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