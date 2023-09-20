import React, { useEffect, useState } from 'react';
import DogProfile from './DogProfile';
import { getAnimals, fetchAccessToken } from '../../api/petfinder_api';

export default function DogList({ user, userLocation, setUser }) {
  const [dogs, setDogs] = useState([]);
  const [selectedPets, setSelectedPets] = useState([]);
  const [error, setError] = useState(null);

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
        setDogs(data.animals);
        setSelectedPets([]);
      } catch (error) {
        console.error('Error:', error);

        if (error.response && error.response.status === 401) {
          
          await fetchAccessToken();
          fetchAnimalsWithToken();
          setError('Error fetching animals. Please try again.');
        }
      }
    }

    fetchAnimalsWithToken();
  }, [userLocation]);


  return (
    <div className="dog-list">
      {dogs.map((animal) => (
        <DogProfile
          key={animal.id}
          dog={animal}
          isSelected={selectedPets.some((selectedPet) => selectedPet.id === animal.id)}
          onDogSelect={() => handlePetSelect(animal)}
        />
      ))}
    </div>
  );
}
